import { elements } from './base';

// ============= ADD MODIFIER CLASS TO DOM ELEMENTS =============
export const addModClass = (nodeList, prefix) => {
   const elementList = nodeList;

   let num = 1;

   for (const item of elementList) {
      item.classList.add(`${prefix}--${num}`);
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
}

export const hideSubMenu = (element) => {
   element.style.height = '0';
   element.style.opacity = '0';
   
   window.setTimeout(function() {
      element.style.display = 'none';
   }, 250);

}


