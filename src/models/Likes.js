import axios from 'axios'; 

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
      // Searches for matching Sku in likes array. If found, the result will NOT equal -1 which will return true -- else, false.
      return this.likes.findIndex(element => element.sku == sku) !== -1;
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
      if (storage) this.likes = storage;
   }

   // async sendLikesToDB() {
   //    try {
   //       await axios.post('/db/likes/logout', this.likes)
   //       .then(response => {
   //          console.log(response.data);
   //       })
   //    } catch (error) {
   //       console.log(error);
   //    }

   //    this.clearLocalStorage();
   // }

   async readLikesFromDB() {
      try {
         await axios.get('/db/likes/login')
         .then(response => {
            this.combineLikes(response.data);
         })
      } catch (error) {
         console.log(error)
      }
   }

   combineLikes(dbLikes) {
      console.log('From combineLikes function:', dbLikes)

      dbLikes.forEach((like) => {

         if (!this.isLiked(like.sku)) {
            this.likes.push(like);
         }
      });

      this.persistData();

      console.log('New likes after dbLikes added:', this.likes);
   }

   clearLocalStorage() {
      localStorage.removeItem('likes');
   }

}