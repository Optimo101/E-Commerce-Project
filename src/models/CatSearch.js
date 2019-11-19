import axios from 'axios';

export default class CatSearch {
   constructor() {
      this.results = [];
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
   }
};