import axios from 'axios';

import { state } from '../index';
import { elements } from '../views/base';

// LOGIN PAGE CONTROLLER
// ===========================================================
export default function controlLoginPage() {
   // Event Listeners
   // ===========================================================

   // Event handler for login button
   elements.accountLoginBtn.addEventListener('click', event => {
      // Prevent default href link event...
      event.preventDefault();
      
      console.log('from login-page.js', state);

      // Instead run login function
      login();

      async function login() {
         const username = elements.accountLoginUsername.value;
         const password = elements.accountLoginPassword.value;

         try {
            // post the username and password entered by the user
            await axios.post('/accounts/login', {
               username: username,
               password: password
            })
            // Once a response is received from server
            .then(response => {
               // console.log('response:', response)
               
               // If error (such as incorrect username or password)
               if (response.data.error) {
                  return document.querySelector('.msg-header').innerHTML = response.data.error;
               }

               // If user's cart object from db has items, combine them with current cart items (prior to user login)
               if (response.data.cart != null) {
                  if (!(Object.keys(response.data.cart).length === 0)) {
                     state.cart.combineCarts(response.data.cart);
                  }
               }
               // If user's likes object from db has items, combine them with current liked items (prior to user login)
               if (response.data.likes != null) {
                  if (!(response.data.likes.length === 0)) {
                     state.likes.combineLikes(response.data.likes);
                  }
               }  
               
               // Route user to Home page
               return window.location = '/';
            });
      
         } catch (error) {
            if (error) {
               console.log(error);
            }
         }
      }
   });
}