import { elements } from './base';

// ============== MAINMENU FUNCTIONS ==============
export const showDropdown = (element) => {

   // Gets the natural height of an element
   const getHeight = () => {
      element.style.display = 'block'; // Make it visible
      const height = element.scrollHeight + 'px'; // Get height
      element.style.display = '';
      return height;
   };

   var height = getHeight(); // Gets natural height
   element.classList.add('is-visible'); // Make element visible
   element.style.height = height; // Update the max-height
   elements.shadowOverlay.style.display = 'block'; // show background overlay


   // Once transition is complete, remove the inline max-height so content can scale responsively.
	window.setTimeout(function () {
      element.style.height = '';
      element.style.overflow = 'visible'; // Show overflow for submenus
   }, 250);
};

export const hideDropdown = (element) => {
   // Give element a height to change from as 'auto' (from 'is-visible' class) does not work
   element.style.height = element.scrollHeight + 'px';

   // Set height back to 0 and overflow to hidden
   window.setTimeout(function() {
      element.style.height = '0';
      element.style.overflow = 'hidden';
   }, 1);

   // When transition is complete, hide it
   window.setTimeout(function() {
      element.classList.remove('is-visible');
      elements.shadowOverlay.style.display = 'none';
   }, 250);
};

export const toggleDropdown = (element) => {
   // If menu is visible, hide it
   if (element.classList.contains('is-visible')) {
      hideDropdown(element);
      return;
   }

   //Otherwise, show it
   showDropdown(element);
};

export const hideOnClickOutside = (event, element) => {
   if (event.target.closest('.main-menu__btn') === null && 
      event.target.closest('.main-menu__dropdown') === null &&
      event.target.closest('.account-btn') === null &&
      event.target.closest('.account-menu__dropdown') === null) {
         hideDropdown(element);
   } 
};

