import { productData } from './data/products.js';
import { ProductArray } from './productArray.js';
import { getDisplayed, getPicks } from './local-storage-api.js';

// grab from dom
const imageTags = document.querySelectorAll('img');
const radioTags = document.querySelectorAll('input');
const nextButton = document.getElementById('next-button');
const products = new ProductArray(productData);

console.log(products);
// for future strech goal
let numberOfChoices = 3;
let totalChoices = 0;



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

function addLocalPicks(picks) {
    let localPicks = JSON.stringify(picks);
    localStorage.setItem('PICKS', localPicks);
}

function addLocalDisplay(displayed) {
    let localDisplayed = JSON.stringify(displayed);
    localStorage.setItem('DISPLAYED', localDisplayed);
}

function updateChoice() {
    // get the choice that was selected
    const selectedChoice = document.querySelector('input[type=radio]:checked');
    console.log(selectedChoice.value);
    // get array from our local storage
    const storedPicks = getPicks();
    // add the value to local storage
    storedPicks.push(selectedChoice.value);
    addLocalPicks(storedPicks);


    const possibleChoices = document.querySelectorAll('input');
    // get displayed from local storage
    const allDisplayed = getDisplayed();
    // push each displayed onto array
    possibleChoices.forEach(possible => {
        allDisplayed.push(possible.value);
    });
    // put the new displayed array into local storage
    addLocalDisplay(allDisplayed);
    // after this many inputs change to results page
    if (storedPicks.length >= 25) {
        window.location.href = './results';
    }

    initializeNewButtons();
}

initializeNewButtons();
nextButton.addEventListener('click', updateChoice);