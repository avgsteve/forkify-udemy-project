/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 10 */
import axios from 'axios';
import {
  key,
  proxy
} from '../config';


export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.result = result;
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert('Something went wrong :( ');
    }

  }

  calcTime() {
    // 假設每三個材料(periods)花費15分鐘(* 15)
    const numberOfIngredients = this.ingredients.length;
    const periods = Math.ceil(ingredients.length / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
