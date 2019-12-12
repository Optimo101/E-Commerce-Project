export default class Likes {
   constructor() {
      this.likes = [];
   }

   addLike(sku, name, img, price) {
      const like = { sku, name, img, price };
      this.likes.push(like);

      // Persist data in localStorage
      this.persistData();

      return like;
   }

   deleteLike(sku) {
      const index = this.likes.findIndex(element => element.sku === sku);
      this.likes.splice(index, 1);

      // Persist data in localStorage
      this.persistData();
   }

   isLiked(sku) {
      // Searches for matching Sku in likes array. If found, the result will NOT equal -1 which makes the entire expression true -- else, false.
      return this.likes.findIndex(element => element.sku === sku) !== -1;
   }

   getNumLikes() {
      return this.likes.length;
   }

   persistData() {
      // track likes in localStorage
      localStorage.setItem('likes', JSON.stringify(this.likes));
   }

   readLocalStorage() {
      const storage = JSON.parse(localStorage.getItem('likes'));

      // Restore likes from localStorage
      if(storage) this.likes = storage;
   }
}