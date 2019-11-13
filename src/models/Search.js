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
      const baseURL = 'https://api.bestbuy.com/v1/',
            apiType = 'products',
            keyWords = this.formatQuery(),
            attribute = '&customerReviewAverage>0',
            catID = '',
            apiKey = 'MORTkmhIyQS3N3Pahuta4gSd',
            sortOptions = '&sort=bestSellingRank.asc',
            showOptions = '&show=sku,name,salePrice,regularPrice,customerReviewAverage,customerReviewCount,bestSellingRank,thumbnailImage,image',
            pageSize = '&pageSize=100',
            active = '&active=true',
            responseFormat = '&format=json';

      console.log(keyWords);

      try {
         const response  = await axios.get(`${baseURL}${apiType}((${keyWords})${attribute}${catID})?apiKey=${apiKey}${sortOptions}${showOptions}${pageSize}${active}${responseFormat}`);

         this.results = response.data.products;

      } catch (error) {
         console.error(error);
      }
   }
}
