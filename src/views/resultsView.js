import { elements, numberFormat, dollarFormat } from './base';

// Clear items from Results page
export const clearResults = () => {
   elements.resultsMainGrid.innerHTML = '';
   elements.resultsPages.innerHTML = '';
}

// Render review stars
const renderStars = (rating) => {
   const int = Math.floor(rating);
   const dec = (rating * 10 - Math.floor(rating) * 10) / 10;
   const perc = dec * 100;

   let htmlString = '';
   
   for (let i = 0; i < int; i++) {
      htmlString += '<i class="product-thumb__review-icon fas fa-star"></i>';
   }

   if (dec) {
      htmlString += `<i class="product-thumb__review-icon fas fa-star product-thumb__review-icon--partial" style="background-image: linear-gradient(to right, #f3d31f 0%, #f3d31f ${perc}%, #ffffff ${perc}%, #ffffff 100%);"></i>`
   }
     
   return htmlString;
}

// Toggle 'like' button icon appearance
export const toggleLikeBtn = (liked, currentElement) => {
   if (!liked) {
      currentElement.setAttribute('class', 'product-thumb__like-icon product-thumb__like-icon--full fas fa-heart');
   } else {
      currentElement.setAttribute('class', 'product-thumb__like-icon far fa-heart');
   }
}

// Render product item
const renderProductItem = (product) => {
   product.name = product.name.replace(/"/g, '&quot;');

   const likeIconHtml = product.liked ? '<i class="product-thumb__like-icon product-thumb__like-icon--full fas fa-heart"></i>' : '<i class="product-thumb__like-icon far fa-heart"></i>'

   const markup = 
   `<div class="product-thumb" id="${product.index}-${product.sku}">
      <a class="product-thumb__top-content" href="/product?search=${product.sku}">
         <img src="${product.image}" alt="${product.name}" class="product-thumb__img">
      </a>

      <div class="product-thumb__middle-content">
         <div class="product-thumb__desc-wrap">
            <a href="/product?search=${product.sku}" class="product-thumb__title">${product.name}</a>
         </div>

         <div class="product-thumb__review-wrap">
            <div class="product-thumb__review-stars">
               ${renderStars(product.customerReviewAverage)}
            </div>

            <div class="product-thumb__review-count">
               (${numberFormat(product.customerReviewCount)})
            </div>
         </div>
      </div>

      <div class="product-thumb__bottom-content">
         <div class="product-thumb__price">$${dollarFormat(product.regularPrice)}</div>
         <div class="product-thumb__btn-wrap">
            <button aria-label="Add to cart" class="product-thumb__cart-btn btn btn--small btn--black" id="${product.index}-${product.sku}">
               <i class="product-thumb__cart-icon fas fa-shopping-cart"></i>
               <span class="product-thumb__cart-btn-text">Add to Cart</span>
            </button>
            <button aria-label="Add to likes" class="product-thumb__like-btn btn btn--small btn--black" id="${product.index}-${product.sku}">
               ${likeIconHtml}
            </button>
         </div>
      </div>
   </div>`;

   elements.resultsMainGrid.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) =>  `
   <button aria-label="${type === 'prev' ? 'Previous page' : 'Next page'}" class="btn btn--small btn--black results-section__page-btn results-section__page-btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
         <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
         <i class="fas fa-angle-${type === 'prev' ? 'left' : 'right'}"></i>
   </button>
`;

// Render 'page' buttons at bottom of Results page
const renderButtons = (page, numResults, resPerPage) => {
   const pages = Math.ceil(numResults / resPerPage); // 48 results / 20 = 2.4 rounded up to 3 pages
   let   button;

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
}

// Render results of product search on Results page
export const renderResults = (results, page = 1, resPerPage = 20) => {
   const start = (page - 1) * resPerPage;
   const end = page * resPerPage;

   results.slice(start, end).forEach(renderProductItem);

   // Render page buttons of current page
   if (results.length >= resPerPage) {
      renderButtons(page, results.length, resPerPage);
   }
}