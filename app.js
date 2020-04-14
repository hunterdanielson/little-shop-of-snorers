import { productData } from './data/products.js';
import { ProductArray } from './productArray.js';

// grab from dom
const imageTags = document.querySelectorAll('img');
const radioTags = document.querySelectorAll('input');
const nextButton = document.getElementById('next-button');
const products = new ProductArray(productData);

console.log(products);
// for future strech goal
let numberOfChoices = 3;


const initializeNewButtons = () => {
    const randomProduct = products.getRandomProduct();
    let randomProduct2 = products.getRandomProduct();
    // get a new product for #2 thats different than #1
    while (randomProduct2.id === randomProduct.id ) {
        randomProduct2 = products.getRandomProduct();
    }
    
    let randomProduct3 = products.getRandomProduct();
    // get a new product for #3 thats diff from #2 and #1
    while (randomProduct3.id === randomProduct2.id || randomProduct3.id === randomProduct.id) {
        randomProduct3 = products.getRandomProduct();
    }
    
    imageTags.forEach((imageTag, i) => {
        if (i === 0) {
            imageTag.src = randomProduct.image;
        } else if (i === 1) {
            imageTag.src = randomProduct2.image;
        } else if (i === 2) {
            imageTag.src = randomProduct3.image;
        }
    });

    radioTags.forEach((radioTag, i) => {
        if (i === 0) {
            radioTag.value = randomProduct.id;
        } else if (i === 1) {
            radioTag.value = randomProduct2.id;
        } else if (i === 2) {
            radioTag.value = randomProduct3.id;
        }
    });
};



initializeNewButtons();
nextButton.addEventListener('click', initializeNewButtons);