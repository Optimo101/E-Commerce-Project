// ===========================================================
// FILE DEPENDENCIES
// ===========================================================
import ProductSearch from './models/ProductSearch';
import CategorySearch from './models/CategorySearch';
import Likes from './models/Likes';
import Cart from './models/Cart';
import axios from 'axios';
import { elements, hideElement, updateItemQuant, cartBtnAnimation } from './views/base';

import * as homeView from './views/homeView';
import * as resultsView from './views/resultsView';
import * as productView from './views/productView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';
import * as cartView from './views/cartView';



// ===========================================================
// CURRENT STATE OF APP
// ===========================================================
const state = {};



// ===========================================================
// PRODUCTS SEARCH CONTROLLER
// ===========================================================
const controlProductSearch = async (query) => {
   // Create new search object and add to state
   state.productSearch = new ProductSearch(query);

   try {
      // Search for products
      await state.productSearch.getResults();

   } catch (error) {
      alert('Somthing went wrong with the product search');
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

   console.log(buttonElement, currentIndex, currentSku);

   // If quantity of products exists (only on Product page) then get quantity
   if (elements.productQuantity) {
      currentQuantity = Number(elements.productQuantity.value);
   } else {
      currentQuantity = 1;
   }

   console.log(currentQuantity);

   // 'Add to Cart' button animation lets user know item is being added
   cartBtnAnimation(buttonElement, state.cart.items[currentSku]);
   
   // If current page is Results, then use productSearch array; otherwise, use the 'Likes' array (Likes page)
   let source;
   window.location.pathname === '/results/likes' ? source = state.likes.likes : source = state.productSearch.results;

   console.log(source);

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
   console.log('Beginning controlCartPage()...')

   // Create HTML elements for each item in Cart model
   cartView.renderCartGridItems(state.cart.items);

   // Calculate the cart totals
   state.cart.calcTotals();

   // Display the cart totals
   cartView.updateCartSummary(state.cart.totals);

   // Event Listeners
   // ===========================================================
   elements.cartGrid.addEventListener('click', (event) => {
   
      if (event.target.closest('.cart-grid__quantity')) {
         const itemSku = event.target.closest('.cart-grid__quantity').id.slice(5);
   
         // Event for increasing and decreasing item quantities
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
         }

         // Event for removing item from cart
         if (event.target.matches('.cart-grid__remove-btn, .cart-grid__remove-btn *')) {
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

   // Determine which page user is currently on
   currentPage = window.location.pathname;
   // Is the user on the Likes page?
   currentPage === '/results/likes' ? likesPage = true : likesPage = false;
   // If user is on Likes page, set array source to Likes model; otherwise, set source to productSearch model
   likesPage ? source = state.likes.likes[currentIndex] : source = state.productSearch.results[currentIndex];
   // Is item currently liked?
   liked = state.likes.isLiked(currentSku, likesPage);

   // If product is NOT liked
   if (!liked) {
      // Add like to the state Likes model
      state.likes.addLike(
         currentSku,
         source.name,
         source.image,
         source.regularPrice,
         source.customerReviewAverage,
         source.customerReviewCount,
         likesPage
      );

      // Toggle the 'Like' button appearance
      toggleLikeIcon();

   // If product IS currently liked
   } else {
      // Remove like from the state
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
   console.log('Beginning controlLikesPage()...');
   // Copy 'likes' to 'tempLikes' in Likes model (necessary for adding back a 'like' after removing in Likes page)
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
      if (event.target.matches('.results-section__page-buttons, .results-section__page-buttons *')) {
         const btn = event.target.closest('.btn');

         if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            resultsView.clearResults();
            resultsView.renderResults(state.likes.tempLikes, goToPage);
         }
      }

      if (event.target.matches('.product-thumb__cart-btn, .product-thumb__cart-btn *')) {
         controlCart(event);
      }

      if (event.target.matches('.product-thumb__like-btn, .product-thumb__like-btn *')) {
         controlLikes(event);
      }
   });
}



// ===========================================================
// RESULTS PAGE CONTROLLER
// ===========================================================
const controlResultsPage = async () => {
   console.log('Beginning controlResultsPage()...');

   // Get search query from url parameter
   const urlQuery = window.location.search;
   
   if (urlQuery) {
      try {
         // Prepare UI for results

         // Perform search and prepare results
         await controlProductSearch(urlQuery);

         // Determine if any products are 'liked' by user
         state.productSearch.results.forEach((element) => {
            if (!state.likes.isLiked(element.sku)) {
            } else {
               element.liked = true;
            }
         });

         // Add index property to each object in array
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
      if (event.target.matches('.results-section__page-buttons, .results-section__page-buttons *')) {
         const btn = event.target.closest('.btn');

         if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            resultsView.clearResults();
            resultsView.renderResults(state.productSearch.results, goToPage);
         }
      }

      if (event.target.matches('.product-thumb__cart-btn, .product-thumb__cart-btn *')) {
         controlCart(event)
      }

      if (event.target.matches('.product-thumb__like-btn, .product-thumb__like-btn *')) {
         controlLikes(event)
      }
   });
}
   


// ===========================================================
// PRODUCT PAGE CONTROLLER
// ===========================================================
const controlProductPage = async () => {
   console.log('Beginning controlProductPage()...')

   // Get search query from url parameter
   const urlQuery = window.location.search;

   if (urlQuery) {
      try {
         // Prepare UI for results

         // Perform Search and prepare results
         await controlProductSearch(urlQuery);

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

      // When product quantity buttons are clicked
      if (event.target.matches('.quantity-calc__btns, .quantity-calc__btns *')) {
         let direction;

         event.target.className.includes('up') ? direction = 'up' : direction = 'down';

         updateItemQuant(direction, itemSku, (newQuantity) => {
            elements.productPrice.innerHTML = (newQuantity * state.productSearch.results[0].regularPrice).toFixed(2);
         });
      }

      // When 'Add to Cart' button is clicked
      if (event.target.matches('.product-info__cart-btn, .product-info__cart-btn *')) {
         controlCart(event);
      }

      // When 'Like' button is clicked
      if (event.target.matches('.product-info__like-btn, .product-info__like-btn *')) {
         controlLikes(event);
      }
   });
 
   // When nav titles are clicked
   for (const navItem of elements.productNavItems) {
      navItem.addEventListener('click', productView.navItemsEvents);
   }

   // When thumb images are clicked
   const productThumbs = document.querySelectorAll('.product-gallery__thumb-wrap');
   for (const element of productThumbs) {
      element.addEventListener('click', productView.thumbImgsEvents);
   }
}



// ===========================================================
// CATEGORIES SEARCH CONTROLLER
// ===========================================================
const controlCategorySearch = async () => {
   // New category search object and add to state
   state.categorySearch = new CategorySearch();

   try {
      // Search categories
      await state.categorySearch.getResults();

   } catch (error) {
      alert('Something went wrong with the categories search');
      console.log(error);
   }
}


// ===========================================================
// HEADER CONTROLLER
// ===========================================================
const controlHeader = async () => {

   try {
      // Perform categories search
      await controlCategorySearch();

   } catch (error) {
      alert('Something went wrong when attempting to render subcategories.');
      console.log(error);
   }

    // Organize the results to be used for rendering
    state.categorySearch.organizeResults();

    // Add modifier classes to each main menu item: main-menu__item--1
    submenuView.addModClass(elements.mainMenuItems,'main-menu__item');
 
    // Render the submenus with subcategories for each main menu category
    submenuView.renderSubMenus(state.categorySearch.allSubCatArrays);

    // Update number of items showing in header cart icon
    elements.headerCartCounter.innerHTML = state.cart.getNumItems();

   // Event Listeners
   // ===========================================================
   elements.siteHeader.addEventListener('click', (event) => {
      // Open/close main menu
      if (event.target.matches('.main-menu__btn, .main-menu__btn *')) {
         mainMenuView.toggleDropdown(elements.mainMenuDropdown);
      }

      // Account menu events (after user has logged in)
      if (elements.accountMenuDropdown != null) {

         // Toggle account dropdown menu
         if (event.target.matches('.account-btn, .account-btn *')) {
            mainMenuView.toggleDropdown(elements.accountMenuDropdown);
         }

         // When user clicks the 'Liked Items' link in the account menu
         if (event.target.matches('.account-menu__link--liked-items, .account-menu__link--liked-items *')) {
            event.preventDefault();

            if (state.likes.likes.length === 0) {
               return window.alert("You currently do not have any 'liked' items.");
            }
   
            window.location = '/results/likes';
         }

         // If user clicks the 'Shopping Cart' link in the account menu
         if (event.target.matches('.account-menu__link--shopping-cart, .account-menu__link--shopping-cart *')) {
            event.preventDefault();
            
            if (Object.keys(state.cart.items).length === 0) {
               return window.alert("There are no items in your cart. Go shopping!");
            }
   
            window.location = '/cart';
         }

         // When user clicks logout link
         if (event.target.matches('.account-menu__link--logout, .account-menu__link--logout *')) {
            event.preventDefault();
            logout();

            async function logout() {
               try {
                  await axios.post('/user/logout', {
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

      // When user clicks Cart link
      if (event.target.matches('.cart-link, .cart-link *')) {
         event.preventDefault();

         if (Object.keys(state.cart.items).length === 0) {
            return window.alert("There are no items in your cart. Go shopping!");
         }

         window.location = '/cart';
      }
   });

      // Close menus when click anywhere outside of menus
      document.addEventListener('click', (event) => {
         if (elements.mainMenuDropdown.classList.contains('is-visible')) {
            mainMenuView.hideOnClickOutside(event, elements.mainMenuDropdown);
         
         } else if (elements.accountMenuDropdown != null && 
         elements.accountMenuDropdown.classList.contains('is-visible')) {
            mainMenuView.hideOnClickOutside(event, elements.accountMenuDropdown);
         }
      });

      // Open/close submenus
      submenuView.setUpSubmenuEvent('mouseover', submenuView.showSubMenu);
      submenuView.setUpSubmenuEvent('mouseleave', submenuView.hideSubMenu); 
}



// ===========================================================
// HOME PAGE CONTROLLER
// ===========================================================
const controlHomePage = () => {
   console.log('Beginning controlHomePage()...')

   // Begin image slides in landing section
   homeView.promotionRotation();

   // Event Listeners
   // ===========================================================
   elements.headerNoticeBtn.addEventListener('click', () => {
      hideElement(elements.headerNotice);
      });
}

  

// ===========================================================
// LOGIN PAGE CONTROLLER
// ===========================================================
const controlLoginPage = () => {
   console.log('Beginning controlLoginPage()...')

   // Event Listeners
   // ===========================================================
   elements.accountLoginBtn.addEventListener('click', event => {
      event.preventDefault();
      login();

      async function login() {
         const username = elements.accountLoginUsername.value;
         const password = elements.accountLoginPassword.value;

         try {
            await axios.post('/user/login', {
               username: username,
               password: password
            })
            .then(response => {
               if (response.data.error) {
                  return document.querySelector('.msg-header').innerHTML = response.data.error;
               }

               if (response.data.cart != null) {
                  if (!(Object.keys(response.data.cart).length === 0)) {
                     state.cart.combineCarts(response.data.cart);
                  }
               }
            
               if (response.data.likes != null) {
                  if (!(response.data.likes.length === 0)) {
                     state.likes.combineLikes(response.data.likes);
                  }
               }  
                  
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
   // Restore cart and saved/liked items on page load
   state.likes = new Likes();
   state.likes.readLocalStorage();
   state.cart = new Cart();
   state.cart.readLocalStorage();

   console.log(localStorage);
   console.log('State', state);

   const pageLoc = window.location.pathname;

   controlHeader();

   if (pageLoc === '/product') {controlProductPage()}
   if (pageLoc === '/results') {controlResultsPage()}
   if (pageLoc === '/cart') {controlCartPage()}
   if (pageLoc === '/user/login') {controlLoginPage()}
   if (pageLoc === '/results/likes') {controlLikesPage()}
   if (pageLoc === '/') {controlHomePage()}
}

init();