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
         
         const formattedQuery = newQueryArray.join('&'); // i.e. 'search="red"&search="dead"&search="redemption"
         return formattedQuery;

         // i.e. query is "?category=abcat0100000"
      } else if (this.query.includes(this.catSearchKey)) 
         console.log(`You attempted a category search with query: ${this.query}`);
         const formattedQuery = this.query.slice(1);

         return formattedQuery;
   };

   async getResults() {

      const searchQuery = this.formatQuery();
      let keywords;
      let catID;

      // FUTURE FEATURE - THIS WOULD ALLOW A SEARCH WITHIN A CATEGORY
      if (searchQuery.includes(this.keywordSearchKey) && searchQuery.includes(this.catSearchKey)) {
         console.log('FEATURE HAS NOT BEEN IMPLEMENTED!');
         keywords = `(${searchQuery})`;
         catID = `&(${searchQuery})`; // FUTURE FEATURE -- THIS IS WHERE THE CATEGORY ID WOULD GO

      // SEARCH BY KEYWORD
      } else if (searchQuery.includes(this.keywordSearchKey)) {
         keywords = `(${searchQuery})`;
         catID = '';

      // SEARCH BY CATEGORY
      } else if (searchQuery.includes(this.catSearchKey)){
         keywords = '';
         catID = `(${searchQuery})`;

      } else {
         console.log('SOMETHING HAS GONE TERRIBLY WRONG WITH THE SEARCH! AHHHH!');
      }

      const baseURL = 'https://api.bestbuy.com/v1/',
            apiType = 'products',
            attribute = 'customerReviewAverage>1',
            apiKey = 'MORTkmhIyQS3N3Pahuta4gSd',
            sortOptions = 'sort=bestSellingRank.asc',
            showOptions = 'show=sku,name,regularPrice,customerReviewAverage,customerReviewCount,thumbnailImage,image',
            pageSize = 'pageSize=100',
            active = 'active=true',
            responseFormat = 'format=json';

      let totalPages = 1;

      console.log(`${baseURL}${apiType}(${keywords}${catID}&${attribute})?apiKey=${apiKey}&${sortOptions}&${showOptions}&${pageSize}&page=1&${active}&${responseFormat}`);

      for (let i = 0; i < totalPages; i++) {
         try {
            const response = await axios.get(`${baseURL}${apiType}(${keywords}${catID}&${attribute})?apiKey=${apiKey}&${sortOptions}&${showOptions}&${pageSize}&page=${i + 1}&${active}&${responseFormat}`);

            this.results = this.results.concat(response.data.products);
            // totalPages = response.data.totalPages; // ACTIVATE THIS LINE OF CODE TO MAKE TURN OFF THE LIMITED NUMBER OF SEARCH RESULTS (PAGES)
            totalPages = 1;
         } catch (error) {
            console.error(error);
         }
      }
   }
}
