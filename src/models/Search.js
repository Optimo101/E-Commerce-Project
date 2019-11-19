import axios from 'axios';

export default class Search {
   constructor(query, catID = '') {
      this.query = query;
      this.catID = catID;
      this.results = [];
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
            catID = `${this.catID}`,
            apiKey = 'MORTkmhIyQS3N3Pahuta4gSd',
            sortOptions = '&sort=bestSellingRank.asc',
            showOptions = '&show=sku,name,salePrice,regularPrice,customerReviewAverage,customerReviewCount,bestSellingRank,categoryPath.name,categoryPath.id,thumbnailImage,image',
            pageSize = '&pageSize=100',
            active = '&active=true',
            responseFormat = '&format=json';

      let totalPages = 1;

      for (let i = 0; i < totalPages; i++) {
         try {
            const response = await axios.get(`${baseURL}${apiType}((${keyWords})${attribute}${catID})?apiKey=${apiKey}${sortOptions}${showOptions}${pageSize}&page=${i + 1}${active}${responseFormat}`);

            this.results = this.results.concat(response.data.products);
            totalPages = response.data.totalPages;

         } catch (error) {
            console.error(error);
         }
      }
   }
}
