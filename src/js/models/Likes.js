/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 10 */

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, image) {
    const like = {
      id: id,
      title: title,
      author: author,
      image: image,
    };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    //find index of the item in the likes Array
    const index = this.likes.findIndex(item => item.id = id);
    //delete the item with the index
    this.likes.splice(index, 1);
  }

  //to check the loaded recipe is liked or not
  isLiked(id) {
    //if the likes.id can be found, it returns a index value which will be returning true as it's not equal to -1 (so it exists)
    return this.likes.findIndex(item => item.id === id) !== -1;
  }

  getTheNumberOfLikes() {
    return this.likes.length;
  }

}
