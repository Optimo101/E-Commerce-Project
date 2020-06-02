import { elements, dollarFormat } from './base';

export const renderCartGridItems = (cartItems) => {
   const items = Object.keys(cartItems);

   for (const item of items) {
      const html = `
         <div class="cart__row">

            <div class="cart__left">
               <div class="cart__item cart__item--img">
                  <div class="cart__image-wrap">
                     <a href="/product?search=${cartItems[item].sku}" class="cart__image-link">
                        <img src="${cartItems[item].image}" class="cart__image" alt="${cartItems[item].name}">
                     </a>
                  </div>
               </div>
            </div>

            <div class="cart__right">
               <div class="cart__item cart__item--name">
                  <a href="/product?search=${cartItems[item].sku}" class="cart__title-link">
                     <p class="cart__name">${cartItems[item].name}</p>
                  </a>
               </div>
      
               <div class="cart__item cart__item--qty">
                  <div class="cart__quantity" id="item-${cartItems[item].sku}">
                     <div class="quantity-calc__wrap">
                        <label class="visually-hidden" for="quantity-calc__input">Item quantity</label>
                        <input id="quantity-calc__input" type="text" class="quantity-calc__input" name="quantity" value="${cartItems[item].quantity}" maxlength="1" minlength="1">
                        <span class="quantity-calc__btns">
                           <div class="quantity-calc__up-btn">
                              <i class="fas fa-angle-up"></i>
                           </div>
                           <div class="quantity-calc__down-btn">
                              <i class="fas fa-angle-down"></i>
                           </div>
                        </span>
                     </div>

                     <div class="cart__btn-wrap">
                        <button class="cart__remove-btn btn btn--small btn--darkgrey">
                           Remove
                        </button>
                     </div>
                  </div>
               </div>
      
               <div class="cart__item cart__item--price">
                  <div class="cart__total">
                     <div class="cart__total-price">
                        <span class="cart__total-price-number">$${ dollarFormat(cartItems[item].itemTotal) }</span>
                     </div>

                     <div class="cart__unit-price">
                        <p class="cart__unit-price-text">($${ dollarFormat(cartItems[item].price) }/ea)</p>
                     </div>
                  </div>
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