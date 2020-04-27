// Global app controller
/*jshint esversion: 6 */

import string from './models/Search'; // string is just an arbitrary word for the imported String

import {
  add,
  multiply,
  ID
} from './views/searchView';

console.log(`Using imported functions!! ${add(ID,2)} and ${multiply(3, 5)}. and the String is: ${string}`);
