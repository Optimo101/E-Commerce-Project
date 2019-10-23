import { elements } from './views/base';
import * as homePage from './views/home-page';




// Small 'X' button in Header Notice section
elements.headerNoticeBtn.addEventListener('click', function() {
   homePage.hideElement(elements.headerNotice);
});

// Open/Close main menu
elements.mainMenuBtn.addEventListener('click', function() {
   homePage.toggleDropdown(elements.mainMenuDropdown);
});

// Close main menu when user clicks outside of main menu
document.addEventListener('click', function(event) {
   homePage.hideOnClickOutside(event, elements.mainMenuDropdown);
});

// Open/Close submenu
elements.mainMenuItem.addEventListener('mouseover', function(event) {
   console.log(event.target);
});