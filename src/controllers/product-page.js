import * as productView from '../views/productView';
import { state, controlProductSearch, controlCart, controlLikes } from '../index';
import { elements, updateItemQuant } from '../views/base';


// PRODUCT PAGE CONTROLLER
// ===========================================================
export default async function controlProductPage(apiKey) {
   // Get search query from url parameter
   const urlQuery = window.location.search;

   if (urlQuery) {
      try {
         // Prepare UI for results

         // Perform Search and prepare results
         await controlProductSearch(urlQuery, apiKey);

         // Render results on UI
         productView.renderProduct(state.productSearch.results[0]);
         productView.renderLikeBtn(state.likes.isLiked(state.productSearch.results[0].sku), state.productSearch.results[0].sku)

      }  catch (error) {
         alert('Something went wrong when attempting to render product.');
         console.log(error);
      }
   }

   // Event Listeners
   // ===========================================================
   elements.productMain.addEventListener('click', (event) => {
      const itemSku = elements.productSku.innerHTML;

      // Event handler for product quantity
      if (event.target.matches('.quantity-calc__btns, .quantity-calc__btns *')) {
         let direction;

         event.target.className.includes('up') ? direction = 'up' : direction = 'down';

         updateItemQuant(direction, itemSku, (newQuantity) => {
            elements.productPrice.innerHTML = (newQuantity * state.productSearch.results[0].regularPrice).toFixed(2);
         });
      }

      // Event handler for 'add to cart' buttons
      if (event.target.matches('.product-info__cart-btn, .product-info__cart-btn *')) {
         controlCart(event);
      }

      // Event handler for 'like' buttons
      if (event.target.matches('.product-info__like-btn, .product-info__like-btn *')) {
         controlLikes(event);
      }
   });
 
   // Event handler for clicking navigation titles
   for (const navItem of elements.productNavItems) {
      navItem.addEventListener('click', productView.navItemsEvents);
   }

   // Event handler for click thumb images
   const productThumbs = document.querySelectorAll('.product-gallery__thumb-wrap');
   for (const element of productThumbs) {
      element.addEventListener('click', productView.thumbImgsEvents);
   }
}