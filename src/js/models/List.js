/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 10 */
import UniqueId from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(quantity, unit, ingredient) {
    const item = {
      id: UniqueId(),
      quantity,
      unit,
      ingredient,
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    //find out the index of every element has the prop id which matches the passed-in parameter (the value created by UniqueId(),)
    const index = this.items.findIndex(el =>
      el.id === id);

    //then delete the item in the position with the index
    this.items.splice(index, 1);
  }

  updateQuantity(id, newQuantity) {
    // .find() method returns the first element that it's value matches the condition as callback function // then update the item's quantity prop with newQuantity
    this.items.find(el => el.id === id).quantity = newQuantity;
  }

}
