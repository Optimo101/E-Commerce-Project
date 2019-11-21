import { elements, hideElement } from './views/base';

import Search from './models/Search';
import SubCats from './models/SubCats';

import * as searchView from './views/searchView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';

// GLOBAL STATE OF APP
const state = {};


// ===========================================================
// SEARCH CONTROLLER
// ===========================================================

const controlSearch = async (query) => {

      // Create new search object and add to state
      state.search = new Search(query);

      // Prepare UI for results
      
      try {
         // Search for products
         await state.search.getResults();

         // Render results on UI
         searchView.renderResults(state.search.results);

      } catch (error) {
         alert('Somthing went wrong with the product search');
         console.log(error);
      }

   console.log(state.search);
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
      controlSearch(urlQuery);
   }

   // When page buttons on Results page are clicked
   elements.resultsPages.addEventListener('click', event => {
      const btn = event.target.closest('.btn');

      if (btn) {
         const goToPage = parseInt(btn.dataset.goto, 10);
         searchView.clearResults();
         searchView.renderResults(state.search.results, goToPage);
      };
   });
};

// ===========================================================
// CATEGORIES CONTROLLER
// ===========================================================

const controlSubCats = async (callback) => {
   // New category search object and add to state
   state.subCats = new SubCats();

   try {
      // Search categories
      await state.subCats.getResults();

   } catch (error) {
      alert('Somthing went wrong with the categories search');
      console.log(error);
   }

   state.subCats.organizeResults();
   console.log(state.subCats.allSubCatArrays);

   submenuView.renderSubMenus(state.subCats.allSubCatArrays);

   callback();
};

// ===========================================================
// MAIN MENU
// ===========================================================

controlSubCats(function() {
   
   // Add modifier classes to each main menu item and corresponding submenu: main-menu__item--1 / submenu--1
   submenuView.addModClass(elements.mainMenuItems,'main-menu__item');
   submenuView.addModClass(elements.submenuItems, 'submenu');
   
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





