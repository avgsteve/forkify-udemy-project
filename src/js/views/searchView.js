/*jshint esversion: 6 */
import {
  elements // document.querySelector('...');
} from './base';

export const getInput = () => {
  // to get and output the value from the input area
  return elements.searchInput.value;
  // "searchInput" : document.querySelector('.search__field'),
};

//clear the input field after entered something
export const clearInputField = () => elements.searchInput.value = "";

//clear the results before making new query
export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  //and clear the pages buttons before rendering new buttons as well
  elements.searchResPages.innerHTML = "";
};

// class="results__link--active" can highlight selected item in search result
export const highlightSelected = id => {

  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(el => {
    el.classList.remove('results__link--active');
  });
  console.log('the id is:' + id);

  const idToBeSelected = document.querySelector(`.results__link[href*="${id}"]`);
  idToBeSelected === null ? console.log('No item to be highlighted yet!') : idToBeSelected.classList.add('results__link--active');


};

//limit words length and force a line break if too long
export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  //if title string array's length is greater than limit. If so, do following
  if (title.length > limit) {
    //split the title and put seperately into array then cicle through array with reduce
    title.split(' ').reduce((acc, current) => {
      //if accumulated value plus current words' length value is less than limit (17)
      if (acc + current.length <= limit) {
        //then we are allowed to push current item to the newTitle array
        newTitle.push(current);
      }
      //then the returned value will be the new value of "acc" for next reduce method operation
      return acc + current.length;
    }, 0);

    // join the words in array return the result as STRING! (shorter than limit of words)
    return `${newTitle.join(' ')} ...`;
  }
  return title;
}; // this function will be used as callback in template string for variable 'markup' (${limitRecipeTitle(recipe.title)})

const renderRecipe = recipe => {
  //private callback function to be used only by renderResults()
  const markup = `
  <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
  //to render the HTML element to HTML file
};

//type: 'prev' or 'next' , will receive arguments from renderButtons();. And this arrow function will return template strings
const createButton = (page, type) => `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button> `;

//for displaying the page buttons for changing pages and will be called inside renderResults() and receive arguments from it.
const renderButtons = (page, numberOfResults, resultsPerPage) => {
  //total pages for results
  const pages = Math.ceil(numberOfResults / resultsPerPage); // use Math.ceil to round up the page numbers to whole digits.

  let button; // button variable will be assigned with the template string from createButton();
  if (page === 1 && pages > 1) {
    //only button to go to next page
    button = createButton(page, 'next');

  } else if (page < pages) {
    //Both buttons
    button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
  } else if (page === pages && pages > 1) {
    // only button to go to previous page
    button = createButton(page, 'prev');
  }

  console.log('renderButtons()裡面，透過其他程式取得的按鈕元素HTML code: ');
  console.log(button);

  // insert button element to searchResPages (.results__pages) as page buttons
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

//arguments===> page:page number, resultsPerPage(how many results per page)
export const renderResults = (recipesArray, page = 1, resultsPerPage = 10) => {
  // render result of current page
  const start = (page - 1) * resultsPerPage; // (原本寫法是 const start = 1; 表示第一頁顯示 0 ~ 9 資料)
  const end = (page * resultsPerPage); // slice(start, end) not include the end index
  //recipes has multiple recipe items to be iterated and rendered to HTML
  // recipesArray.forEach(renderRecipe); //original method used to display all recipesArray
  recipesArray.slice(start, end).forEach(renderRecipe);

  //render pagination renderButtons
  renderButtons(page, recipesArray.length, resultsPerPage);
};
