export default class Cart {
   constructor() {
      this.cart = {};
      this.cart.charges.subTotal = 0;
      this.cart.charges.taxes = 0;
      this.cart.charges.shipping = 0;
      this.cart.charges.total = 0;
   }

   addItem(sku, image, name, price, quantity, itemTotal) {
      
   }

   removeItem(sku, quantity) {

   }

   inCart(sku) {

   }

   getNumItems() {

   }

   persistData() {

   }

   readLocalStorage() {

   }

   
}