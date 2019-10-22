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

// Main menu item
elements.mainMenuItem.addEventListener('mouseover', function(event) {
   console.log(event.target);
});