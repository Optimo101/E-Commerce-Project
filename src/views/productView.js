import { elements } from './base';


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

   const imageProperties = [
      product.largeFrontImage,
      product.alternateViewsImage,
      product.angleImage,
      product.backViewImage,
      product.leftViewImage,
      product.rightViewImage,
      product.topViewImage,
      product.accessoriesImage
   ];

   let imagesArr = [];

   for (const image of imageProperties) {
      if (image) {
         imagesArr.push(image);
      }
   };
 
   const createImages = (images) => {
      for (const img of images) {
         const html = `
            <div class="product__thumb-container product__thumb-container--${images.indexOf(img)}">
               <img class="product__thumb product__thumb--${images.indexOf(img)}" src="${img}" alt="${product.name}">
            </div>
         `;
         document.querySelector('.product').insertAdjacentHTML('beforeend', html);
      };
   };

   // createImages(imagesArr)

   renderDescContent(product.longDescription);
   renderFeatContent(product.features);
   renderIncludedContent(product.includedItemList);
   renderSpecsContent(product.details);

};