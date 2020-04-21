import { elements } from './base';

// ============== MAINMENU FUNCTIONS ==============
const showDropdown = (element) => {
   // Gets the natural height of dropdown menu element
   const getMenuHeight = () => {
      element.style.display = 'block'; // Make it visible
      const scrollHeight = element.scrollHeight + 'px'; // Get height for DESKTOP

      element.style.display = '';
      return scrollHeight;
   }

   let height = getMenuHeight(); // Gets natural height
   console.log(element);
   console.log(elements.accountMenuBtn)

   if (screen.width < 576 && element != elements.accountMenuDropdown) {
      height = screen.height + 'px'; // Gets the screen height for mobile menu
      document.querySelector('.main-menu__list').style.height = height;
   }
   
   element.style.height = height; // Update the height
   element.classList.add('is-visible'); // Make menu visible
   elements.shadowOverlay.style.display = 'block'; // Show background overlay

   // Once transition is complete, remove the inline max-height so content can scale responsively.
	window.setTimeout(() => {
      element.style.height = '';
      element.style.overflow = 'visible'; // Show overflow for submenus
   }, 350);
}

export const hideDropdown = (element) => {
   // Give element a height to change from as 'auto' (from 'is-visible' class) does not work
   element.style.height = element.scrollHeight + 'px';

   // Set height back to 0 and overflow to hidden
   window.setTimeout(() => {
      element.style.height = '0';
      element.style.overflow = 'hidden';
   }, 1);

   // When transition is complete, hide it
   window.setTimeout(() => {
      element.classList.remove('is-visible');
      elements.shadowOverlay.style.display = 'none';
   }, 350);
}

export const toggleDropdown = (element) => {
   // If menu is visible, hide it
   if (element.classList.contains('is-visible')) {
      hideDropdown(element);
      return;
   }

   //Otherwise, show it
   showDropdown(element);
}

export const hideOnClickOutside = (event, element) => {
   if (event.target.closest('.main-menu__btn') === null && 
      event.target.closest('.main-menu__dropdown') === null &&
      event.target.closest('.account-btn') === null &&
      event.target.closest('.account-menu__dropdown') === null) {
         hideDropdown(element);
   } 
}