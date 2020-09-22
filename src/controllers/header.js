import * as submenuView from '../views/submenuView';
import * as mainMenuView from '../views/mainMenuView';
import * as headerView from '../views/headerView';
import { state, controlCategorySearch } from '../index';
import { elements } from '../views/base';




// HEADER CONTROLLER
// ===========================================================
export default async function controlHeader(apiKey) {
   try {
      // Perform categories search
      await controlCategorySearch(apiKey);

   } catch (error) {
      alert('Something went wrong when attempting to render subcategories.');
      console.log(error);
   }

   // Organize the results
   state.categorySearch.organizeResults();

   // Add 'modifier' class to each main menu item: main-menu__item--1
   submenuView.addModClass(elements.mainMenuItems,'main-menu__item');

   // Render the submenus with subcategories for each main menu category
   submenuView.renderSubMenus(state.categorySearch.allSubCatArrays);

   // Update number of items in users cart icon (top right)
   elements.headerCartCounter.innerHTML = state.cart.getNumItems();

   // Event Listeners
   // ===========================================================
   elements.siteHeader.addEventListener('click', (event) => {
      // Event handler for open/close main menu
      if (event.target.matches('.main-menu__btn, .main-menu__btn *') || event.target.matches('.main-menu__header-icon')) {
         mainMenuView.toggleDropdown(elements.mainMenuDropdown);
      }

      // Event handler for user's account menu (after logged in)
      if (elements.accountMenuDropdown != null) {

         // Toggle account dropdown menu
         if (event.target.matches('.account-btn, .account-btn *')) {
            mainMenuView.toggleDropdown(elements.accountMenuDropdown);
         }

         // When 'Liked Items' link is clicked in the account menu
         if (event.target.matches('.account-menu__link--liked-items, .account-menu__link--liked-items *')) {
            event.preventDefault();

            if (state.likes.likes.length === 0) {
               headerView.showNoLikesMsg();
            } else {
               window.location = '/results/likes'
            }
         }

         // When 'Shopping Cart' link is clicked in the account menu
         if (event.target.matches('.account-menu__link--shopping-cart, .account-menu__link--shopping-cart *')) {
            event.preventDefault();
            
            if (Object.keys(state.cart.items).length === 0) {
               headerView.showNoItemsMsg();
            } else {
               window.location = '/cart';
            }
         }

         // When logout link is clicked
         if (event.target.matches('.account-menu__link--logout, .account-menu__link--logout *')) {
            event.preventDefault();
            logout();

            async function logout() {
               try {
                  await axios.post('/accounts/logout', {
                     cart: state.cart.items,
                     likes: state.likes.likes
                  })
                  .then(() => {
                     state.cart.clearLocalStorage();
                     state.likes.clearLocalStorage();
                     
                     window.location = window.location.href;

                  })
               } catch (error) {
                  console.log(error);
               }
            }
         }
      }

      // When Cart link is clicked
      if (event.target.matches('.cart-link, .cart-link *')) {
         event.preventDefault();

         if (Object.keys(state.cart.items).length === 0) {
            headerView.showNoItemsMsg();
         } else {
            window.location = '/cart';
         }
      }
   });

      // Event handler when user clicks anywhere outside of main menu or account menu
      document.addEventListener('click', (event) => {
         if (elements.mainMenuDropdown.classList.contains('is-visible')) {
            mainMenuView.hideOnClickOutside(event, elements.mainMenuDropdown);
         
         } else if (elements.accountMenuDropdown != null && 
         elements.accountMenuDropdown.classList.contains('is-visible')) {
            mainMenuView.hideOnClickOutside(event, elements.accountMenuDropdown);
         }
      });

      // Event handler for open/close submenus of main menu
      if (!(screen.width < 576)) {
         submenuView.setUpSubmenuEvent('mouseover', submenuView.showSubMenu);
         submenuView.setUpSubmenuEvent('mouseleave', submenuView.hideSubMenu);
      } else {
         submenuView.setUpSubmenuEvent('click', submenuView.toggleSubMenu);
      }
      
      // Event handler for clicking 'X' (close) icon at very top of header
      elements.headerNoticeBtn.addEventListener('click', () => {
         hideElement(elements.headerNotice);
      });
}