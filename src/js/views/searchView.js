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
export const clearResults = () => elements.searchResultList.innerHTML = "";

//limit words length and force a line break if too long
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  //if title string array's length is greater than limit. If so, do following
  if (title.length > limit) {
    //split the title and put seperately into array then cicle through array with reduce
    title.split(' ').reduce((acc, current) => {
      //if accumulated value plus current words' length value is greater than limit
      if (acc + current.length <= limit) {
        //then push current item to the newTitle array
        newTitle.push(current);
      }
      //when the acc value is at or greater than limit, the true condition won't be executed and the returned value will be new accumulator
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

export const renderResults = recipesArray => {
  //recipes has multiple recipe items to be iterated and rendered to HTML
  recipesArray.forEach(renderRecipe);
};
