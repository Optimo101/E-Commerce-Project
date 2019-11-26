import { elements, hideElement } from './views/base';

import ProductSearch from './models/ProductSearch';
import CategorySearch from './models/CategorySearch';

import * as resultsView from './views/resultsView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';

// GLOBAL STATE OF APP
const state = {};


// ===========================================================
// SEARCH CONTROLLER
// ===========================================================

const controlProductSearch = async (query) => {

      // Create new search object and add to state
      state.productSearch = new ProductSearch(query);

      // Prepare UI for results
      
      try {
         // Search for products
         await state.productSearch.getResults();

         // Render results on UI
         resultsView.renderResults(state.productSearch.results);

      } catch (error) {
         alert('Somthing went wrong with the product search');
         console.log(error);
      }

   console.log(state.productSearch);
};

// ===========================================================
// RESULTS PAGE
// ===========================================================

// When user is on Results Page...
if (window.location.pathname === '/results') {
   
   // Get search query from url parameter
   const urlQuery = window.location.search;

   if (urlQuery) {
      // Perform Search and prepare results
      controlProductSearch(urlQuery);
   }

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
// SUBCATEGORIES CONTROLLER
// ===========================================================

const controlCategorySearch = async (callback) => {
   // New category search object and add to state
   state.categorySearch = new CategorySearch();

   try {
      // Search categories
      await state.categorySearch.getResults();

   } catch (error) {
      alert('Somthing went wrong with the categories search');
      console.log(error);
   }

   state.categorySearch.organizeResults();

   callback();
};

// ===========================================================
// MAIN MENU
// ===========================================================

controlCategorySearch(function() {
   
   // Add modifier classes to each main menu item: main-menu__item--1
   submenuView.addModClass(elements.mainMenuItems,'main-menu__item');
   
   // Then create the submenus for each main menu item
   submenuView.renderSubMenus(state.categorySearch.allSubCatArrays);
   
   // Then add  modifier classes to each submenu: submenu--1
   // submenuView.addModClass(elements.submenuItems, 'submenu');
   
   // Create event listeners for...
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
});




// ===========================================================
// HEADER
// ===========================================================

// Create event listeners for...
   // Header notice close button
   elements.headerNoticeBtn.addEventListener('click', function() {
      hideElement(elements.headerNotice);
   });


// ===========================================================
// HOME PAGE CONTROLLER
// ===========================================================





