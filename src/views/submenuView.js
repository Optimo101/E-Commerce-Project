import { elements } from './base';

// Add 'modifier' class to DOM elements
export const addModClass = (nodeList, prefix) => {
   const elementList = nodeList;

   let num = 1;

   for (const item of elementList) {
      item.classList.add(`${prefix}--${num}`);

      if (prefix === 'main-menu__item') {
         item.id = `mm-${num}`;
      }
      num++;
   }
}

// Add event handlers for open/close submenus
export const setUpSubmenuEvent = (eventType, method) => {
   if (eventType === 'click') {
      for (const element of elements.headerMainMenuLinks) {
         element.addEventListener('click', (event) => {
            event.preventDefault();
         });
      }
   }
   
   for (let i = 1; i <= elements.mainMenuItems.length; i++) {
      let mainMenuItem = document.querySelector(`.main-menu__item--${i}`);

      mainMenuItem.addEventListener(eventType, () => {
         if (document.querySelector(`.submenu--${i}`)) {
            method(document.querySelector(`.submenu--${i}`));
         }
      });
   }
}

// Submenu functions
// =============================================================
export const showSubMenu = (element) => {
   // Gets the natural height of an element
   const getHeight = () => {
      element.style.display = 'block'; // Make it visible
      const height = element.scrollHeight + 'px'; // Get height
      return height;
   }
   
   element.style.display = 'block';
   element.style.height = getHeight();
   element.style.opacity = 1;
}

export const hideSubMenu = (element) => {
   element.style.height = '0';
   element.style.opacity = '0';
   
   window.setTimeout(() => {
      element.style.display = 'none';
   }, 250);
}

const clearSubMenus = (submenuList) => {
   for (let submenu of submenuList) {
      
      hideSubMenu(submenu);
      submenu.classList.remove('active');
   }
}

const clearMainMenuStyles = (mainMenuList) => {
   for (let mainMenuItem of mainMenuList) {
      mainMenuItem.getElementsByClassName('main-menu__item-icon')[0].style.color = 'rgb(122,122,122)';
      mainMenuItem.getElementsByClassName('main-menu__title')[0].style.color = 'rgb(122,122,122)';
      mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.color = 'rgb(122,122,122)';
      mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.transform = 'rotate(-90deg)';
      
      if (screen.width > 575) {
         mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.transform = 'rotate(0deg)';
      }
   }
}

export const toggleSubMenu = async (element) => {
   const mainMenuItem = element.parentNode;

   // If submenu is not currently active, then show it
   if (!element.classList.contains('active')) {
      const submenuList = document.querySelectorAll('.submenu');
      const mainMenuList = document.querySelectorAll('.main-menu__item');

      await clearSubMenus(submenuList);
      clearMainMenuStyles(mainMenuList);

      mainMenuItem.getElementsByClassName('main-menu__item-icon')[0].style.color = '#EB2F38';
      mainMenuItem.getElementsByClassName('main-menu__title')[0].style.color = '#000';
      mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.color = '#000';
      mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.transform = 'rotate(0deg)';

      if (screen.width > 575) {
         mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.transform = 'rotate(-90deg)';
      }

      setTimeout(() => {
         element.classList.add('active');
         showSubMenu(element);
      }, 250);
      
   // If submenu is active, then hide it
   } else {
      mainMenuItem.getElementsByClassName('main-menu__item-icon')[0].style.color = 'rgb(122,122,122)';
      mainMenuItem.getElementsByClassName('main-menu__title')[0].style.color = 'rgb(122,122,122)';
      mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.color = 'rgb(122,122,122)';
      mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.transform = 'rotate(-90deg)';

      if (screen.width > 575) {
         mainMenuItem.getElementsByClassName('main-menu__item-arrow')[0].style.transform = 'rotate(0deg)';
      }

      element.classList.remove('active');
      hideSubMenu(element);
   }
}

// Create a submenu
const createSubmenu = (mainCatNum) => {
   const markup = `
      <div class="submenu submenu--${mainCatNum}">
      </div>
   `;
   const mainMenuElement = document.getElementById(`mm-${mainCatNum}`);

   mainMenuElement.insertAdjacentHTML('beforeend', markup);
}

// Create submenu's content
const createSubmenuContent = (subCatsObj, mainCatNum, totalSubCats) => {
   let markup = `
      <ul class="submenu__list">
   `;
   for (let i = 1; i <= totalSubCats; i++) {
      markup += `
         <li class="submenu__item submenu__item--${i}">
            <a class="submenu__link" href="/results?categoryPath.id=${subCatsObj[i].id}">
               <span class="submenu__title">
               ${subCatsObj[i].name}
               
               </span>
            </a>
         </li>
      `
   }

   markup += `</ul>`;

   const subMenuElement = document.querySelector(`.submenu--${mainCatNum}`);
   subMenuElement.insertAdjacentHTML('beforeend', markup);
}

// Render all submenus
export const renderSubMenus = (arrays) => {
   
   // For each subcategory list (array)...
   arrays.forEach(function(array, index) {

      // Create an object
      let subCategoriesObj = {};

      // Create object properties for each subcategory object in the array...
      array.forEach(function(element, index) {
         subCategoriesObj[`${index + 1}`] = element;
      });

      // Then create submenu markup for main menu items using index + 1 to match id of main menu item...
      createSubmenu(index + 1);

      // Then fill in each submenu with the subcategory items
      createSubmenuContent(subCategoriesObj, index + 1, array.length);
   });
}