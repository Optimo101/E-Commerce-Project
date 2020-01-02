import { elements } from './base';


// const toggleBackgroundImg = (i) => {
   
//    setTimeout(function() {
//       elements.landingBackground.classList.replace(`landing__background--${i}`, `landing__background--${i+1}`);
//    }, 2000);
// };




export const beginBackgroundFade = () => {
   let current = 0;

   const promoContent = {
      header: [
         'The Most Powerful Laptops',
         'Looking to upgrade your Camera?',
         'Music Where You Want It',
         'Sophisticated Tech'
      ],
      subHeader: [
         'Huge selection from top brands.',
         'Great deals happening right now.',
         'Apple, Beats by Dr. Dre, Sony, and Bose.',
         'Smartwatches available for every budget.'],
      button: [
         'Shop Laptops',
         'Shop Cameras',
         'Shop Headphones',
         'Shop Smartwatches']
   }
   
   

   setInterval(() => {
      let next = current + 1;
      
      current === 3 ? next = 0 : next = next;

      // elements.landingBackgrounds[current].classList.remove('landing__background--fade-in');
      elements.landingBackground.classList.add('shrink-and-slide');
      elements.landingPromoBox.classList.add('slide-and-fade');
     
      setTimeout(() => {
         elements.landingBackground.style.backgroundImage = `url(../../img/landing-img-${next}.jpg)`

         elements.landingPromoHeader.innerHTML = '';
         elements.landingPromoSubHeader.innerHTML = '';
         elements.landingPromoBtn.innerHTML = '';

         elements.landingPromoHeader.innerHTML = `${promoContent.header[next]}`;
         elements.landingPromoSubHeader.innerHTML = `${promoContent.subHeader[next]}`;
         elements.landingPromoBtn.innerHTML = `${promoContent.button[next]}`;

         current < 3 ? current ++ : current = 0;

      }, 1500);

      // setTimeout(() => {
      //    elements.landingBackgrounds[current].classList.remove('landing__background--fade-out');
      //    elements.landingBackgrounds[next].classList.add('landing__background--fade-in');

      // }, 2000);
      setTimeout(() => {
         elements.landingBackground.classList.remove('shrink-and-slide');
         elements.landingPromoBox.classList.remove('slide-and-fade');


      }, 7000)

   }, 8000);

  

   // const fadeBackground = (i) => {
   //    setTimeout(() => {
   //       elements.landingBackground.classList.replace(`landing__background--${i}`, `landing__background--${i+1}`);
   //    }, 2600);
   // };


};

