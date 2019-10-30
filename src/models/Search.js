import axios from 'axios';

export default class Search {
   constructor(query) {
      this.query = query;
   }

   async getResults() {
      const baseURL = 'https://api.bestbuy.com/v1/';
      const apiType = 'products';
      const catID = '&(categoryPath.id=abcat0700000)'
      const apiKey = 'MORTkmhIyQS3N3Pahuta4gSd';
      const sortOptions = '&sort=name.asc';
      const showOptions = '&show=sku,name,regularPrice';
      const pagination = `&pageSize=100`;
      const responseFormat = '&format=json';

   
      try {
         const response  = await axios.get(`${baseURL}${apiType}((search=${this.query})${catID})?apiKey=${apiKey}${sortOptions}${showOptions}${pagination}${responseFormat}`);
         this.results = response.data.products;
      } catch (error) {
         console.error(error);
      }
   }
}
