import { elements, cartBtnAnimation } from '../views/base';
import { state } from '../index';


// CART CONTROLLER
// ===========================================================
export default function controlCart(event) {
   // Determine closest button HTML element and get the sku and index
   const buttonElement = event.target.closest('.btn'),
         idArray = buttonElement.id.split('-'),
         currentIndex = idArray[0],
         currentSku = idArray[1];
   let   currentQuantity;

   // If quantity of products exists (only on Product page) then get quantity
   if (elements.productQuantity) {
      currentQuantity = Number(elements.productQuantity.value);
   } else {
      currentQuantity = 1;
   }

   // 'Add to Cart' button animation lets user know item is being added
   cartBtnAnimation(buttonElement, state.cart.items[currentSku]);
   
   // If current page is Results, then use productSearch array; otherwise, use the 'Likes' array (Likes page)
   let source;
   window.location.pathname === '/results/likes' ? source = state.likes.likes : source = state.productSearch.results;

   // Add item to the Cart model
   state.cart.addItem(
      currentSku,
      source[currentIndex].image,
      source[currentIndex].name,
      source[currentIndex].regularPrice,
      currentQuantity
   );
   
   // Update number of items in cart icon located in HTML Header section
   elements.headerCartCounter.innerHTML = state.cart.getNumItems();
}