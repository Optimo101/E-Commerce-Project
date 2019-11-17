import { elements } from './base';

const renderProductThumb = (product) => {
   const markup = 
   `<div class="product-thumb">
      <a class="product-thumb__top-content" href="#">
         <img src="${product.image}" alt="${product.name}" class="product-thumb__img">
      </a>

      <div class="product-thumb__middle-content">
         <div class="product-thumb__desc-wrap">
            <a href="#" class="product-thumb__title">${product.name}</a>
         </div>

         <div class="product-thumb__review-wrap">
            <div class="product-thumb__review-stars">
               <i class="product-thumb__review-icon fas fa-star"></i>
               <i class="product-thumb__review-icon fas fa-star"></i>
               <i class="product-thumb__review-icon fas fa-star"></i>
               <i class="product-thumb__review-icon fas fa-star"></i>
               <i class="product-thumb__review-icon product-thumb__review-icon--empty far fa-star"></i>
            </div>
            <div class="product-thumb__review-count">
               (${product.customerReviewCount})
            </div>
         </div>
      </div>

      <div class="product-thumb__bottom-content">
         <div class="product-thumb__price">$${product.regularPrice}</div>
         <div class="product-thumb__btn-wrap">
            <button class="product-thumb__btn btn btn--small btn--black">
               <i class="product-thumb__cart-icon fas fa-shopping-cart"></i>
               Add to Cart
            </button>
            <button class="product-thumb__btn btn btn--small btn--black">
               <i class="product-thumb__heart-icon far fa-heart"></i>
            </button>
         </div>
      </div>
   </div>`;

   elements.resultsMainGrid.insertAdjacentHTML('beforeend', markup);
};



export const renderResults = (results, page = 1, resPerPage = 20) => {
   // Render results of current page
   const start = (page - 1) * resPerPage;
   const end = page * resPerPage;

   results.slice(start, end).forEach(renderProductThumb);

   //Render page buttons

};