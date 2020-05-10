/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 10 */

import {
  elements
} from './base';

//obj's property is from the created Class instance from List.js
export const renderItem = (recipeObj) => {
  const markup = `
  <li class="shopping__item" data-itemid=${recipeObj.id}>
      <div class="shopping__count">
          <input type="number" value="${recipeObj.quantity}" step="${recipeObj.quantity}" class="shopping__count-value">
          <p>${recipeObj.unit}</p>
      </div>
      <p class="shopping__description">${recipeObj.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="./dist/img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
  </li>
`;
  elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};
