import { getPicks, getDisplayed, getTotalPicks, getTotalDisplayed } from '../local-storage-api.js';

const sessionPicked = document.getElementById('session-results-picked');
const sessionDisplayed = document.getElementById('session-results-displayed');
const totalPicked = document.getElementById('total-results-picked');
const totalDisplayed = document.getElementById('total-results-displayed');
const startOverButton = document.getElementById('start-over-button');

const localPicks = getPicks();
const localDisplay = getDisplayed();
const totalPicks = getTotalPicks();
const totalDisplay = getTotalDisplayed();

totalPicks.push(localPicks);
totalDisplay.push(localDisplay);

sessionPicked.textContent = localPicks;
sessionDisplayed.textContent = localDisplay;

totalDisplayed.textContent = totalDisplay;
totalPicked.textContent = totalPicks;

let storeTotalPicks = JSON.stringify(totalPicks);
localStorage.setItem('TOTALPICKS', storeTotalPicks);

let storeTotalDisplay = JSON.stringify(totalDisplay);
localStorage.setItem('TOTALDISPLAYED', storeTotalDisplay);

startOverButton.addEventListener('click', () => {
    window.location.href = '../';
    localStorage.removeItem('PICKS');
    localStorage.removeItem('DISPLAYED');
});