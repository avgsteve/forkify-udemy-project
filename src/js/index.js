// Global app controller
/*jshint esversion: 6 */ //
/*jshint esversion: 8 */
/*jshint esversion: 10 */
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';

import {
  elements, // elements is an obj for shorthand alias for querySelector
  renderLoader, //for spinner HTML tag
  clearLoader
} from './views/base';

const state = { //for saving the data Object (Search object) from API
  /** Global state of the app
   * - Search object
   * - Current recipe object
   * - Shopping list object
   * - Liked recipe
   */
};

/* *** SEARCH CONTROLLER
       saving input and rendering the result (called by Event Listener)
*/
const controlSearch = async () => {
  // 1. Get query value (string) from input field from web page then assign the value to variable
  // const query = searchView.getInput();
  const query = 'pizza'; // for testing

  if (query) {
    // 2. Use query string to make new Search obj and assign the obj to state.search property
    state.search = new Search(query);

    //3. Prepare UI for results
    searchView.clearInputField();
    searchView.clearResults(); //will remove rendered result before rendering new ones
    renderLoader(elements.searchRes); // elements.results is the parent element of .results__list

    try { //4. Search for recipes (displaying search results)
      await state.search.getResults();

      //5. Render results on UI //
      clearLoader(); // clear the loading spinner befor new content is loaded
      searchView.renderResults(state.search.result);
      //call renderResults() and pass in the result array
    } catch (error) {
      alert('Something went wrong with the search...');
      clearLoader(); //still clear the result
    }

  }
};
//executing SEARCH CONTROLLER
elements.searchForm.addEventListener('submit', objBtn => {
  objBtn.preventDefault();
  //with preventDefault, page won't reload after btn is clicked
  controlSearch();
});


//for TESTING，when page loads up, do controlSearch() & render search results directly without needing to submit from document.querySelector('.search')
window.addEventListener('load', objBtn => {
  objBtn.preventDefault();
  //with preventDefault, page won't reload after btn is clicked
  controlSearch();
  window.state = state; //for testing
});

//
elements.searchResPages.addEventListener('click', eventObj => {
  //target: 顯示觸發事件的 DOM element (以HTML code顯示)
  const btn = eventObj.target.closest('.btn-inline');
  console.log(`Event handler目前觸發的HTML元素: `);
  console.log(btn);
  //target.closest ref:  https://www.fooish.com/javascript/dom/event.html

  if (btn) {
    //讀取data attribute的value
    const goToPage = parseInt(btn.dataset.goto, 10); //在.btn-inline元素裡面 讀取data-goto="xxx" 裡面數值 (xxx) , 該屬性是在view/searchView.js裡面的 createButton() 裡面所做的設定

    //render新的recipe物件之前先清空.results__list目前已經有的內容
    searchView.clearResults();

    //renderResults = (recipesArray, page = 1, resultsPerPage = 10) , state.search.result 是 含有 recipe內容的Array
    searchView.renderResults(state.search.result, goToPage);

    //

  }
});

/* *** Recipe CONTROLLER
       saving input and rendering the result (called by Event Listener)
*/
const controlRecipe = async () => {
  //window.location.hash的內容是string，所以用string的replace method將沒有hash，只有數字字串的string assign到 id
  const id = window.location.hash.replace('#', ''); //replace hash with empty string

  console.log(`\n==>>> the hash in URL has changed to : #${id}`);

  searchView.highlightSelected(id);


  if (id) {
    // 1. Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe); //pass in parent element of the item to be loaded (document.querySelector('.recipe'))

    // 2, Create new recipe object (and store it in state obj's recipe property)
    state.recipe = new Recipe(id); //class from './models/Recipe';
    // window.r = state.recipe; // 把 state裡面的.recipe 新增在window裡面，讓recipe的內容可以透漏在外部環境

    //use try ... catch 用以處理例外情況
    try {
      // 3. Get recipe data (from the properties stored in state.recipe) and parse ingredients
      await state.recipe.getRecipe();
      console.log('state.recipe裡面的內容:');
      console.log(state.recipe);
      state.recipe.parseIngredients();

      // 4. Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // 5. Render recipe (with recipeView.js)
      clearLoader();
      recipeView.renderRecipe(state.recipe);

    } catch (error) {
      console.log(error);
      // alert('Error processing recipe.');
    }
  }
};

/* ====>>>>> 啟用controlRecipe()的兩個時機
// ==>>> when the URL is being changed
window.addEventListener('hashchange', controlRecipe);
// ==>>> when page is being loaded
window.addEventListener('load', controlRecipe);
*/
//以上兩個Event listener可以改為以下寫法
// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

window.addEventListener('hashchange', controlRecipe);

/* === LIST CONTROLLER
 */
const controlList = () => {
  // Create a new list if there is no one yet
  if (!state.list) state.list = new List();

  console.log(`global state: `);
  console.log(state);

  //Add new ingredients to the list
  state.recipe.ingredients.forEach(el => {
    //this code will addItem to state.list and also return the value to variable "item"
    const item = state.list.addItem(el.qty, el.unit, el.ingredient);
    //then render added item to listView as markup

    listView.renderItem(item); //export const renderItem = (recipeObj) => {  const markup = `
  });

};

// Set up the  event handles delete and update list item
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  console.log("itemid get!: " + id);

  //Handle the delete button in shopping list
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {

    // Delete data from this.state.
    state.list.deleteItem(id);

    // Delete item from UI
    listView.deleteItem(id); //... => item.parent.removeChild(item);

    //Handle the count update
  } else if (e.target.matches('.shopping__count-value')) {
    //getting the value from clicked value field
    const value = parseFloat(e.target.value, 10);

    //after getting the value, update the value in state.list property
    state.list.updateQuantity(id, value);

  }

  console.log(state);
});

/* LIKEs CONTROLLER
 */

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  //User has NOT yet like the current recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the Likes.likes[] array
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img,
    );

    // Toggle the like buttons


    // Add like to UI list
    console.log('Liked this recipe!: ');
    console.log(state.likes);

  } else {
    // Remove like from the Likes.likes[] array
    state.likes.deleteLike(currentID);
    console.log('Un-Liked this recipe!: ');
    console.log(state.likes);

    // Toggle the like buttons


    // Remove like to UI list


  }


};

//for calling updateServerings(updateType) from Recipe.js by clicking handling recipe buttons
elements.recipe.addEventListener('click', clickedElement => {

  if (clickedElement.target.matches('.btn-decrease, .btn-decrease *')) {

    //in case the servings becomes 1
    if (state.recipe.servings > 1) {
      state.recipe.updateServerings('dec');
      recipeView.updateServeringsIngredients(state.recipe);
    }

  } else if (clickedElement.target.matches('.btn-increase, .btn-increase *')) {
    //
    state.recipe.updateServerings('inc');
    recipeView.updateServeringsIngredients(state.recipe);

    //adding recipe items to shopping list
  } else if (clickedElement.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    console.log('.recipe__btn--add matched!');
    //Add ingredients to shopping list
    controlList();
  } else if (clickedElement.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});
// for Testing
// console.log(`== updated servings: ${state.recipe.servings}`);
// console.log(JSON.stringify(state.recipe.ingredients));
// === Update servings in recipe ingredient on webpage
// recipeView.updateServeringsIngredients(state.recipe);
// });


/*
// ===== for testing purpose ====

/// Recipe CONTROLLER
const r = new Recipe(47746);
r.getRecipe();
console.log(r); // 顯示從API取回的資料內容
///

const search = new Search('pizza');
console.log(search);
search.getResults(); // display retrived data
*/
