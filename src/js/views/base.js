/*jshint esversion: 6 */
export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'), //get string from input field (searchInput.value)
  searchRes: document.querySelector('.results'), // for HTML tag <div class="results"> (the parent of .results__list)
  searchResultList: document.querySelector('.results__list'), // add rendered markup to list
  searchResPages: document.querySelector('.results__pages'), // for displaying page buttons
  recipe: document.querySelector('.recipe'), // for displaying page buttons
  shopping: document.querySelector('.shopping__list'), // for displaying page buttons
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list'),
};

export const elementStrings = {
  loader: 'loader',
};

//for loading spinner, parent argument is the parent element of the spinner
export const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="./dist/img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
