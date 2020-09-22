import * as cartView from '../views/cartView';
import { state } from '../index';
import { elements, updateItemQuant } from '../views/base';


// CART PAGE CONTROLLER
// ===========================================================
export default function controlCartPage() {
   // Create HTML elements for each item in Cart model
   cartView.renderCartGridItems(state.cart.items);

   // Calculate the cart totals
   state.cart.calcTotals();

   // Display the cart totals
   cartView.updateCartSummary(state.cart.totals);

   // Event Listeners
   // ===========================================================
   elements.cartGrid.addEventListener('click', (event) => {
      // Event handlers for item quantity changes
      if (event.target.closest('.cart__quantity')) {
         const itemSku = event.target.closest('.cart__quantity').id.slice(5);
   
         if (event.target.matches('.quantity-calc__btns, .quantity-calc__btns *')) {
            let direction;
   
            if (event.target.className.includes('up')) {
               direction = 'up';
            } else {
               direction = 'down';
            }

            updateItemQuant(direction, itemSku, (newQuantity) => {
               state.cart.updateItem(itemSku, newQuantity)
            });

            cartView.displayRefreshBtn();
            window.location = '/cart';
         }

         // Event for removing item from cart
         if (event.target.matches('.cart__remove-btn, .cart__remove-btn *')) {
            state.cart.removeItem(itemSku); 
            location.reload(true);
         }
      }
   });
}