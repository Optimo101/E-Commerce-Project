import { elements, hideElement, updateItemQuant, cartBtnAnimation } from './views/base';

import ProductSearch from './models/ProductSearch';
import CategorySearch from './models/CategorySearch';
import Likes from './models/Likes';
import Cart from './models/Cart';

import * as homeView from './views/homeView';
import * as resultsView from './views/resultsView';
import * as productView from './views/productView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';
import * as cartView from './views/cartView';


// GLOBAL STATE
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
};


// ===========================================================
// CART CONTROLLER
// ===========================================================
const controlCart = (event) => {
   const buttonElement = event.target.closest('.btn');
   const idArray = buttonElement.id.split('-');
   const currentIndex = idArray[0];
   const currentSku = idArray[1];
   let currentQuantity;



   if (elements.productQuantity) {
      currentQuantity = Number(elements.productQuantity.value);
   } else {
      currentQuantity = 1;
   }

   // Swap icon on 'Add to Cart' button to let user know item is being added to thier cart
   cartBtnAnimation(buttonElement, state.cart.items[currentSku]);
   
   // Add the item to the cart model
   state.cart.addItem(
      currentSku,
      state.productSearch.results[currentIndex].image,
      state.productSearch.results[currentIndex].name,
      state.productSearch.results[currentIndex].regularPrice,
      currentQuantity
   );

   // Update number of cart items in cart icon located in top right corner
   elements.headerCartCounter.innerHTML = state.cart.getNumItems();
};

// ===========================================================
// CART PAGE CONTROLLER
// ===========================================================
const controlCartPage = () => {
   cartView.renderCartGridItems(state.cart.items);

   state.cart.calcTotals();
   cartView.updateCartSummary(state.cart.totals);

   elements.cartGrid.addEventListener('click', (event) => {
   
      if (event.target.closest('.cart-grid__quantity')) {
         const itemSku = event.target.closest('.cart-grid__quantity').id.slice(5);
   
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

            cartView.highlightRefreshBtns(itemSku);
         };

         if (event.target.matches('.cart-grid__remove-btn, .cart-grid__remove-btn *')) {
            state.cart.removeItem(itemSku); 
            location.reload(true);
         }

         if (event.target.matches('.cart-grid__refresh-btn, .cart-grid__refresh-btn *')) {
            location.reload(true);
         }
      }
   });

};

// ===========================================================
// LIKE CONTROLLER
// ===========================================================
const controlLikes = (event) => {
   const buttonElement = event.target.closest('.btn');
   const iconElement = buttonElement.children[0];
   const idArray = buttonElement.id.split('-');
   const currentIndex = idArray[0];
   const currentSku = idArray[1];

   // User has NOT yet liked current product
   if (!state.likes.isLiked(currentSku)) {
      // Add like to the state
      state.likes.addLike(
         currentSku,
         state.productSearch.results[currentIndex].name,
         state.productSearch.results[currentIndex].image,
         state.productSearch.results[currentIndex].regularPrice
      );

      // Toggle the like button
      if (window.location.pathname === '/results') {
         resultsView.toggleLikeBtn(true, iconElement);
      } else if (window.location.pathname === '/product') {
         productView.toggleLikeBtn(true, iconElement);
      }

      // Add like to UI list
      // COMING SOON!!!

   // User HAS liked the current product
   } else {
      // Remove like to the state
      state.likes.deleteLike(currentSku);

      // Toggle the like button
      if (window.location.pathname === '/results') {
         resultsView.toggleLikeBtn(false, iconElement);
      } else if (window.location.pathname === '/product') {
         productView.toggleLikeBtn(false, iconElement);
      }

      // Remove like to UI list
      // COMING SOON!!!
   }
}


// ===========================================================
// RESULTS PAGE CONTROLLER
// ===========================================================
const controlResultsPage = async () => {
   // Get search query from url parameter
   const urlQuery = window.location.search;
   
   if (urlQuery) {
      try {
         // Prepare UI for results

         // Perform Search and prepare results
         await controlProductSearch(urlQuery);

         // Determine if any products are 'Liked' by user
         state.productSearch.results.forEach((element) => {
            if (!state.likes.isLiked(element.sku)) {
            } else {
               element.liked = true;
            }
         });


         // Render results on UI
         state.productSearch.results.forEach((element, index) => {
            element.index = index;
         });

         resultsView.renderResults(state.productSearch.results);

      }  catch (error) {
         alert('Somthing went wrong when attempting to render product search results');
         console.log(error);
      }

   }

   // EVENT LISTENERS
   // ===========================================================
   elements.resultsSection.addEventListener('click', event => {
      if (event.target.matches('.results-section__page-buttons, .results-section__page-buttons *')) {
         const btn = event.target.closest('.btn');

         if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            resultsView.clearResults();
            resultsView.renderResults(state.productSearch.results, goToPage);
         };
      }

      if (event.target.matches('.product-thumb__cart-btn, .product-thumb__cart-btn *')) {
         controlCart(event);
      }

      if (event.target.matches('.product-thumb__like-btn, .product-thumb__like-btn *')) {
         controlLikes(event);
      }
   });
};
   

// ===========================================================
// PRODUCT PAGE CONTROLLER
// ===========================================================
const controlProductPage = async () => {

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
         alert('Somthing went wrong when attempting to render product.');
         console.log(error);
      }
   };

   // EVENT LISTENERS
   // ===========================================================
   elements.productMain.addEventListener('click', (event) => {
      const itemSku = elements.productSku.innerHTML;

      // When product quantity buttons are clicked
      if (event.target.matches('.quantity-calc__btns, .quantity-calc__btns *')) {
         let direction;

         if (event.target.className.includes('up')) {
            direction = 'up';
         } else {
            direction = 'down';
         }

         updateItemQuant(direction, itemSku, function(newQuantity) {
            elements.productPrice.innerHTML = (newQuantity * state.productSearch.results[0].regularPrice).toFixed(2);
         });
      }
   });

 
   // When nav titles are clicked
   for (const navItem of elements.productNavItems) {
      navItem.addEventListener('click', productView.navItemsEvents);
   };

   // When thumb images are clicked
   const productThumbs = document.querySelectorAll('.product-gallery__thumb-wrap');
   for (const element of productThumbs) {
      element.addEventListener('click', productView.thumbImgsEvents);
   };

   // When 'Add to Cart' button is clicked
   elements.productCartBtn.addEventListener('click', controlCart);

   // When 'Like' button is clicked
   document.querySelector('.product-info__like-btn').addEventListener('click', controlLikes);
   
};


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
         alert('Somthing went wrong with the categories search');
         console.log(error);
      }
   };


// ===========================================================
// HEADER CONTROLLER
// ===========================================================
const controlHeader = async () => {
   try {
      // Perform categories search
      await controlCategorySearch();

   } catch (error) {
      alert('Somthing went wrong when attempting to render subcategories.');
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


   // EVENT LISTENERS
   // ===========================================================
      // Close menus when click anywhere outside of menus
      document.addEventListener('click', function(event) {
         if (elements.mainMenuDropdown.classList.contains('is-visible')) {
            mainMenuView.hideOnClickOutside(event, elements.mainMenuDropdown);
         
         } else if (elements.accountMenuDropdown != null && 
         elements.accountMenuDropdown.classList.contains('is-visible')) {
            mainMenuView.hideOnClickOutside(event, elements.accountMenuDropdown);
         }
      });
   
      
      // Open/close main menu
      elements.mainMenuBtn.addEventListener('click', function() {
         mainMenuView.toggleDropdown(elements.mainMenuDropdown);
      });

      // Open/close account menu
      if (elements.accountMenuDropdown != null) {
         elements.accountMenuBtn.addEventListener('click', function() {
            mainMenuView.toggleDropdown(elements.accountMenuDropdown);
         });
      }


      // Open/close main menu
      submenuView.setUpSubmenuEvent('mouseover', submenuView.showSubMenu);
      submenuView.setUpSubmenuEvent('mouseleave', submenuView.hideSubMenu); 
      
      // Header notice close button
      elements.headerNoticeBtn.addEventListener('click', function() {
         hideElement(elements.headerNotice);
      });
};


// ===========================================================
// HOME PAGE CONTROLLER
// ===========================================================
const controlHomePage = () => {

   homeView.promotionRotation();


   
};


// ===========================================================
// INITIALIZE APPLICATION
// ===========================================================
const init = () => {
   // Restore cart and saved/liked items on page load
   // window.addEventListener('load', () => {
      state.likes = new Likes();
      state.likes.readLocalStorage();

      state.cart = new Cart();
      state.cart.readLocalStorage();

      console.log(localStorage);
      console.log(state);
   // });

   controlHeader();

   if (window.location.pathname === '/product') {
      controlProductPage();
   } else if (window.location.pathname === '/results') {
      controlResultsPage();
   } else if (window.location.pathname === '/cart') {
      controlCartPage();
   } else if (window.location.pathname === '/') {
      controlHomePage();
   }
};

init();