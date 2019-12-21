import { elements } from './base';

export const renderCartGrid = (cartItems) => {
   const items = Object.keys(cartItems);

   for (const item of items) {
      const html = `
         <div class="cart-grid__item">
            <div class="cart-grid__image-outer-wrap">
               <div class="cart-grid__image-inner-wrap">
                  <img src="${cartItems[item].image}" alt="${cartItems[item].name}" class="cart-grid__image">
               </div>
            </div>
         </div>

         <div class="cart-grid__item">
            <p class="cart-grid__name">  
            ${cartItems[item].name}
            </p>
         </div>

         <div class="cart-grid__item">
            <div class="cart-grid__quantity" id="item-${cartItems[item].sku}">
               <div class="quantity-calc__wrap">
                  <input type="text" class="quantity-calc__input" name="quantity" value="${cartItems[item].quantity}" maxlength="1" minlength="1">
                  <span class="quantity-calc__btns">
                     <div class="quantity-calc__up-btn">
                        <i class="fas fa-angle-up"></i>
                     </div>
                     <div class="quantity-calc__down-btn">
                        <i class="fas fa-angle-down"></i>
                     </div>
                  </span>
               </div>

               <div class="cart-grid__btn-wrap">
                  <button href="/cart" class="cart-grid__remove-btn btn btn--small btn--darkgrey">
                     <i class="cart-grid__remove-icon fas fa-times-circle"></i>
                  </button>
                  <button href="/cart" class="cart-grid__refresh-btn btn btn--small btn--darkgrey">
                     <i class="cart-grid__refresh-icon fas fa-redo-alt"></i>
                  </button>
               </div>

            </div>
         </div>

         <div class="cart-grid__item">
            <div class="cart-grid__total">

               <div class="cart-grid__total-price">
                  <span class="cart-grid__total-price-number">$${cartItems[item].itemTotal}</span>
               </div>

               <div class="cart-grid__unit-price">
                  <p class="cart-grid__unit-price-text">($${cartItems[item].price} each)</p>
               </div>

            </div>
         </div>
      `;

      elements.cartGrid.insertAdjacentHTML('beforeend', html);
   };
}