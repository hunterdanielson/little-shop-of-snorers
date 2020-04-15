import { getPicks, getDisplayed, getTotalPicks, getTotalDisplayed } from '../local-storage-api.js';

const startOverButton = document.getElementById('start-over-button');
const resetLocalStorage = document.getElementById('reset-local-storage');

const localPicks = getPicks();
const localDisplay = getDisplayed();
const totalPicks = getTotalPicks();
const totalDisplay = getTotalDisplayed();

// push the data from this session onto totals array
localPicks.forEach(pick => {
    totalPicks.push(pick);
});

localDisplay.forEach(display => {
    totalDisplay.push(display);
});

// set the totals into local storage
let storeTotalPicks = JSON.stringify(totalPicks);
localStorage.setItem('TOTALPICKS', storeTotalPicks);

let storeTotalDisplay = JSON.stringify(totalDisplay);
localStorage.setItem('TOTALDISPLAYED', storeTotalDisplay);

function findById(items, id) {
    // loop the array
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // check the id against item.id
        if (item.id === id) {
            return item;
        }
    }

    // loop done, nothing found
    return null;
}

// putting the data into a more easily useable format
const sessionVotes = [];
const totalVotes = [];

function addInitialVoteItem(votes, id) {
    const voteItem = {
        id,
        timesSeen: 0,
        timesPicked: 0
    };
    votes.push(voteItem);
}

function incrementTimesSeen(votes, id) {
    let temp = findById(votes, id);
    if (!temp) {
        addInitialVoteItem(votes, id);
        temp = findById(votes, id);
    }
    temp.timesSeen++;
}

function incrementTimesPicked(votes, id) {
    let temp = findById(votes, id);
    if (!temp) {
        addInitialVoteItem(votes, id);
        temp = findById(votes, id);
    }
    temp.timesPicked++;
}

// loop through local picks in local storage and push each time item is picked
localPicks.forEach(pick => {
    incrementTimesPicked(sessionVotes, pick);
});

// loop through local picks in local storage and push each time item is displayed
localDisplay.forEach(display => {
    incrementTimesSeen(sessionVotes, display);
});

// same thing as session but for total
totalPicks.forEach(pick => {
    incrementTimesPicked(totalVotes, pick);
});

totalDisplay.forEach(display => {
    incrementTimesSeen(totalVotes, display);
});

// session info for graphs
const graphIds = sessionVotes.map(el => el.id);
const graphSessionPicked = sessionVotes.map(el => el.timesPicked);
const graphSessionSeen = sessionVotes.map(el => el.timesSeen);

var ctx = document.getElementById('session-results-picked').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: graphIds,
        datasets: [{
            label: '# of Votes',
            data: graphSessionPicked,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var sesDisplay = document.getElementById('session-results-displayed').getContext('2d');
new Chart(sesDisplay, {
    type: 'bar',
    data: {
        labels: graphIds,
        datasets: [{
            label: '# of Times Seen',
            data: graphSessionSeen,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// all time info for graphs
const totalGraphIds = totalVotes.map(el => el.id);
const totalGraphSessionPicked = totalVotes.map(el => el.timesPicked);
const totalGraphSessionSeen = totalVotes.map(el => el.timesSeen);

var totPick = document.getElementById('total-results-picked').getContext('2d');
new Chart(totPick, {
    type: 'bar',
    data: {
        labels: totalGraphIds,
        datasets: [{
            label: '# of Votes',
            data: totalGraphSessionPicked,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var totDisplay = document.getElementById('total-results-displayed').getContext('2d');
new Chart(totDisplay, {
    type: 'bar',
    data: {
        labels: totalGraphIds,
        datasets: [{
            label: '# of Times Seen',
            data: totalGraphSessionSeen,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

startOverButton.addEventListener('click', () => {
    window.location.href = '../';
    localStorage.removeItem('PICKS');
    localStorage.removeItem('DISPLAYED');
});

resetLocalStorage.addEventListener('click', () => {
    window.location.href = './';
    localStorage.clear();
});