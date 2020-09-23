import controlProductSearch from './productSearch';
import controlCart from './cart';
import controlLikes from './likes';
import * as resultsView from '../views/resultsView';
import { state } from '../index';
import { elements } from '../views/base';


// RESULTS PAGE CONTROLLER
// ===========================================================
export default async function controlResultsPage(apiKey) {
   // Get search query from url parameter
   const urlQuery = window.location.search;
   
   if (urlQuery) {
      try {
         // Perform search and prepare results
         await controlProductSearch(urlQuery, apiKey);

         // Determine if any products are 'liked' by user
         state.productSearch.results.forEach((element) => {
            if (!state.likes.isLiked(element.sku)) {
            } else {
               element.liked = true;
            }
         });

         // Add an index property to each object in array
         state.productSearch.results.forEach((element, index) => {
            element.index = index
         });

         // Render results on UI
         resultsView.renderResults(state.productSearch.results);

      }  catch (error) {
         alert('Something went wrong when attempting to render product search results');
         console.log(error);
      }
   }

   // Event Listeners
   // ===========================================================
   elements.resultsSection.addEventListener('click', event => {
      // Event handler for pagination
      if (event.target.matches('.results-section__page-buttons, .results-section__page-buttons *')) {
         const btn = event.target.closest('.btn');

         if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            resultsView.clearResults();
            resultsView.renderResults(state.productSearch.results, goToPage);
         }
      }

      // Event handler for 'add to cart' buttons
      if (event.target.matches('.product-thumb__cart-btn, .product-thumb__cart-btn *')) {
         controlCart(event);
      }

      // Event handler for 'like' buttons
      if (event.target.matches('.product-thumb__like-btn, .product-thumb__like-btn *')) {
         controlLikes(event);
      }
   });
}