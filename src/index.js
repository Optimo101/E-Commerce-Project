import { elements, hideElement } from './views/base';

import Search from './models/Search';

import * as searchView from './views/searchView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';

// Global state of the app
const state = {};

// ============= SEARCH CONTROLLER =============
const controlSearch = async () => {
   // Get query from view
   const query = searchView.getInput();

   if (query) {
      // New search object and add to state
      state.search = new Search(query);

      // Prepare UI for results

      // Search for recipes
      await state.search.getResults();

      // Render results on UI
      console.log(state.search.results);
   }
}

// ============= ADD MODIFIER CLASS TO EACH SUBMENU ELEMENT =============
const addClasses = () => {
   submenuView.addModClass(elements.mainMenuItems,'main-menu__item');
   submenuView.addModClass(elements.submenuItems, 'submenu');
};


// ============= CREATE EVENT LISTENERS FOR... =============
const setUpEventListeners = () => {
   // HEADER NOTICE CLOSE BUTTON
   elements.headerNoticeBtn.addEventListener('click', function() {
      hideElement(elements.headerNotice);
   });

   // SEACH FORM SUBMISSION
   // elements.searchForm.addEventListener('submit', event => {
   //    event.preventDefault();
   //    controlSearch();
   // });

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
};

const init = () => {
   addClasses();
   setUpEventListeners();
};

init();
