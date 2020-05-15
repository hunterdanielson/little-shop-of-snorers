export class ProductArray {
    constructor(products) {
        this.products = products.slice();
    }

    getRandomProduct() {
        const randomProductIndex = Math.floor(Math.random() * this.products.length);
        
        return this.products[randomProductIndex];
    }
}

