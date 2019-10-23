import { elements } from './views/base';
import * as homePage from './views/home-page';




// Small 'X' icon in Header Notice section
elements.headerNoticeBtn.addEventListener('click', function() {
   homePage.hideElement(elements.headerNotice);
});

// Main menu button
elements.mainMenuBtn.addEventListener('click', function() {
   homePage.toggleDropdown(elements.mainMenuDropdown);
});

// Close main menu when user clicks outside of main menu
document.addEventListener('click', function(event) {
   homePage.hideOnClickOutside(event, elements.mainMenuDropdown);
});

// Main menu item
// elements.mainMenuItem.addEventListener('mouseover', function(event) {
//    console.log(event.target);
// });