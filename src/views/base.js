export const elements = {
   headerNotice: document.querySelector('.header-notice'),
   headerNoticeBtn: document.querySelector('.header-notice__close-icon'),
   headerCartCounter: document.querySelector('.cart-link__counter'),

   searchForm: document.querySelector('.search-form'),
   searchInput: document.querySelector('.search-form__input'),

   mainMenuBtn: document.querySelector('.main-menu__btn'),
   mainMenuDropdown: document.querySelector('.main-menu__dropdown'),
   shadowOverlay: document.querySelector('.shadow-overlay'),

   mainMenuItems: document.querySelectorAll('.main-menu__item'),
   submenuItems: document.querySelectorAll('.submenu'),

   resultsMainGrid: document.querySelector('.results__main-grid'),
   resultsPages: document.querySelector('.results__page-buttons'),
   resultsCount: document.querySelector('.results__item-count'),


   productMain: document.querySelector('.product__main'),
   productTitle: document.querySelector('.product-header__title'),
   productManufacturer: document.querySelector('.product-header__manufacturer-data'),
   productModel: document.querySelector('.product-header__model-data'),
   productSku: document.querySelector('.product-header__sku-data'),
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

   cartGrid: document.querySelector('.cart-grid')
};



// ============== SIMPLE HIDE ELEMENT FUNCTION ==============
export const hideElement = (element) => {
     element.style.height = '0';
};

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
   
};
