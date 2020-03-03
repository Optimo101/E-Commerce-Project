import { elements } from './base';

export const showNoItemsMsg = () => {
   elements.headerNoticeText.innerHTML = 'You have not added any items to your cart. Go shopping!';
   elements.headerNotice.style.height = '4rem';
}

export const showNoLikesMsg = () => {
   elements.headerNoticeText.innerHTML = 'You have not added any "liked" items.';
   elements.headerNotice.style.height = '4rem';
}