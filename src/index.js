import { elements, hideElement } from './views/base';

import Search from './models/Search';

import * as searchView from './views/searchView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';


// ============= ADD MODIFIER CLASS TO EACH SUBMENU ELEMENT =============
const addMenuClasses = () => {
   submenuView.addModClass(elements.mainMenuItems,'main-menu__item');
   submenuView.addModClass(elements.submenuItems, 'submenu');
};


// ============= CREATE EVENT LISTENERS FOR... =============
const setUpEventListeners = () => {

   // HEADER NOTICE CLOSE BUTTON
   elements.headerNoticeBtn.addEventListener('click', function() {
      hideElement(elements.headerNotice);
   });

   // OPEN/CLOSE MAIN MENU
   elements.mainMenuBtn.addEventListener('click', function() {
      mainMenuView.toggleDropdown(elements.mainMenuDropdown);
   });

   // CLOSE MAIN MENU WHEN CLICK ANYWHERE OUTSIDE OF MAIN MENU
   document.addEventListener('click', function(event) {
      mainMenuView.hideOnClickOutside(event, elements.mainMenuDropdown);
   });

   // OPEN/CLOSE SUBMENU
   submenuView.setUpSubmenuEvent('mouseover', submenuView.showSubMenu);
   submenuView.setUpSubmenuEvent('mouseleave', submenuView.hideSubMenu);

   // RESULTS PAGE
   if (window.location.pathname === '/results') {
      controlSearch();
   } 
};


// ============= GLOBAL STATE OF APP =============
const state = {};

// ============= SEARCH CONTROLLER =============

const controlSearch = async () => {

   if (window.location.search) {
      // Get 'search' url parameter string
      const urlQueryString = window.location.search;
      console.log(urlQueryString); 

      // New search object and add to state
      state.search = new Search(urlQueryString);

      // Prepare UI for results

      // Perform search
      await state.search.getResults();

      // Render results on UI
      console.log(state.search.results);
   };
};

const init = () => {
   addMenuClasses();
   setUpEventListeners();
};

init();
