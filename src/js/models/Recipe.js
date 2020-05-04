/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 10 */
import axios from 'axios';
import {
  key,
  proxy
} from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.result = result;
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert('Something went wrong :( ');
    }

  }

  calcTime() {
    // 假設每三個材料(periods)花費15分鐘(* 15)
    const numberOfIngredients = this.ingredients.length;
    const periods = Math.ceil(this.ingredients.length / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  // === standardize all units ===
  /* example:
  Recipe {id: "49346", result: {…}, title: "No-Knead Pizza Dough"
  ingredients: Array(3)
  0: "7 1/2 cups all-purpose flour (1000 grams) plus more for shaping dough"
  1: "4 teaspoons fine sea salt"
  2: "1/2 teaspoon active dry yeast"
  */
  parseIngredients() {
    //strings to be replaced (from long to short)
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'oz', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    //透過map將.ingredients裡每一個Array中的元素(材料)改成新的內容，新內容包括: 數量 qty, 單位 unit 和 材料 ingredient
    const newIngredients = this.ingredients.map(originalIngString => {
      // (newIngredients就是要透過map method裡面return出去包含了新內容的變數)
      // 1. ==== uniform all units by lowercasing all string====
      //// 先把array裡面原有的材料字串 (originalIngString) 轉成全部小寫的字串 ingStrLowerCase
      let ingStrLowerCase = originalIngString.toLowerCase();

      //透過 forEach 將 unitsLong 裡面的"每個" 全寫材料字串 unitLongStr，與處理過的小寫材料 ingStrLowerCase 字串做比對，接著透過 unitsLong 每個元素的 index 去定位要用來取代舊字串，在 unitsShort Array 裡面的新字串
      let ingredientUnitShort;
      unitsLong.forEach((unitLongStr, index) => {
        //將處理完的字串存成 ingredientUnitShort
        ingStrLowerCase = ingStrLowerCase.replace(unitLongStr, unitsShort[index]);
      });

      // 2. ==== Remove parenthese (with RegExp) ====
      ingStrLowerCase = ingStrLowerCase.replace(/ *\([^)]*\) */g, " ");

      // 3. ==== parse ingredients into three parts:  qty, unit and ingredients ====
      const ingredientArray = ingStrLowerCase.split(' '); //先將字串拆成Array: ingredientArray

      // 3-1. 透過findIndex使用特定callback function找出含有unit的字，並且找出該unit在原Array裡面哪個位置 (將位置存成unitIndex)，讓後面的function有定位點可以切割字串
      const unitIndex = ingredientArray.findIndex(unit_in_ingredientArray => units.includes(unit_in_ingredientArray)); // 將 unitsShort.includes(unit_in_ingredientArray) 作為 callback function ，當傳進去的值(unit_in_ingredientArray)存在(include)於 unitsShort 之中時，就會回傳true, findIndex funtion就會傳回 "符合條件" 的unit(單位)元素，在ingredientArray中的位置

      // 4. ==== save qty, unit and ingredients in new obj ====
      let objIngredient; //宣告 objIngredient 做為準備儲存資料的空物件

      // 4-1. == 透過unitIndex變數 (unit字串的狀態，是否存在)，來處理其他字串的內容 ==

      // unitIndex變數第一個狀況 ；當unit(單位)元素存在，且回傳值大於 -1 ，比如0, 1 , 2都表示單位元素在字串中的位置 (因為findIndex若是傳回-1表示不存在，)
      if (unitIndex > -1) {
        // 將單位字串在 ingredientArray 裡面的位置(unitIndex)，和該位置之前的全部字串，也就是數量的部分，從 ingredientArray 取出，接著存成 qtyStrArray 。
        const qtyStrArray = ingredientArray.slice(0, unitIndex);
        // 因為 ingredientArray 中可能有多個元素包含了數字字串
        // Ex. 4 1/2 cups, qtyStrArray is [4, 1/2] --> eval("4+1/2") --> 4.5
        // Ex. 4 cups, qtyStrArray is [4]

        // 5. 透過取出的數量字串Array，來運算數量
        let qty; // qty 變數表示數量，透過以下eval方法將數量字串處理後存至qty

        if (qtyStrArray[0] === "") {
          qty = 0.5;
        }
        // if狀況1. : qtyStrArray 只有一個元素的時候
        else if (qtyStrArray.length === 1) {
          //透過eval()來運算例如 ["4+1/2"] 的字串
          qty = eval(ingredientArray[0].replace('-', '+')); //並且先把數量字串中的-號換成+號

          // if狀況2. : qtyStrArray 有多個元素的時候 (Array長度不等於1)

        } else {
          //先將每個元素透過+號結合( Array.join  )，接著eval()來運算例如 ["4+1/2"] 的字串
          qty = eval(ingredientArray.slice(0, unitIndex).join('+'));
        }

        // 6. == 將處理過的數量，單位和材料字串存進物件objIngredient中
        objIngredient = {
          qty: qty, //或是可以把   qty: qty, 寫成 qty, 就好
          unit: ingredientArray[unitIndex], //取得材料字串中，單位字串的位置
          ingredient: ingredientArray.slice(unitIndex + 1).join(" "), //在材料字串中，單位字串後面一位的位置，作為量詞和單位字串以外的材料敘述
        };

        // unitIndex變數第二個狀況，當(沒有單位字串時，)材料字串中第一個位置有數字內容的時候
        // 先parseInt讓內容變成為數字類型 ( , 10 表示 採十進位)
      } else if (parseInt(ingredientArray[0], 10)) {
        // There is NO unit, but 1st element is number
        // **** If parseInt() has an text inside, will return NaN which will be false
        objIngredient = {
          qty: parseInt(ingredientArray[0], 10),
          unit: '',
          ingredient: ingredientArray.slice(1).join(" "),
        };

        // 第三個狀況，當沒有單位字串的時候 (findIndex傳回-1)，也是第二個狀況以外的情況時
      } else if (unitIndex === -1) {
        // There is no unit and no number
        objIngredient = {
          qty: 1,
          unit: '',
          ingredient: ingStrLowerCase,
        };
      }

      // 7.透過 this.ingredients.map 將 this.ingredients的Array每個 element 都存成新的內容。 (objIngredient物件)
      return objIngredient;
    });

    //把含有新的Array內容的變數newIngredients存回 this.ingredients 屬性裡面
    /// (const newIngredients = this.ingredients.map(originalIngString => { ...

    this.ingredients = newIngredients;
  }
}
