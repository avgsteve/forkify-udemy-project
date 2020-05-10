/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 10 */

import {
  elements, // document.querySelector('.recipe')
} from './base';
import Fraction from 'fraction.js';


//to remove the content (recipe) before loading new one
export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
};

const formatQty = qty => {
  //  https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/9939926#questions/4542590
  //  https://github.com/infusion/Fraction.js/
  if (qty) {
    // qty = 2.5 --> 2 1/2
    // qty = 0.5 --> 1/2
    const num = new Fraction(qty).simplify(0.00001);
    return num.toFraction(true);
  }
  return '?';
};

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="./dist/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatQty(ingredient.qty)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const recipeMarkUp = `
  <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>
  <div class="recipe__details">
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="./dist/img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
          <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="./dist/img/icons.svg#icon-man"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text"> servings</span>

          <div class="recipe__info-buttons">
              <button class="btn-tiny btn-decrease">
                  <svg>
                      <use href="./dist/img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
              </button>
              <button class="btn-tiny btn-increase">
                  <svg>
                      <use href="./dist/img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
              </button>
          </div>

      </div>
      <button class="recipe__love">
          <svg class="header__likes">
              <use href="./dist/img/icons.svg#icon-heart${isLiked? "" : "-outlined"}"></use>
          </svg>
      </button>
  </div>



  <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(element => createIngredient(element)).join('')}
      </ul>

      <button class="btn-small recipe__btn recipe__btn--add">
          <svg class="search__icon">
              <use href="./dist/img/icons.svg#icon-shopping-cart"></use>
          </svg>
          <span>Add to shopping list</span>
      </button>
  </div>

  <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
      </p>
      <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
              <use href="./dist/img/icons.svg#icon-triangle-right"></use>
          </svg>

      </a>
  </div>
`;

  elements.recipe.insertAdjacentHTML('afterbegin', recipeMarkUp);

};

export const updateServeringsIngredients = (recipe) => {
  //update the serving counts which was updated by Recipe.updateServerings(updateType) in index.js
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

  //update ingredients in view , first get the DOM element
  // const qtyElements = Array.from(document.querySelectorAll('.recipe__count'));
  const qtyElements = document.querySelectorAll('.recipe__count');

  //then write new textContent with the updated property (from passed-in state obj)
  qtyElements.forEach((element, index) => {
    element.textContent = formatQty(recipe.ingredients[index].qty);
  });


};



//
