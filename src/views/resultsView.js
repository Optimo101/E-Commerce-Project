import { elements } from './base';

export const clearResults = () => {
   elements.resultsMainGrid.innerHTML = '';
   elements.resultsPages.innerHTML = '';
}

const renderStars = (rating) => {
   const int = Math.floor(rating);
   const dec = (rating * 10 - Math.floor(rating) * 10) / 10;
   const perc = dec * 100;

   let htmlString = '';
   
   for (let i = 0; i < int; i++) {
      htmlString += '<i class="product-thumb__review-icon fas fa-star"></i>';
   };

   if (dec) {
      htmlString += `<i class="product-thumb__review-icon fas fa-star product-thumb__review-icon--partial" style="background-image: linear-gradient(to right, #EB2F38 0%, #EB2F38 ${perc}%, #ffffff ${perc}%, #ffffff 100%);"></i>`
   };
     
   return htmlString;
};

export const toggleLikeBtn = (isLiked, currentElement) => {
   if (isLiked) {
      currentElement.setAttribute('class', 'product-thumb__like-icon product-thumb__like-icon--full fas fa-heart');
   } else {
      currentElement.setAttribute('class', 'product-thumb__like-icon far fa-heart');
   }
}


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
               (${product.customerReviewCount})
            </div>
         </div>
      </div>

      <div class="product-thumb__bottom-content">
         <div class="product-thumb__price">$${product.regularPrice}</div>
         <div class="product-thumb__btn-wrap">
            <button class="product-thumb__cart-btn btn btn--small btn--black" id="${product.index}-${product.sku}">
               <i class="product-thumb__cart-icon fas fa-shopping-cart"></i>
               Add to Cart
            </button>
            <button class="product-thumb__like-btn btn btn--small btn--black" id="${product.index}-${product.sku}">
               ${likeIconHtml}
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
   const pages = Math.ceil(numResults / resPerPage); // 48 results / 20 = 2.4 rounded up to 3 pages

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