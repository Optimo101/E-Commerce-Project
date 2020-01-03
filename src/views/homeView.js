import { elements } from './base';


// const toggleBackgroundImg = (i) => {
   
//    setTimeout(function() {
//       elements.landingBackground.classList.replace(`landing__background--${i}`, `landing__background--${i+1}`);
//    }, 2000);
// };




export const promotionRotation = () => {
   let current = 0;

   const promoContent = {
      header: [
         'Versatile Laptops',
         'Looking to upgrade your camera?',
         'Music Where You Want It',
         'Movie nights just got better!'
      ],
      subHeader: [
         'Huge selection from top brands.',
         'Great deals happening right now.',
         'Beats by Dr. Dre, Sony, Apple and Bose.',
         'Flat screen TVs for every budget.'
      ],
      button: [
         'Shop Laptops',
         'Shop Cameras',
         'Shop Headphones',
         'Shop Televisions'
      ],
      href: [
         '/results?categoryPath.id=abcat0502000',
         '/results?categoryPath.id=abcat0401000',
         '/results?categoryPath.id=abcat0204000',
         '/results?categoryPath.id=abcat0101000'
      ]
   }

   setInterval(() => {
      let next = current + 1;
      
      current === 3 ? next = 0 : next = next;

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
         elements.landingPromoBtn.setAttribute('href',`${promoContent.href[next]}`)

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

