import axios from 'axios'; 

export default class Likes {
   constructor() {
      this.likes = [];
      this.tempLikes = [];
   }

   addLike(sku, name, image, regularPrice, customerReviewAverage, customerReviewCount, likesPage, liked = true) {
      const like = { sku, name, image, regularPrice, customerReviewAverage, customerReviewCount, liked };

      if (likesPage === true) {
         this.tempLikes.push(like);
      } else {
         this.likes.push(like);
      }

      // Persist data in localStorage
      this.persistData(likesPage);
      return like;
   }

   deleteLike(sku, likesPage) {
      if (likesPage === true) {
         const index = this.tempLikes.findIndex(element => element.sku === sku);
         this.tempLikes.splice(index, 1);
      } else {
         const index = this.likes.findIndex(element => element.sku === sku);
         this.likes.splice(index, 1);
      }

      // Persist data in localStorage
      this.persistData(likesPage);
   }

   isLiked(sku, likesPage) {
      // Searches for matching Sku in likes array. If found, the result will NOT equal -1 which will return true -- else, false.
      if (likesPage === true) {
         return this.tempLikes.findIndex(element => element.sku == sku) !== -1;
      } 
      return this.likes.findIndex(element => element.sku == sku) !== -1;
   }

   getNumLikes() {
      return this.likes.length;
   }

   persistData(likesPage) {
      if (likesPage === true) {
         // Track temporary likes in localStorage
         localStorage.setItem('tempLikes', JSON.stringify(this.tempLikes));
      } else {
         // Track likes in localStorage
         return localStorage.setItem('likes', JSON.stringify(this.likes));
      }
   }

   readLocalStorage() {
      const likesStorage = JSON.parse(localStorage.getItem('likes'));
      const tempLikesStorage = JSON.parse(localStorage.getItem('tempLikes'))
      
      // Restore likes from localStorage
      if (tempLikesStorage) {
         this.likes = tempLikesStorage;
         localStorage.setItem('likes', JSON.stringify(this.likes));
         localStorage.removeItem('tempLikes');

      } else if (likesStorage) {
         this.likes = likesStorage;
      }
   }

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
      dbLikes.forEach((like) => {

         if (!this.isLiked(like.sku)) {
            this.likes.push(like);
         }
      });

      this.persistData();
   }

   clearLocalStorage() {
      localStorage.removeItem('likes');
   }

   createTempLikes() {
      this.tempLikes = this.likes.slice();
   }
}