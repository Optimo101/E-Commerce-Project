export default class Cart {
   constructor() {
      this.items = {};
      this.totals = {};
   }

   addItem(sku, image, name, price, quantity) {      
      
      if (!this.inCart(sku)) {
         const itemTotal = Number((price * quantity).toFixed(2));
         this.items[sku] = { sku, image, name, price, quantity, itemTotal};

      } else if (this.items[sku].quantity < 9) {
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

   calcTotals() {
      this.calcSubtotal();
      this.calcTaxes();
      this.calcShipping();
      this.calcGrandTotal();
   }

   calcSubtotal() {
      let subtotal = 0;

      for (const item in this.items) {
         const itemSubtotal = this.items[item].quantity * this.items[item].price;
         subtotal += itemSubtotal;
      }

      this.totals.subtotal = Number(subtotal.toFixed(2));
   }

   calcTaxes() {
      this.totals.taxes = Number((this.totals.subtotal * .0825).toFixed(2));
   }

   calcShipping() {
      this.totals.shipping = 0.00;
   }

   calcGrandTotal() {
      this.totals.grandTotal = (this.totals.subtotal + this.totals.taxes + this.totals.shipping).toFixed(2);
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