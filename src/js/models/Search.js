/*jshint esversion: 6 */
/*jshint esversion: 8 */
import axios from 'axios'; //import from axios package instead of using fetch.

//build default search function (Constructor function)
export default class Search {
  constructor(query) {
    this.query = query;
  }

  //asynchronous method
  async getResult() {
    //add ${proxy} prefix before API url if needed
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    //no key need for forkify-api.herokuapp.com
    const key = '';
    try {
      //axios will return json data as Object and no need to convert data to with .json() in advance
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      // console.log(res); // will return data obj with property "status: 200";
      // assign query result to Object property
      this.result = res.data.recipes;
      // == for testing and see what's the data in the file
      // const recipes = res.data.recipes;
      // console.log(recipes);
      // == log the received data
      console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}

/*
// Changes to the Project API
// https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/16668826
// http://forkify-api.herokuapp.com/

original:
const res = await axios(`${PROXY}http://food2fork.com/api/search?key=${KEY}&q=${this.query}`);
changes to:
const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);

original:
const res = await axios(`${PROXY}http://food2fork.com/api/get?key=${KEY}&rId=${this.id}`);
changes to:
const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
*/
