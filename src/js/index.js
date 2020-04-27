// Global app controller
/*jshint esversion: 6 */

import string from './models/Search'; // string is just an arbitrary word for the imported String

// import {
//   add as addFunc, // or just simply add
//   multiply as multiplyFunc,
//   ID
// } from './views/searchView';

// console.log(`Using imported functions!! ${addFunc(ID,2)} and ${multiplyFunc(3, 5)}. and the String is: ${string}`);

// third way of importing all from other module(.js file)
import * as searchView from './views/searchView';

console.log(` (The third way) Using imported functions!! ${searchView.add(searchView.ID,2)} and ${searchView.multiply(3, 5)}. and the String is: ${searchView.ID} (throught " import * as ... method ")`);

// to see what type is this imported "searchView" object
console.log(searchView);
