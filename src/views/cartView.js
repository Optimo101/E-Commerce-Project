import { elements, dollarFormat } from './base';

export const renderCartGridItems = (cartItems) => {
   const items = Object.keys(cartItems);




   for (const item of items) {
      const html = `
         <div class="cart-grid__item">
            <div class="cart-grid__image-wrap">
                  <a href="/product?search=${cartItems[item].sku}" class="cart-grid__image-link">
                     <img src="${cartItems[item].image}" alt="${cartItems[item].name}" class="cart-grid__image">
                  </a>
            </div>
         </div>

         <div class="cart-grid__item">
            <a href="/product?search=${cartItems[item].sku}" class="cart-grid__title-link">
               <p class="cart-grid__name">${cartItems[item].name}</p>
            </a>
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
                  <button class="cart-grid__remove-btn btn btn--small btn--darkgrey">
                     Remove
                  </button>
               </div>

            </div>
         </div>

         <div class="cart-grid__item">
            <div class="cart-grid__total">

               <div class="cart-grid__total-price">
                  <span class="cart-grid__total-price-number">$${ dollarFormat(cartItems[item].itemTotal) }</span>
               </div>

               <div class="cart-grid__unit-price">
                  <p class="cart-grid__unit-price-text">($${ dollarFormat(cartItems[item].price) } each)</p>
               </div>

            </div>
         </div>
      `;

      elements.cartGrid.insertAdjacentHTML('beforeend', html);
   }
}

export const updateCartSummary = (totals) => {
   elements.cartSummarySubtotal.innerHTML = `${ dollarFormat(totals.subtotal) }`;
   elements.cartSummaryTaxes.innerHTML = `${ dollarFormat(totals.taxes) }`;
   elements.cartSummaryShipping.innerHTML = `${ dollarFormat(totals.shipping) }`;
   elements.cartSummaryTotal.innerHTML = `${ dollarFormat(totals.grandTotal) }`;
} 

export const displayRefreshBtn = () => {
   const checkoutBtn = document.querySelector('.cart-summary__checkout-btn');

   checkoutBtn.classList.remove('btn--darkgrey');
   checkoutBtn.classList.add('btn--green');
   checkoutBtn.innerHTML = 'Refresh Cart';
   checkoutBtn.setAttribute('href', '/cart');
}