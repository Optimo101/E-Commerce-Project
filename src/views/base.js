export const elements = {
   headerNotice: document.querySelector('.header-notice'),
   headerNoticeBtn: document.querySelector('.header-notice__close-icon'),

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

   productImg: document.querySelector('.product-gallery__main-img'),
   productThumbsBox: document.querySelector('.product-gallery__thumbs-box'),
   productThumbs: document.querySelectorAll('.product-gallery__thumb-wrap'),
   productThumbImg: document.querySelector('.product-gallery__thumb-img'),

   productNavItems: document.querySelectorAll('.product-info__nav-item'),
   productNavContents: document.querySelectorAll('.product-info__nav-content'),

   productQuantity: document.querySelector('.product-info__quantity-input'),
   productAmount: document.querySelector('.product-info__total-amount'),
   productUpBtn: document.querySelector('.product-info__up-btn'),
   productDownBtn: document.querySelector('.product-info__down-btn')

};



// ============== SIMPLE HIDE ELEMENT FUNCTION ==============
export const hideElement = (element) => {
     element.style.height = '0';
};
