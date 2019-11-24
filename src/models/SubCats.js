import axios from 'axios';

export default class SubCats {
   constructor() {
      this.results = [];
      this.allSubCatArrays = [];
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

   };

   filterResults() {
      let resultsArray = [];
      let endString = '000';

         this.results.forEach(function(element) {
            if (element.id.endsWith(endString)) {
               resultsArray.push(element);
            };
         });

         endString += '00';

         resultsArray.forEach(function(element) {
            if (element.id.endsWith(endString)) {
               resultsArray.splice(resultsArray.indexOf(element), 1);
            }
         });

         console.log(resultsArray);
         resultsArray.splice(0, 1); // first category from results (Gift Ideas) was only item that did not follow number pattern used to filter above -- manually removing
         resultsArray.splice(33, 1); // unable to remove id: '0700000' (Video Games) using above method -- manually removing
         resultsArray.splice(3, 1); // Removing subcategory TV & Internet Service Providers due to no search results found under this category
         resultsArray.splice(54, 1); // Removing subcategory Weather Stations due to no search results found under this category.

         this.results = resultsArray;
   };

   organizeResults() {
      
      for (let i = 0; i < 9; i++) {
         let subCatArray = [];

         this.results.forEach(function(element) {
            if(element.id.charAt(6) == i + 1) {
               subCatArray.push(element);
            };
         });
         
         this.allSubCatArrays.push(subCatArray);
      }

      // Insert subcategories for Movies & Music categories as these did not conform to ID structure used for all others.
      const movMusArr = [
         {
            "name": "Movies & TV Shows",
            "id": "cat02015"
          },
          {
            "name": "Shop All Music",
            "id": "cat02001"
          }
      ];

      this.allSubCatArrays[5] = movMusArr;
      console.log(this.allSubCatArrays);
   }
};