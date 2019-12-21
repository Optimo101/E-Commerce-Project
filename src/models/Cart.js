export default class Cart {
   constructor() {
      this.items = {};
      // this.cart.charges.subTotal = 0;
      // this.cart.charges.taxes = 0;
      // this.cart.charges.shipping = 0;
      // this.cart.charges.total = 0;
   }

   addItem(sku, image, name, price, quantity) {      
      
      if (!this.inCart(sku)) {
         const itemTotal = Number((price * quantity).toFixed(2));
         this.items[sku] = { sku, image, name, price, quantity, itemTotal};

      } else {
         this.items[sku].quantity += quantity;
         this.items[sku].itemTotal = Number((price * this.items[sku].quantity).toFixed(2));
      }
      
      this.persistData();
      this.getNumItems();
   }

   removeItem(sku) {
      delete this.items[sku];
      this.persistData();
   }

   updateItem(sku, newQuantity) {
      this.items[sku].quantity = newQuantity;
      this.updateItemTotal(sku);
      this.persistData();
   }

   updateItemTotal(sku) {
      this.items[sku].itemTotal = (this.items[sku].quantity * this.items[sku].price).toFixed(2);
   }


   inCart(sku) {
      return this.items.hasOwnProperty(sku) ? true : false;
   }

   getNumItems() {
      let numItems = 0;
      
      const objProperties = (Object.getOwnPropertyNames(this.items));

      for (const property of objProperties) {
         numItems += this.items[property].quantity;
      }

      return numItems;

   }

   persistData() {
      // track Cart in localStorage
      localStorage.setItem('cart', JSON.stringify(this.items));
   }

   readLocalStorage() {
      const storage = JSON.parse(localStorage.getItem('cart'));

      // Restore likes from localStorage
      if (storage) this.items = storage;
   }
}