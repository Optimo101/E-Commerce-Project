import { elements, hideElement } from './views/base';


import Search from './models/Search';

import * as searchView from './views/searchView';
import * as mainMenuView from './views/mainMenuView';
import * as submenuView from './views/submenuView';

// Global state of the app
const state = {};

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

elements.searchForm.addEventListener('submit', event => {
   event.preventDefault();
   controlSearch();
});


// ============= ADD IDs to DOM ELEMENTS =============
const addModClass = (nodeList, prefix) => {
   const elementList = nodeList;

   let num = 1;

   for (const item of elementList) {
      item.classList.add(`${prefix}--${num}`);
      num++;
   };
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
};



// OPEN/CLOSE SUBMENU
const setUpSubmenusEvent = (eventType, method) => {
   for (let i = 1; i < elements.mainMenuItems.length; i++) {
      document.querySelector(`.main-menu__item--${i}`).addEventListener(eventType, function() {
         if (document.querySelector(`.submenu--${i}`)) {
            method(document.querySelector(`.submenu--${i}`));
         };
      });
   };
};

const init = () => {
   addModClass(elements.mainMenuItems,'main-menu__item');
   addModClass(elements.submenuItems, 'submenu');
   setUpEventListeners();
   setUpSubmenusEvent('mouseover', submenuView.showSubMenu);
   setUpSubmenusEvent('mouseleave', submenuView.hideSubMenu);
};

init();
