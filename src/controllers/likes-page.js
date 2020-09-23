
import controlCart from './cart';
import controlLikes from './likes';
import * as resultsView from '../views/resultsView';
import { state } from '../index';
import { elements } from '../views/base';


// LIKES PAGE CONTROLLER
// ===========================================================
export default async function controlLikesPage() {
   // Create temporary likes array mirrored from the original likes array (state object)
   // This is necessary to be able to like an item after unliking on the Like's page
   state.likes.createTempLikes();

   // Add index property to each object in array
   state.likes.tempLikes.forEach((element, index) => {
      element.index = index;
   });

   // Render results on UI
   resultsView.renderResults(state.likes.tempLikes);

   // Event Listeners
   // ===========================================================
   elements.resultsSection.addEventListener('click', event => {
      // Event handlers for pagination
      if (event.target.matches('.results-section__page-buttons, .results-section__page-buttons *')) {
         const btn = event.target.closest('.btn');

         if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            resultsView.clearResults();
            resultsView.renderResults(state.likes.tempLikes, goToPage);
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