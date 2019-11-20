import axios from 'axios';

export default class SubCats {
   constructor() {
      this.results = [];
      this.allSubCats = [];
   }

   async getResults() {
      const baseURL = 'https://api.bestbuy.com/v1/categories',
            apiKey = 'MORTkmhIyQS3N3Pahuta4gSd',
            showOptions = '&show=name,id',
            pageSize = '&pageSize=100',
            responseFormat = '&format=json';

      let totalPages = 1;

      for (let i = 0; i < totalPages; i++) {
         try {
            const response = await axios.get(`${baseURL}(id=abcat*)?apiKey=${apiKey}${showOptions}${pageSize}&page=${i + 1}${responseFormat}`);

            this.results = this.results.concat(response.data.categories);
            totalPages = response.data.totalPages;

         } catch (error) {
            console.error(error);
         } 
      }

      this.filterResults();
      console.log(this.results);

   };

   filterResults() {
      let resultsArray = [];
      let endString = '000';

         this.results.forEach(function(element) {
            if (element.id.endsWith(endString)) {
               resultsArray.push(element);
            };
         });

         endString = endString + '00';

         resultsArray.forEach(function(element) {
            if (element.id.endsWith(endString)) {
               resultsArray.splice(resultsArray.indexOf(element), 1);
            }
         });

         resultsArray.splice(0, 1); // first category from results (Gift Ideas) was only item that did not follow above pattern -- manually removing
         resultsArray.splice(33, 1); // unable to remove id: '0700000' (Video Games) using above method -- manually removing

         this.results = resultsArray;
   };

   createSubCats() {
      
      for (let i = 0; i < 9; i++) {
         let subCatArray = [];

         this.results.forEach(function(element) {
            if(element.id.charAt(6) == i + 1) {
               subCatArray.push(element);
            };
         });

         this.allSubCats.push(subCatArray);
      }
      console.log(this.allSubCats);
   }
};