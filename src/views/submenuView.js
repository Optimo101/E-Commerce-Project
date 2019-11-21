import { elements } from './base';

// ============= ADD MODIFIER CLASS TO DOM ELEMENTS =============
export const addModClass = (nodeList, prefix) => {
   const elementList = nodeList;

   let num = 1;

   for (const item of elementList) {
      item.classList.add(`${prefix}--${num}`);

      if (prefix === 'main-menu__item') {
         item.id = `mm-${num}`;
      }
      num++;
   };
};

// ADD EVENT LISTENERS FOR OPEN/CLOSING SUBMENUS
export const setUpSubmenuEvent = (eventType, method) => {
   for (let i = 1; i < elements.mainMenuItems.length; i++) {
      document.querySelector(`.main-menu__item--${i}`).addEventListener(eventType, function() {
         if (document.querySelector(`.submenu--${i}`)) {
            method(document.querySelector(`.submenu--${i}`));
         };
      });
   };
};

// ============== SUBMENU FUNCTIONS ==============
export const showSubMenu = (element) => {
   // Gets the natural height of an element
   const getHeight = () => {
      element.style.display = 'block'; // Make it visible
      const height = element.scrollHeight + 'px'; // Get height
      return height;
   };
   
   element.style.display = 'block';
   element.style.height = getHeight();
   element.style.opacity = 1;
};

export const hideSubMenu = (element) => {
   element.style.height = '0';
   element.style.opacity = '0';
   
   window.setTimeout(function() {
      element.style.display = 'none';
   }, 250);
};


// ============== RENDER SUBMENU CONTENT ==============
const createSubmenu = (subCatObj, MainCatNum, totalSubCats) => {

};




// ============== RENDER SUBMENUS ==============

export const renderSubMenus = (arrays) => {
   
   // For each subcategory list (array)...
   arrays.forEach(function(array, index) {

      // Create an object and...
      let subCategories = {};

      // ...create object properties based on each subcategory object in the array...
      array.forEach(function(element, index) {
         subCategories[`${index + 1}`] = element;
      });

      // ...then create submenu markup for main menu items using created object, index + 1 to match id of main menu item and total number of items for looping purposes
      // createSubmenu(subCategories, index + 1, array.length);
   });
};




