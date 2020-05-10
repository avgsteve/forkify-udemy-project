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

    //Persist data in local storage (執行addLike()的時候順便把資料存進localstorage)
    this.saveDataInLocalStorage();

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

  saveDataInLocalStorage() {
    //還要先把this.likes的Array資料變成JSON之後再存進 localStorage
    localStorage.setItem('likes', JSON.stringify(this.likes));
    /* this.likes ==> the array of saved (pushed into) in the array
      constructor() {
        this.likes = [];
      }
      */
  }

  readDataInLocalStorage() {
    //還要先把localStorage的 JSON 資料變成 Array string 之後再存進 this.likes
    const likesDataInLS = JSON.parse(localStorage.getItem('likes'));

    //如果likes資料不存在於localStorage, 會傳回null，要為true的時候再存回this.like
    if (likesDataInLS) {
      this.likes = likesDataInLS;
    } else {
      console.log('Error! 無likes資料存在於localStorage中!');
    }

  }

}
