/*jshint esversion: 6 */
import {
  elements
} from './base';

export const getInput = () => {
  // to get and output the value from the input area
  return elements.searchInput.value;
  // searchInput: document.querySelector('.search__field'),
};
