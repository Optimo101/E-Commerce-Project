import { state } from '../index';
import * as productView from '../views/productView';
import * as resultsView from '../views/resultsView';



// LIKES CONTROLLER
// ===========================================================
export default function controlLikes(event) {
   const buttonElement = event.target.closest('.btn'),
         iconElement = buttonElement.children[0],
         idArray = buttonElement.id.split('-'),
         currentIndex = idArray[0],
         currentSku = idArray[1];

   let   currentPage,
         likesPage,
         source,
         liked;

   // Determine page user is currently on
   currentPage = window.location.pathname;

   // Is the user on the Likes page?
   currentPage === '/results/likes' ? likesPage = true : likesPage = false;

   // See below regarding the user liking an item after unliking on the Like's page.
   // The code below eliminates the need to access the third party API again to re-like the item, which is optimal
   // If user is on Likes page, set array source to Likes model; otherwise, set source to productSearch model
   likesPage ? source = state.likes.likes[currentIndex] : source = state.productSearch.results[currentIndex];
   
   // Is item currently liked?
   liked = state.likes.isLiked(currentSku, likesPage);

   // If NOT liked...
   if (!liked) {
      // Add like to the likes array in app's state object
      state.likes.addLike(
         currentSku,
         source.name,
         source.image,
         source.regularPrice,
         source.customerReviewAverage,
         source.customerReviewCount,
         likesPage
      );

      // Toggle the 'like' button appearance
      toggleLikeIcon();

   // If currently liked...
   } else {
      // Remove like from the likes array from app's state object
      state.likes.deleteLike(currentSku, likesPage);

      // Toggle the 'Like' button appearance
      toggleLikeIcon();
   }

   function toggleLikeIcon() {
      if (currentPage === '/results' || currentPage === '/results/likes') {
         resultsView.toggleLikeBtn(liked, iconElement);
      } else if (currentPage === '/product') {
         productView.toggleLikeBtn(liked, iconElement);
      }
   }
}