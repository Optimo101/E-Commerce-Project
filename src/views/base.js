export const elements = {
   // HEADER ELEMENTS
   siteHeader: document.querySelector('.site-header'),
   headerNotice: document.querySelector('.header-notice'),
   headerNoticeText : document.querySelector('.header-notice__text'),
   headerNoticeBtn: document.querySelector('.header-notice__close-icon'),
   headerCartCounter: document.querySelector('.cart-link__counter'),

   // SEARCH FORM ELEMENTS
   searchForm: document.querySelector('.search-form'),
   searchInput: document.querySelector('.search-form__input'),

   // MAIN MENU ELEMENTS
   mainMenuBtn: document.querySelector('.main-menu__btn'),
   mainMenuDropdown: document.querySelector('.main-menu__dropdown'),
   shadowOverlay: document.querySelector('.shadow-overlay'),
   mainMenuItems: document.querySelectorAll('.main-menu__item'),
   submenuItems: document.querySelectorAll('.submenu'),

   // ACCOUNT MENU ELEMENTS
   accountMenuBtn: document.querySelector('.account-btn'),
   accountMenuDropdown: document.querySelector('.account-menu__dropdown'),
   accountLogoutLink: document.querySelector('.account-menu__link--logout'),

   // LOGIN PAGE ELEMENTS
   // accountLoginForm: document.querySelector('.sign-in__form'),
   accountLoginUsername: document.querySelector('.login-username'),
   accountLoginPassword: document.querySelector('.login-password'),
   accountLoginBtn: document.querySelector('.account-login-btn'),

   // HOME PAGE ELEMENTS
   landingSection: document.querySelector('.landing'),
   landingBackground: document.querySelector('.landing__background'),
   landingPromoBox: document.querySelector('.promotion'),
   landingPromoHeader: document.querySelector('.promotion__main-header'),
   landingPromoSubHeader: document.querySelector('.promotion__sub-header'),
   landingPromoBtn: document.querySelector('.promotion__btn'),

   // RESULTS PAGE ELEMENTS
   resultsSection: document.querySelector('.results-section'),
   resultsMainGrid: document.querySelector('.results-section__main-grid'),
   resultsPages: document.querySelector('.results-section__page-buttons'),
   resultsCount: document.querySelector('.results-section__item-count'),

   // PRODUCT PAGE ELEMENTS
   productMain: document.querySelector('.product-section__main'),
   productTitle: document.querySelector('.product__title'),
   productManufacturer: document.querySelector('.product-header__manufacturer-data'),
   productModel: document.querySelector('.product-header__model-data'),
   productSku: document.querySelector('.product-header__sku-data'),
   productImgLink: document.querySelector('.product-gallery__img-link'),
   productImg: document.querySelector('.product-gallery__main-img'),
   productThumbsBox: document.querySelector('.product-gallery__thumbs-box'),
   productNavItems: document.querySelectorAll('.product-info__nav-item'),
   productNavContents: document.querySelectorAll('.product-info__nav-content'),
   productQuantity: document.querySelector('.quantity-calc__input'),
   productPrice: document.querySelector('.product-info__total-price'),
   productQuantBtns: document.querySelector('.quantity-calc__btns'),
   productActionBox: document.querySelector('.product-info__user-action-box'),
   productCartBtn: document.querySelector('.product-info__cart-btn'),
   productReview: document.querySelector('.product-info__review-stars'),
   productReviewCount: document.querySelector('.product-info__review-count'),
   
   // CART PAGE ELEMENTS
   cartGrid: document.querySelector('.cart-grid'),
   cartSummarySubtotal: document.querySelector('.cart-summary__subtotal-number'),
   cartSummaryTaxes: document.querySelector('.cart-summary__tax-number'),
   cartSummaryShipping: document.querySelector('.cart-summary__shipping-number'),
   cartSummaryTotal: document.querySelector('.cart-summary__total-number')
}

// ============== SIMPLE HIDE ELEMENT FUNCTION ==============

export const dollarFormat = (num) => {
   return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

export const numberFormat = (num) => {
   return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};


export const hideElement = (element) => {
     element.style.height = '0';
}

export const updateItemQuant = (direction, sku, callback) => {
   const selectorString = `#item-${sku} .quantity-calc__input`;
   const inputElement = document.querySelector(selectorString) ? document.querySelector(selectorString) : elements.productQuantity;
   
   document.querySelector(selectorString);

   let currentQuantity = Number(inputElement.value);
   const newQuantity = direction === 'up' ?  currentQuantity += 1 : currentQuantity -= 1;

   if (newQuantity > 0 && newQuantity < 10) {
      inputElement.value = newQuantity;

      callback(newQuantity);
   }
}

export const cartBtnAnimation = (buttonElement, existingItem) => {
   const iconElement = buttonElement.children[0];
   const textElement = buttonElement.children[1];

   if (existingItem && existingItem.quantity === 9) {
      console.log(existingItem);
      textElement.innerHTML = '';
      textElement.innerHTML = 'Max Limit';
      iconElement.classList.remove('fa-shopping-cart');
      iconElement.classList.add('fa-exclamation');

   } else {
      textElement.innerHTML = '';
      textElement.innerHTML = 'Adding. . .';
      iconElement.classList.remove('fa-shopping-cart');
      iconElement.classList.add('fa-redo-alt');
      iconElement.classList.add('is-spinning');
   }

   const stopCartBtnAnimation = () => {
      textElement.innerHTML = '';
      textElement.innerHTML = 'Add to Cart';
      iconElement.classList.remove('is-spinning');
      iconElement.classList.remove('fa-redo-alt');
      iconElement.classList.add('fa-shopping-cart');
   }

   setTimeout(stopCartBtnAnimation, 500);
}
