// FILE DEPENDENCIES
// ===========================================================
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
import ProductSearch from './models/ProductSearch';
import CategorySearch from './models/CategorySearch';
import Likes from './models/Likes';
import Cart from './models/Cart';
import { elements, cartBtnAnimation } from './views/base';

// Views
import * as resultsView from './views/resultsView';
import * as productView from './views/productView';



// STATE OF APP
// ===========================================================
export const state = {};


// TOUCH SCREEN?
// ===========================================================
 if (('ontouchstart' in window) || 
      (navigator.maxTouchPoints > 0) || 
      (navigator.msMaxTouchPoints > 0)) {
         state.isTouchScreen = true;
}


// PRODUCTS SEARCH CONTROLLER
// ===========================================================
export const controlProductSearch = async (query, apiKey) => {
   // Create new search object and add to state
   state.productSearch = new ProductSearch(query);

   try {
      // Search for products
      await state.productSearch.getResults(apiKey);

   } catch (error) {
      alert('Something went wrong with the product search');
      console.log(error);
   }
}


// CART CONTROLLER
// ===========================================================
export const controlCart = (event) => {
   // Determine closest button HTML element and get the sku and index
   const buttonElement = event.target.closest('.btn'),
         idArray = buttonElement.id.split('-'),
         currentIndex = idArray[0],
         currentSku = idArray[1];
   let   currentQuantity;

   // If quantity of products exists (only on Product page) then get quantity
   if (elements.productQuantity) {
      currentQuantity = Number(elements.productQuantity.value);
   } else {
      currentQuantity = 1;
   }

   // 'Add to Cart' button animation lets user know item is being added
   cartBtnAnimation(buttonElement, state.cart.items[currentSku]);
   
   // If current page is Results, then use productSearch array; otherwise, use the 'Likes' array (Likes page)
   let source;
   window.location.pathname === '/results/likes' ? source = state.likes.likes : source = state.productSearch.results;

   // Add item to the Cart model
   state.cart.addItem(
      currentSku,
      source[currentIndex].image,
      source[currentIndex].name,
      source[currentIndex].regularPrice,
      currentQuantity
   );
   
   // Update number of items in cart icon located in HTML Header section
   elements.headerCartCounter.innerHTML = state.cart.getNumItems();
}


// LIKES CONTROLLER
// ===========================================================
export const controlLikes = (event) => {
   const buttonElement = event.target.closest('.btn'),
         iconElement = buttonElement.children[0],
         idArray = buttonElement.id.split('-'),
         currentIndex = idArray[0],
         currentSku = idArray[1];

   let   currentPage,
         likesPage,
         source,
         liked;

   // Determine page user is currently on
   currentPage = window.location.pathname;

   // Is the user on the Likes page?
   currentPage === '/results/likes' ? likesPage = true : likesPage = false;

   // See below regarding the user liking an item after unliking on the Like's page.
   // The code below eliminates the need to access the third party API again to re-like the item, which is optimal
   // If user is on Likes page, set array source to Likes model; otherwise, set source to productSearch model
   likesPage ? source = state.likes.likes[currentIndex] : source = state.productSearch.results[currentIndex];
   
   // Is item currently liked?
   liked = state.likes.isLiked(currentSku, likesPage);

   // If NOT liked...
   if (!liked) {
      // Add like to the likes array in app's state object
      state.likes.addLike(
         currentSku,
         source.name,
         source.image,
         source.regularPrice,
         source.customerReviewAverage,
         source.customerReviewCount,
         likesPage
      );

      // Toggle the 'like' button appearance
      toggleLikeIcon();

   // If currently liked...
   } else {
      // Remove like from the likes array from app's state object
      state.likes.deleteLike(currentSku, likesPage);

      // Toggle the 'Like' button appearance
      toggleLikeIcon();
   }

   function toggleLikeIcon() {
      if (currentPage === '/results' || currentPage === '/results/likes') {
         resultsView.toggleLikeBtn(liked, iconElement);
      } else if (currentPage === '/product') {
         productView.toggleLikeBtn(liked, iconElement);
      }
   }
}


// CATEGORIES SEARCH CONTROLLER
// ===========================================================
// Searches the BB API for current product categories to be dynamically loaded in main menu
export const controlCategorySearch = async (apiKey) => {
   // New category search object and add to state
   state.categorySearch = new CategorySearch();

   try {
      // Search categories
      await state.categorySearch.getResults(apiKey);

   } catch (error) {
      alert('Something went wrong with the categories search');
      console.log(error);
   }
}


// INITIALIZE APPLICATION
// ===========================================================
const init = () => {
   // Restore cart and liked items on each page load
   state.likes = new Likes();
   state.likes.readLocalStorage();
   state.cart = new Cart();
   state.cart.readLocalStorage();
   console.log('localStorage log:', localStorage);
   console.log('state object log:', state);

   // Current page user is viewing
   const pageLoc = window.location.pathname;

   // Obtain BB API key from server...
   getApiKey().then((response) => {
      const apiKey = response.data;

      // and pass key to appropriate controllers
      headerController(apiKey);
      if (pageLoc === '/product') {productPageController(apiKey)}
      if (pageLoc === '/results') {resultsPageController(apiKey)}
   });

   if (pageLoc === '/cart') {cartPageController()}
   if (pageLoc === '/accounts/login') {loginPageController()}
   if (pageLoc === '/results/likes') {likesPageController()}
   if (pageLoc === '/') {homePageController()}


   async function getApiKey() {
      try {
         let response = await axios.get('/apikey');
         return response;
      } catch (error) {
         console.log(error);
      }
   }
}

init();