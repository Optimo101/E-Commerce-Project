export default class Cart {
   constructor() {
      this.cart = {};
      // this.cart.charges.subTotal = 0;
      // this.cart.charges.taxes = 0;
      // this.cart.charges.shipping = 0;
      // this.cart.charges.total = 0;
   }

   addItem(sku, image, name, price, quantity) {      
      
      if (!this.inCart(sku)) {
         const itemTotal = Number((price * quantity).toFixed(2));
         this.cart[sku] = { sku, image, name, price, quantity, itemTotal};

      } else {
         this.cart[sku].quantity += quantity;
         this.cart[sku].itemTotal = Number((price * this.cart[sku].quantity).toFixed(2));
      }
      
      this.persistData();
      this.getNumItems();
      console.log(this.cart);
   }

   removeItem(sku, quantity) {

   }


   inCart(sku) {
      return this.cart.hasOwnProperty(sku) ? true : false;
   }

   getNumItems() {
      let numItems = 0;
      
      const objProperties = (Object.getOwnPropertyNames(this.cart));

      for (const property of objProperties) {
         numItems += this.cart[property].quantity;
      }

      return numItems;

   }

   persistData() {
      // track Cart in localStorage
      localStorage.setItem('cart', JSON.stringify(this.cart));
   }

   readLocalStorage() {
      const storage = JSON.parse(localStorage.getItem('cart'));

      // Restore likes from localStorage
      if (storage) this.cart = storage;
   }
}