// Global app controller
/*jshint esversion: 6 */ //
/*jshint esversion: 8 */
/*jshint esversion: 10 */
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
  const query = searchView.getInput();
  // const query = 'pizza'; // for testing
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

  if (id) {
    // 1. Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe); //pass in parent element of the item to be loaded (document.querySelector('.recipe'))

    // 2, Create new recipe object (and store it in state obj's recipe property)
    state.recipe = new Recipe(id); //class from './models/Recipe';
    window.r = state.recipe; // 把 state裡面的.recipe 新增在window裡面，讓recipe的內容可以透漏在外部環境

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
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


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
