// Global app controller
/*jshint esversion: 6 */ //
/*jshint esversion: 8 */
import Search from './models/Search';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipe
 */
const state = {};

// the controlSearch is for addEventListener
const controlSearch = async () => {
  // 1. Get query from view (pizza is temp query string)
  const query = 'pizza';

  if (query) {
    // 2. New search obj (from new Search Class) and add it to state
    state.search = new Search(query);
    //newly created Search class will have property "query" string and "result" data then save them to state.search property

    //3. Prepare UI for results

    //4. Search for recipes (make it await because getResults is an async method)
    await state.search.getResults();

    //5. Render results on UI
    console.log(state.search.result);
  }
};

document.querySelector('.search').addEventListener('submit', objBtn => {
  objBtn.preventDefault();
  controlSearch();
});

/*
//for testing
const search = new Search('pizza');
console.log(search);
search.getResults(); // display retrived data
*/
