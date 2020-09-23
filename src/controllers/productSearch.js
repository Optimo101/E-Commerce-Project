import { state } from '../index';
import ProductSearch from '../models/ProductSearch';


// PRODUCTS SEARCH CONTROLLER
// ===========================================================
export default async function controlProductSearch(query, apiKey) {
   // Create new search object and add to state
   state.productSearch = new ProductSearch(query);

   try {
      // Search for products
      await state.productSearch.getResults(apiKey);

   } catch (error) {
      alert('Something went wrong with the product search');
      console.log(error);
   }
}