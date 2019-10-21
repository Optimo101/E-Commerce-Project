import { headerNoticeBtn } from './views/dom-loader';

const hideHeaderNotice = () => {
    document.querySelector('.header-notice').style.display = 'none';
};



headerNoticeBtn.addEventListener('click', hideHeaderNotice);
