import { elements } from './base';

const renderThumbImgs = (ImgsArr, productName) => {
   let html = '';

   for (const element of ImgsArr) {
      html += `
         <div class="product-gallery__thumb-wrap">
            <div class="product-gallery__inner-thumb-wrap">
               <img src="${element}" alt="${productName}" class="product-gallery__thumb-img">
            </div>
         </div>
      `;
   };
      
   elements.productThumbsBox.insertAdjacentHTML('afterbegin', html);

};

const renderDescContent = (longDescription) => {
   const html = `
      <div class="product-info__description">
         <p class="product-info__description-p">
            ${longDescription}
         </p>
      </div>
   `;

   elements.productNavContents[0].insertAdjacentHTML('afterbegin', html);
};

const renderFeatItems = (featItemsArr) => {
   let html = '';

   for (const element of featItemsArr) {
      const strArr = element.feature.split('\n');

      if (strArr[0] && strArr[1]) {
         html += `
            <li class="product-info__features-item">
               <h4 class="product-info__features-title">${strArr[0]}</h4>
               <p class="product-info__features-text">${strArr[1]}</p>
            </li>
         `;
      } else {
         html += `
         <li class="product-info__features-item">
            <h4 class="product-info__features-title">${strArr[0]}</h4>
         </li>
         `;
      }
      
   };

   return html;
};

const renderFeatContent = (featItemsArr) => {
   const html = `
   <ul class="product-info__features">
      ${renderFeatItems(featItemsArr)}
   </ul>
   `;

   elements.productNavContents[1].insertAdjacentHTML('afterbegin', html);

};


const renderIncludedItems = (includedItemsArr) => {
   let html = '';

   for (const element of includedItemsArr) {
      html += `
         <li class="product-info__included-item">
            <h4 class="product-info__included-title">${element.includedItem}</h4>
         </li>
      `;
   }

   return html;
};


const renderIncludedContent = (includedItemsArr) => {
   const html = `
   <ul class="product-info__included">
      ${renderIncludedItems(includedItemsArr)}
   </ul>
   `;

   elements.productNavContents[2].insertAdjacentHTML('afterbegin', html);
};


const renderSpecsItems = (specsArr) => {
   let ulList1 = `<ul class="product-info__specifications-titles">`;
   let ulList2 = `<ul class="product-info__specifications-values">`;

   for (const element of specsArr) {
      ulList1 += `
         <li class="product-info__specifications-item">
            <h4 class="product-info__specifications-title">${element.name}:</h4>
         </li>
      `;
   };

   ulList1 += `</ul>`;


   for (const element of specsArr) {
      ulList2 += `
         <li class="product-info__specifications-item">
            <p class="product-info__specifications-text">${element.value}</p>
         </li>
      `;
   };

   ulList2 += `</ul>`;

   const htmlArr = [ulList1, ulList2];

   return htmlArr;
};


const renderSpecsContent = (specsArr) => {
   
   const htmlListsArr = renderSpecsItems(specsArr);
   
   const html = `
      <div class="product-info__specifications">
         ${htmlListsArr[0]}
         ${htmlListsArr[1]}
      </div>
   `;

   elements.productNavContents[3].insertAdjacentHTML('afterbegin', html);
};


export const renderProduct = (product) => {
   console.log(product);

   const imgProperties = [
      product.largeFrontImage,
      product.alternateViewsImage,
      product.angleImage,
      product.backViewImage,
      product.leftViewImage,
      product.rightViewImage,
      product.topViewImage,
      product.accessoriesImage
   ];

   let imgsArr = [];

   for (const image of imgProperties) {
      if (image) {
         imgsArr.push(image);
      }
   };

   renderThumbImgs(imgsArr, product.name);
   renderDescContent(product.longDescription);
   renderFeatContent(product.features);
   renderIncludedContent(product.includedItemList);
   renderSpecsContent(product.details);

};

export const navItemsEvents = (event) => {
   const navItemElement = event.currentTarget;
   
   for (const element of elements.productNavItems) {
      element.classList.remove('product-info__nav-item--active');
   }
   navItemElement.classList.add('product-info__nav-item--active');
   
   for (const element of elements.productNavContents) {
      element.style.display = 'none';
   }
   const index = Array.prototype.indexOf.call(elements.productNavItems, navItemElement);
   elements.productNavContents[index].style.display = 'block';
};

export const thumbImgsEvents = (event) => {
   console.log('thumb img was clicked!');
   
   const imgElement = event.currentTarget.querySelector(elements.productThumbImg);
   console.log(imgElement);

   const imgSrc = imgElement.getAttribute('src');
   console.log(imgSrc);

   elements.productImg.setAttribute('src', imgSrc);

};