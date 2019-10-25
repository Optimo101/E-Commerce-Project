

// ============== SUBMENU FUNCTIONS ==============
export const showSubMenu = (element) => {
   // Gets the natural height of an element
   const getHeight = () => {
      element.style.display = 'block'; // Make it visible
      const height = element.scrollHeight + 'px'; // Get height
      return height;
   };
   
   element.style.display = 'block';
   element.style.height = getHeight();
   element.style.opacity = 1;
}

export const hideSubMenu = (element) => {
   element.style.height = '0';
   element.style.opacity = '0';
   
   window.setTimeout(function() {
      element.style.display = 'none';
   }, 250);

}