// ===========================================================
// FILE DEPENDENCIES
// ===========================================================
import ProductSearch from './models/ProductSearch';
import CategorySearch from './models/CategorySearch';
import Likes from './models/Likes';
import Cart from './models/Cart';
import axios from 'axios';
import { elements, hideElement, updateItemQuant, cartBtnAnimation } from './views/base';

import * as headerView from './views/headerView';
import * as homeView from './views/homeView';
import * as resultsView from './views/resultsView';
import * as productView from './views/productView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';
import * as cartView from './views/cartView';


// ===========================================================
// STATE OF APP
// ===========================================================
const state = {};


// ===========================================================
// TOUCH SCREEN?
// ===========================================================
 if (('ontouchstart' in window) || 
      (navigator.maxTouchPoints > 0) || 
      (navigator.msMaxTouchPoints > 0)) {
         state.isTouchScreen = true;
}


// ===========================================================
// PRODUCTS SEARCH CONTROLLER
// ===========================================================
const controlProductSearch = async (query, apiKey) => {
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


// ===========================================================
// CART CONTROLLER
// ===========================================================
const controlCart = (event) => {
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


// ===========================================================
// CART PAGE CONTROLLER
// ===========================================================
const controlCartPage = () => {
   // Create HTML elements for each item in Cart model
   cartView.renderCartGridItems(state.cart.items);

   // Calculate the cart totals
   state.cart.calcTotals();

   // Display the cart totals
   cartView.updateCartSummary(state.cart.totals);

   // Event Listeners
   // ===========================================================
   elements.cartGrid.addEventListener('click', (event) => {
      // Event handlers for item quantity changes
      if (event.target.closest('.cart__quantity')) {
         const itemSku = event.target.closest('.cart__quantity').id.slice(5);
   
         if (event.target.matches('.quantity-calc__btns, .quantity-calc__btns *')) {
            let direction;
   
            if (event.target.className.includes('up')) {
               direction = 'up';
            } else {
               direction = 'down';
            }

            updateItemQuant(direction, itemSku, (newQuantity) => {
               state.cart.updateItem(itemSku, newQuantity)
            });

            cartView.displayRefreshBtn();
            window.location = '/cart';
         }

         // Event for removing item from cart
         if (event.target.matches('.cart__remove-btn, .cart__remove-btn *')) {
            state.cart.removeItem(itemSku); 
            location.reload(true);
         }
      }
   });
}


// ===========================================================
// LIKES CONTROLLER
// ===========================================================
const controlLikes = (event) => {
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


// ===========================================================
// LIKES PAGE CONTROLLER
// ===========================================================
const controlLikesPage = async () => {
   // Create temporary likes array mirrored from the original likes array (state object)
   // This is necessary to be able to like an item after unliking on the Like's page
   state.likes.createTempLikes();

   // Add index property to each object in array
   state.likes.tempLikes.forEach((element, index) => {
      element.index = index;
   });

   // Render results on UI
   resultsView.renderResults(state.likes.tempLikes);

   // Event Listeners
   // ===========================================================
   elements.resultsSection.addEventListener('click', event => {
      // Event handlers for pagination
      if (event.target.matches('.results-section__page-buttons, .results-section__page-buttons *')) {
         const btn = event.target.closest('.btn');

         if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            resultsView.clearResults();
            resultsView.renderResults(state.likes.tempLikes, goToPage);
         }
      }

      // Event handler for 'add to cart' buttons
      if (event.target.matches('.product-thumb__cart-btn, .product-thumb__cart-btn *')) {
         controlCart(event);
      }
      // Event handler for 'like' buttons
      if (event.target.matches('.product-thumb__like-btn, .product-thumb__like-btn *')) {
         controlLikes(event);
      }
   });
}


// ===========================================================
// RESULTS PAGE CONTROLLER
// ===========================================================
const controlResultsPage = async (apiKey) => {
   // Get search query from url parameter
   const urlQuery = window.location.search;
   
   if (urlQuery) {
      try {
         // Perform search and prepare results
         await controlProductSearch(urlQuery, apiKey);

         // Determine if any products are 'liked' by user
         state.productSearch.results.forEach((element) => {
            if (!state.likes.isLiked(element.sku)) {
            } else {
               element.liked = true;
            }
         });

         // Add an index property to each object in array
         state.productSearch.results.forEach((element, index) => {
            element.index = index
         });

         // Render results on UI
         resultsView.renderResults(state.productSearch.results);

      }  catch (error) {
         alert('Something went wrong when attempting to render product search results');
         console.log(error);
      }
   }

   // Event Listeners
   // ===========================================================
   elements.resultsSection.addEventListener('click', event => {
      // Event handler for pagination
      if (event.target.matches('.results-section__page-buttons, .results-section__page-buttons *')) {
         const btn = event.target.closest('.btn');

         if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            resultsView.clearResults();
            resultsView.renderResults(state.productSearch.results, goToPage);
         }
      }

      // Event handler for 'add to cart' buttons
      if (event.target.matches('.product-thumb__cart-btn, .product-thumb__cart-btn *')) {
         controlCart(event)
      }

      // Event handler for 'like' buttons
      if (event.target.matches('.product-thumb__like-btn, .product-thumb__like-btn *')) {
         controlLikes(event)
      }
   });
}
   

// ===========================================================
// PRODUCT PAGE CONTROLLER
// ===========================================================
const controlProductPage = async (apiKey) => {
   // Get search query from url parameter
   const urlQuery = window.location.search;

   if (urlQuery) {
      try {
         // Prepare UI for results

         // Perform Search and prepare results
         await controlProductSearch(urlQuery, apiKey);

         // Render results on UI
         productView.renderProduct(state.productSearch.results[0]);
         productView.renderLikeBtn(state.likes.isLiked(state.productSearch.results[0].sku), state.productSearch.results[0].sku)

      }  catch (error) {
         alert('Something went wrong when attempting to render product.');
         console.log(error);
      }
   }

   // Event Listeners
   // ===========================================================
   elements.productMain.addEventListener('click', (event) => {
      const itemSku = elements.productSku.innerHTML;

      // Event handler for product quantity
      if (event.target.matches('.quantity-calc__btns, .quantity-calc__btns *')) {
         let direction;

         event.target.className.includes('up') ? direction = 'up' : direction = 'down';

         updateItemQuant(direction, itemSku, (newQuantity) => {
            elements.productPrice.innerHTML = (newQuantity * state.productSearch.results[0].regularPrice).toFixed(2);
         });
      }

      // Event handler for 'add to cart' buttons
      if (event.target.matches('.product-info__cart-btn, .product-info__cart-btn *')) {
         controlCart(event);
      }

      // Event handler for 'like' buttons
      if (event.target.matches('.product-info__like-btn, .product-info__like-btn *')) {
         controlLikes(event);
      }
   });
 
   // Event handler for clicking navigation titles
   for (const navItem of elements.productNavItems) {
      navItem.addEventListener('click', productView.navItemsEvents);
   }

   // Event handler for click thumb images
   const productThumbs = document.querySelectorAll('.product-gallery__thumb-wrap');
   for (const element of productThumbs) {
      element.addEventListener('click', productView.thumbImgsEvents);
   }
}


// ===========================================================
// CATEGORIES SEARCH CONTROLLER
// ===========================================================
// Searches the BB API for current product categories to be dynamically loaded in main menu
const controlCategorySearch = async (apiKey) => {
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


// ===========================================================
// HEADER CONTROLLER
// ===========================================================
const controlHeader = async (apiKey) => {
   try {
      // Perform categories search
      await controlCategorySearch(apiKey);

   } catch (error) {
      alert('Something went wrong when attempting to render subcategories.');
      console.log(error);
   }

   // Organize the results
   state.categorySearch.organizeResults();

   // Add 'modifier' class to each main menu item: main-menu__item--1
   submenuView.addModClass(elements.mainMenuItems,'main-menu__item');

   // Render the submenus with subcategories for each main menu category
   submenuView.renderSubMenus(state.categorySearch.allSubCatArrays);

   // Update number of items in users cart icon (top right)
   elements.headerCartCounter.innerHTML = state.cart.getNumItems();

   // Event Listeners
   // ===========================================================
   elements.siteHeader.addEventListener('click', (event) => {
      // Event handler for open/close main menu
      if (event.target.matches('.main-menu__btn, .main-menu__btn *') || event.target.matches('.main-menu__header-icon')) {
         mainMenuView.toggleDropdown(elements.mainMenuDropdown);
      }

      // Event handler for user's account menu (after logged in)
      if (elements.accountMenuDropdown != null) {

         // Toggle account dropdown menu
         if (event.target.matches('.account-btn, .account-btn *')) {
            mainMenuView.toggleDropdown(elements.accountMenuDropdown);
         }

         // When 'Liked Items' link is clicked in the account menu
         if (event.target.matches('.account-menu__link--liked-items, .account-menu__link--liked-items *')) {
            event.preventDefault();

            if (state.likes.likes.length === 0) {
               headerView.showNoLikesMsg();
            } else {
               window.location = '/results/likes'
            }
         }

         // When 'Shopping Cart' link is clicked in the account menu
         if (event.target.matches('.account-menu__link--shopping-cart, .account-menu__link--shopping-cart *')) {
            event.preventDefault();
            
            if (Object.keys(state.cart.items).length === 0) {
               headerView.showNoItemsMsg();
            } else {
               window.location = '/cart';
            }
         }

         // When logout link is clicked
         if (event.target.matches('.account-menu__link--logout, .account-menu__link--logout *')) {
            event.preventDefault();
            logout();

            async function logout() {
               try {
                  await axios.post('/accounts/logout', {
                     cart: state.cart.items,
                     likes: state.likes.likes
                  })
                  .then(() => {
                     state.cart.clearLocalStorage();
                     state.likes.clearLocalStorage();
                     window.location = window.location.href;
                  })
               } catch (error) {
                  console.log(error);
               }
            }
         }
      }

      // When Cart link is clicked
      if (event.target.matches('.cart-link, .cart-link *')) {
         event.preventDefault();

         if (Object.keys(state.cart.items).length === 0) {
            headerView.showNoItemsMsg();
         } else {
            window.location = '/cart';
         }
      }
   });

      // Event handler when user clicks anywhere outside of main menu or account menu
      document.addEventListener('click', (event) => {
         if (elements.mainMenuDropdown.classList.contains('is-visible')) {
            mainMenuView.hideOnClickOutside(event, elements.mainMenuDropdown);
         
         } else if (elements.accountMenuDropdown != null && 
         elements.accountMenuDropdown.classList.contains('is-visible')) {
            mainMenuView.hideOnClickOutside(event, elements.accountMenuDropdown);
         }
      });

      // Event handler for open/close submenus of main menu
      if (!(screen.width < 576)) {
         submenuView.setUpSubmenuEvent('mouseover', submenuView.showSubMenu);
         submenuView.setUpSubmenuEvent('mouseleave', submenuView.hideSubMenu);
      } else {
         submenuView.setUpSubmenuEvent('click', submenuView.toggleSubMenu);
      }
      
      // Event handler for clicking 'X' (close) icon at very top of header
      elements.headerNoticeBtn.addEventListener('click', () => {
         hideElement(elements.headerNotice);
      });
}


// ===========================================================
// HOME PAGE CONTROLLER
// ===========================================================
const controlHomePage = () => {
   // Begin landing images transition rotation timing
   homeView.promotionRotation();
}


// ===========================================================
// LOGIN PAGE CONTROLLER
// ===========================================================
const controlLoginPage = () => {
   // Event Listeners
   // ===========================================================

   // Event handler for login button
   elements.accountLoginBtn.addEventListener('click', event => {
      // Prevent default href link event...
      event.preventDefault();

      // Instead run login function
      login();

      async function login() {
         const username = elements.accountLoginUsername.value;
         const password = elements.accountLoginPassword.value;

         try {
            // post the username and password entered by the user
            await axios.post('/accounts/login', {
               username: username,
               password: password
            })
            // Once a response is received from server
            .then(response => {
               // console.log('response:', response)
               
               // If error (such as incorrect username or password)
               if (response.data.error) {
                  return document.querySelector('.msg-header').innerHTML = response.data.error;
               }

               // If user's cart object from db has items, combine them with current cart items (prior to user login)
               if (response.data.cart != null) {
                  if (!(Object.keys(response.data.cart).length === 0)) {
                     state.cart.combineCarts(response.data.cart);
                  }
               }
               // If user's likes object from db has items, combine them with current liked items (prior to user login)
               if (response.data.likes != null) {
                  if (!(response.data.likes.length === 0)) {
                     state.likes.combineLikes(response.data.likes);
                  }
               }  
               
               // Route user to Home page
               return window.location = '/';
            });
      
         } catch (error) {
            if (error) {
               console.log(error);
            }
         }
      }
   });
}


// ===========================================================
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
      controlHeader(apiKey);
      if (pageLoc === '/product') {controlProductPage(apiKey)}
      if (pageLoc === '/results') {controlResultsPage(apiKey)}
   });

   if (pageLoc === '/cart') {controlCartPage()}
   if (pageLoc === '/accounts/login') {controlLoginPage()}
   if (pageLoc === '/results/likes') {controlLikesPage()}
   if (pageLoc === '/') {controlHomePage()}


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