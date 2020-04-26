import { elements } from './base';

const showDropdown = (element) => {
   let height;

   if (screen.width < 576 && element != elements.accountMenuDropdown) {
      height = screen.height + 'px'; // Gets the screen height for mobile menu
      document.querySelector('.main-menu__list').style.height = height;
   } else {
      height = getMenuHeight(element); // Gets natural height of dropdown menu
   }
   
   element.style.height = height; // Update the height
   element.classList.add('is-visible'); // Make dropdown menu visible
   elements.shadowOverlay.style.display = 'block'; // Show background shadow overlay

   // Once transition is complete, remove the inline max-height so content can scale responsively.
	window.setTimeout(() => {
      element.style.height = '';
      element.style.overflow = 'visible'; // Show overflow for submenus
   }, 350);
}

// Gets the natural height of dropdown menu element
const getMenuHeight = (element) => {
   element.style.display = 'block'; // Make it visible
   const scrollHeight = element.scrollHeight + 'px'; // Get height for DESKTOP

   element.style.display = '';
   return scrollHeight;
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

   // Otherwise, show it
   showDropdown(element);
}

// Shadow overlay background when user clicks outside of menu dropdown area
export const hideOnClickOutside = (event, element) => {
   if (event.target.closest('.main-menu__btn') === null && 
      event.target.closest('.main-menu__dropdown') === null &&
      event.target.closest('.account-btn') === null &&
      event.target.closest('.account-menu__dropdown') === null) {
         hideDropdown(element);
   } 
}