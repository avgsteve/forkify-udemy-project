// Global app controller
/*jshint esversion: 6 */ //
/*jshint esversion: 8 */
import Search from './models/Search';
import * as searchView from './views/searchView';
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

// saving input and rendering the result (called by Event Listener)
const controlSearch = async () => {
  // 1. Get query value (string) from input field from web page then assign the value to variable
  const query = searchView.getInput();

  //if the query string has been entered
  if (query) {
    // 2. Use query string to make new Search obj and assign the obj to state.search property
    state.search = new Search(query);

    //3. Prepare UI for results
    searchView.clearInputField();
    searchView.clearResults(); //will remove rendered result before rendering new ones
    renderLoader(elements.searchRes); // elements.results is the parent element of .results__list

    //4. Search for recipes from the recipe array stored in state obj (make it await because getResults is an async method)
    await state.search.getResults();

    //5. Render results on UI //
    // clear the loading spinner before the data rendered on page
    clearLoader();
    // (state.search.results is the recipe object contains many recipes)
    searchView.renderResults(state.search.result);
    //pass .result array into renderResults()
  }
};

elements.searchForm.addEventListener('submit', objBtn => {
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
  //ref:  https://www.fooish.com/javascript/dom/event.html

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

/*
//for testing
const search = new Search('pizza');
console.log(search);
search.getResults(); // display retrived data
*/
