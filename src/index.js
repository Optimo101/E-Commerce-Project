import { elements, hideElement } from './views/base';

import ProductSearch from './models/ProductSearch';
import CategorySearch from './models/CategorySearch';
import Likes from './models/Likes';

import * as resultsView from './views/resultsView';
import * as productView from './views/productView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';


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

      // Determine if any products are 'Liked' by user
      for (const element of state.productSearch.results) {
         if (!state.likes.isLiked(element.sku)) {
            continue
         } else {
            element.liked = true;
         }
      };

   console.log(state.productSearch.results);
};

// ===========================================================
// LIKE CONTROLLER
// ===========================================================
const controlLike = () => {
   // if (!state.likes) state.likes = new Likes();

   const currentSku = state.productSearch.results[0].sku;

   // User has NOT yet liked current product
   if (!state.likes.isLiked(currentSku)) {
      // Add like to the state
      state.likes.addLike(
         currentSku,
         state.productSearch.results[0].name,
         state.productSearch.results[0].image,
         state.productSearch.results[0].regularPrice
      );

      // Toggle the like button
      productView.toggleLikeBtn(true);


      // Add like to UI list
      console.log(localStorage);
      console.log(state.likes);


   // User HAS liked the current product
   } else {
      // Remove like to the state
      state.likes.deleteLike(currentSku);

      // Toggle the like button
      productView.toggleLikeBtn(false);


      // Remove like to UI list
      console.log(localStorage);
      console.log(state.likes);
   }
}


// ===========================================================
// RESULTS PAGE CONTROLLER
// ===========================================================
const controlResults = async () => {
   // Get search query from url parameter
   const urlQuery = window.location.search;
   
   if (urlQuery) {
      try {
         // Prepare UI for results

         // Perform Search and prepare results
         await controlProductSearch(urlQuery);

         // Render results on UI
         resultsView.renderResults(state.productSearch.results);

      }  catch (error) {
         alert('Somthing went wrong when attempting to render product search results');
         console.log(error);
      }
   }

   // EVENT LISTENERS
   // ===========================================================
      // When page buttons on Results page are clicked
      elements.resultsPages.addEventListener('click', event => {
         const btn = event.target.closest('.btn');

         if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            resultsView.clearResults();
            resultsView.renderResults(state.productSearch.results, goToPage);
         };
      });
};
   

// ===========================================================
// PRODUCT PAGE CONTROLLER
// ===========================================================
const controlProduct = async () => {

   // Get search query from url parameter
   const urlQuery = window.location.search;

   if (urlQuery) {
      try {
         // Prepare UI for results

         // Perform Search and prepare results
         await controlProductSearch(urlQuery);

         // Render results on UI
         productView.renderProduct(state.productSearch.results[0]);
         productView.renderLikeBtn(state.likes.isLiked(state.productSearch.results[0].sku))

      }  catch (error) {
         alert('Somthing went wrong when attempting to render product.');
         console.log(error);
      }

      // EVENT LISTENERS
      // ===========================================================
         // When nav titles are clicked
         for (const navItem of elements.productNavItems) {
            navItem.addEventListener('click', productView.navItemsEvents);
         };

         // When thumb images are clicked
         const productThumbs = document.querySelectorAll('.product-gallery__thumb-wrap');
         for (const element of productThumbs) {
            element.addEventListener('click', productView.thumbImgsEvents);
         };

         // When product quantity buttons are clicked
         elements.productQuantBtns.addEventListener('click', productView.quantBtnEvents);

         // When Like button is clicked
         elements.productLikeBtn.addEventListener('click', controlLike);
   };
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

      // Organize the results to be used for rendering
      state.categorySearch.organizeResults();

      // Add modifier classes to each main menu item: main-menu__item--1
      submenuView.addModClass(elements.mainMenuItems,'main-menu__item');
   
      // Render the submenus with subcategories for each main menu category
      submenuView.renderSubMenus(state.categorySearch.allSubCatArrays);

   } catch (error) {
      alert('Somthing went wrong when attempting to render subcategories.');
      console.log(error);
   }

   // EVENT LISTENERS
   // ===========================================================
      // Open/close main menu
      elements.mainMenuBtn.addEventListener('click', function() {
         mainMenuView.toggleDropdown(elements.mainMenuDropdown);
      });

      // Close main menu when click anywhere outside of mainmenu
      document.addEventListener('click', function(event) {
         mainMenuView.hideOnClickOutside(event, elements.mainMenuDropdown);
      });

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
const controlHome = () => {

};


// ===========================================================
// INITIALIZE APPLICATION
// ===========================================================
const init = () => {
   // Restore liked products on page load
   window.addEventListener('load', () => {
      state.likes = new Likes();
      state.likes.readLocalStorage();
      console.log(localStorage);
      console.log(state);
   });

   controlHeader();

   if (window.location.pathname === '/product') {
      controlProduct();
   } else if (window.location.pathname === '/results') {
      controlResults();
   } else {
      controlHome();
   }


};

init();



