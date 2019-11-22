import axios from 'axios';

export default class Search {
   constructor(query) {
      this.query = query;
      this.results = [];
      this.keywordSearchKey = 'search=';
      this.catSearchKey = 'categoryPath.id='
   }

   formatQuery() {
      // i.e. query is "?keyword-search=red+dead+redemption"
      if (this.query.includes(this.keywordSearchKey)) {
         console.log(`You attempted a keyword search with query: ${this.query}`)
         const queryArray = this.query.trim().slice(8).split('+');
         const addToString = "search=\'";
   
         let newQueryArray = [];
   
         queryArray.forEach(element => {
            newQueryArray.push(addToString.concat(element) + "\'");
         });
         
         console.log(`This is the formatted query: ${newQueryArray.join('&')}`);
         const formattedQuery = newQueryArray.join('&'); // i.e. 'search="red"&search="dead"&search="redemption"
         return formattedQuery;

         // i.e. query is "?category=abcat0100000"
      } else if (this.query.includes(this.catSearchKey)) 
         console.log(`You attempted a category search with query: ${this.query}`);
         const formattedQuery = this.query.slice(1);
         console.log(formattedQuery)

         return formattedQuery;

      
   };

   async getResults() {

      const searchQuery = this.formatQuery();
      let keywords;
      let catID;

      console.log(this.keywordSearchKey, this.catSearchKey);

      if (searchQuery.includes(this.keywordSearchKey) && searchQuery.includes(this.catSearchKey)) {
         console.log('FEATURE HAS NOT BEEN IMPLEMENTED!');
         keywords = `(${searchQuery})`;
         catID = `&(${searchQuery})`; // FUTURE FEATURE -- THIS IS WHERE THE CATEGORY ID WOULD GO

      } else if (searchQuery.includes(this.keywordSearchKey)) {
         keywords = `(${searchQuery})`;
         catID = '';

      } else if (searchQuery.includes(this.catSearchKey)){
         keywords = '';
         catID = `(${searchQuery})`;

      } else {
         console.log('SOMETHING HAS GONE TERRIBLY WRONG WITH THE SEARCH! AHHHH!');
      }

      const baseURL = 'https://api.bestbuy.com/v1/',
            apiType = 'products',
            // keywords = this.formatQuery(),
            attribute = 'customerReviewAverage>0',
            // catID = this.formatCategory,
            apiKey = 'MORTkmhIyQS3N3Pahuta4gSd',
            sortOptions = 'sort=bestSellingRank.asc',
            showOptions = 'show=sku,name,salePrice,regularPrice,customerReviewAverage,customerReviewCount,bestSellingRank,categoryPath.name,categoryPath.id,thumbnailImage,image',
            pageSize = 'pageSize=100',
            active = 'active=true',
            responseFormat = 'format=json';

      let totalPages = 1;

      for (let i = 0; i < totalPages; i++) {
         try {
            const response = await axios.get(`${baseURL}${apiType}(${keywords}${catID}&${attribute})?apiKey=${apiKey}&${sortOptions}&${showOptions}&${pageSize}&page=${i + 1}&${active}&${responseFormat}`);

            this.results = this.results.concat(response.data.products);
            totalPages = response.data.totalPages;

         } catch (error) {
            console.error(error);
         }
      }
   }
}
