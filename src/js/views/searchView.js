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
  if (title.length > limit) {
    let newTitle = title.split('').splice(0, limit);

    // Return New title
    return `${newTitle.join('')}...`;

    // Return the title containing less than 17 letters
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
