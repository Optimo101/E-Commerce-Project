// ============== SIMPLE HIDE ELEMENT FUNCTION ==============
export const hideElement = (element) => {
   element.style.display = 'none';
};

// ============== DROPDOWN MENU ==============
export const showDropdown = (element) => {

   // Gets the natural height of an element
   const getHeight = () => {
      element.style.display = 'block'; // Make it visible
      const height = element.scrollHeight + 'px'; // Get height
      element.style.display = '';
      return height;
   };

   var height = getHeight(); // Gets natural height
   element.classList.add('is-visible'); // Make element visible
   element.style.height = height; // Update the max-height

   console.log(element.style.height);

   // Once transition is complete, remove the inline max-height so content can scale responsively
	window.setTimeout(function () {
		element.style.height = '';
	}, 350);
};

export const hideDropdown = (element) => {
   // Give element a height to change from
   element.style.height = element.scrollHeight + 'px';

   // Set height to 0
   window.setTimeout(function() {
      element.style.height = '0';
   }, 1);

   // When transition is complete, hide it
   window.setTimeout(function() {
      element.classList.remove('is-visible');
   }, 350);
};

export const toggleDropdown = (element) => {
   // If menu is visible, hide it
   if (element.classList.contains('is-visible')) {
      hideDropdown(element);
      return;
   }

   //Otherwise, show it
   showDropdown(element);
}


