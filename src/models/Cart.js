

export default class Cart {
   constructor (product) {
      this.productImage = product.image;
      this.productName = product.name;
      this.productSku = product.sku;
      this.productQuant = 0;
      this.productPrice = product.price;
      this.productTotal = this.productQuant * this.productPrice;
   };

   updateQuant(num) {
      this.productQuant = num;

   }
}