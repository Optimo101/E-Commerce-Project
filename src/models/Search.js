import axios from 'axios';

export default class Search {
   constructor(query) {
      this.query = query;
   }

   formatQuery() {
      // i.e. input is "?search=red+dead+redemption"
      const queryArray = this.query.trim().slice(8).split('+');
      const addToString = "search=\'";

      let newQueryArray = [];

      queryArray.forEach(element => {
         newQueryArray.push(addToString.concat(element) + "\'");
      });

      return newQueryArray.join('&');
      // i.e. output would be 'search="red"&search="dead"&search="redemption"
   };

   async getResults() {
      const baseURL = 'https://api.bestbuy.com/v1/';
      const apiType = 'products';
      const keyWords = this.formatQuery();
      console.log(keyWords);
      const catID = '';
      const apiKey = 'MORTkmhIyQS3N3Pahuta4gSd';
      const sortOptions = '&sort=name.asc';
      const showOptions = '&show=sku,name,regularPrice';
      const pagination = `&pageSize=100`;
      const responseFormat = '&format=json';

      try {
         const response  = await axios.get(`${baseURL}${apiType}((${keyWords})${catID})?apiKey=${apiKey}${sortOptions}${showOptions}${pagination}${responseFormat}`);

         this.results = response.data.products;

      } catch (error) {
         console.error(error);
      }
   }
}
