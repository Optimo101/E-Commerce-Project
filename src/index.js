// FILE DEPENDENCIES
// ===========================================================

// Libraries
import axios from 'axios';

// Controllers
import homePageController from './controllers/home-page';
import loginPageController from './controllers/login-page';
import likesPageController from './controllers/likes-page';
import cartPageController from './controllers/cart-page';
import resultsPageController from './controllers/results-page';
import productPageController from './controllers/product-page';
import headerController from './controllers/header';

// Models
import Likes from './models/Likes';
import Cart from './models/Cart';



// STATE OF APP
// ===========================================================
export const state = {};


// TOUCH SCREEN?
// ===========================================================
 if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
         state.isTouchScreen = true;
}


// INITIALIZE APP
// ===========================================================
const init = () => {
   // Restore cart and liked items on each page load
   state.likes = new Likes();
   state.cart = new Cart();
   state.likes.readLocalStorage();
   state.cart.readLocalStorage();

   // console.log('localStorage log:', localStorage);
   // console.log('state object log:', state);

   // Current page view
   const pageLoc = window.location.pathname;

   // Obtain BB API key from server and pass it to appropriate controllers
   getApiKey().then((response) => {
      const apiKey = response.data;

      headerController(apiKey);
      if (pageLoc === '/product') productPageController(apiKey)
      if (pageLoc === '/results') resultsPageController(apiKey)
   });

   if (pageLoc === '/cart') cartPageController()
   if (pageLoc === '/accounts/login') loginPageController()
   if (pageLoc === '/results/likes') likesPageController()
   if (pageLoc === '/') homePageController()
}

init();


async function getApiKey() {
   try {
      let response = await axios.get('/apikey');
      return response;
   } catch (error) {
      console.log(error);
   }
}