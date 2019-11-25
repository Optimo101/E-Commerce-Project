import { elements } from './base';

export const clearResults = () => {
   elements.resultsMainGrid.innerHTML = '';
   elements.resultsPages.innerHTML = '';
}


const renderProductItem = (product) => {

   product.name = product.name.replace(/"/g, '&quot;');

   console.log(product.name);

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

const renderItemCount = (itemStart, itemEnd, itemTotal) => {
   elements.resultsCount.innerHTML = `${itemStart} - ${itemEnd} of ${itemTotal} total items`
};

const createButton = (page, type) =>  `
   <button class="btn btn--small btn--black results__page-btn results__page-btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
         <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
         <i class="fas fa-angle-${type === 'prev' ? 'left' : 'right'}"></i>
   </button>
`;


const renderButtons = (page, numResults, resPerPage) => {
   const pages = Math.ceil(numResults / resPerPage); // 48 results / 20 = 2.4 rounded to 3 pages

   let button;
   if (page === 1 && pages > 1) {
      // Only display next page button
      button = createButton(page, 'next');

   } else if (page < pages) {
      // Both buttons
      button = `
         ${createButton(page, 'prev')}
         ${createButton(page, 'next')}
      `;
      
   } else if (page === pages && pages > 1) {
      // Only previous button
      button = createButton(page, 'prev')
   }

   elements.resultsPages.insertAdjacentHTML('afterbegin', button);
};


export const renderResults = (results, page = 1, resPerPage = 20) => {
   // Render results of current page
   const start = (page - 1) * resPerPage;
   const end = page * resPerPage;

   results.slice(start, end).forEach(renderProductItem);

   // Render item count of current page
   const itemStart = start + 1;
   const itemEnd = end;
   renderItemCount(itemStart, itemEnd, results.length);

   // Render page buttons of current page
   if (results.length >= resPerPage) {
      renderButtons(page, results.length, resPerPage);
   }
};