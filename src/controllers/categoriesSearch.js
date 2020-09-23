import CategorySearch from '../models/CategorySearch';
import { state } from '../index';


// CATEGORIES SEARCH CONTROLLER
// ===========================================================
// Searches the BB API for current product categories to be dynamically loaded in main menu
export default async function controlCategorySearch(apiKey) {
   // New category search object and add to state
   state.categorySearch = new CategorySearch();

   try {
      // Search categories
      await state.categorySearch.getResults(apiKey);

   } catch (error) {
      alert('Something went wrong with the categories search');
      console.log(error);
   }
}