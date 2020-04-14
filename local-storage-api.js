export function getPicks() {
    // grab the PICKS from local storage if it exists
    let localPicks = localStorage.getItem('PICKS');

    // initialize empty variable
    let picks;

    // if the PICKS does exist in storage, 
    // set the variable picks equal to it in object form (not string form)
    if (localPicks) {
        picks = JSON.parse(localPicks);
    } else {
        // if it does not exist in local storage, set picks = to an empty picks array
        picks = [];
    }
    return picks;
}

export function getDisplayed() {
    let localDisplayed = localStorage.getItem('DISPLAYED');

    let displayed;

    if (localDisplayed) {
        displayed = JSON.parse(localDisplayed);
    } else {
        displayed = [];
    }
    return displayed;
}

export function getTotalPicks() {
    let localPicks = localStorage.getItem('TOTALPICKS');

    let picks;

    if (localPicks) {
        picks = JSON.parse(localPicks);
    } else {
        picks = [];
    }
    return picks;
}

export function getTotalDisplayed() {
    let localDisplayed = localStorage.getItem('TOTALDISPLAYED');

    // initialize empty variable
    let displayed;

    if (localDisplayed) {
        displayed = JSON.parse(localDisplayed);
    } else {
        displayed = [];
    }
    return displayed;
}