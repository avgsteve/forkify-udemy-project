/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 10 */
import {
  elements
} from './base';
import {
  limitRecipeTitle
} from './searchView';

export const toggleLikeBtn = isLiked => {
  /* the heart icon markup code:
  <button class="recipe__love">
      <svg class="header__likes">
          <use href="img/icons.svg#icon-heart-outlined"></use>
      </svg>
  </button>
  */

  const iconString = isLiked ? `icon-heart` : `icon-heart-outlined`;
  //Select the "use" tag inside the "button" tag with class name: recipe__love
  document.querySelector('.recipe__love use').setAttribute('href', `./dist/img/icons.svg#${iconString}`);

};

export const toggleLikeMenu = numLikes => {
  //  likesMenu: document.querySelector('.likes__field'),
  elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikeMenu = likedItem => {
  const markup = `
  <li>
      <a class="likes__link" href="#${likedItem.id}">
          <figure class="likes__fig">
              <img src="${likedItem.image}" alt="${likedItem.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${limitRecipeTitle(likedItem.title)}</h4>
              <p class="likes__author">${likedItem.author}</p>
          </div>
      </a>
  </li>
  `;

  elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`);
  el.parentElement.removeChild(el);
};
