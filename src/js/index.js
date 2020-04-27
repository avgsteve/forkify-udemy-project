// Global app controller
/*jshint esversion: 6 */ //
/*jshint esversion: 8 */
import Search from './models/Search'; //move async function getResult(query) to models/Search.js
const search = new Search('pizza');
console.log(search);
search.getResult();
