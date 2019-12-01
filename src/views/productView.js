import { elements } from './base';

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


};