export class ProductArray {
    constructor(products) {
        this.products = products.slice();
    }
    getProducts() {
        return this.products;
    }

    removeProductById(productId) {
        this.products.forEach(product => {
            // loop through product array
            if (productId === product.id) {
                // remove specified index
                this.products.splice(productId, 1);
            }
        });
    }

    getProductById(productId) {
        let productMatch;

        this.products.forEach(product => {
            if (productId === product.id) {
                productMatch = true;
            }
        });

        return productMatch;
    }

    hasAnyProduct() {
        return this.products.length();
    }

    getRandomProduct() {
        const randomProductIndex = Math.floor(Math.random() * this.products.length);
        
        return this.products[randomProductIndex];
    }
}

