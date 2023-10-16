//start game menu load
const startMenu = document.querySelector('header');
const containers = document.querySelector('main').children;

function startGameMenuLoad() {
    startMenu.style.display = 'block';
    let count = 2;
    for (let i = 23; i > 11; i--) {
        containers[i].style.order = `${count}`
        count++;
    }
}

window.onload = startGameMenuLoad();

//start game
const startGameButton = document.querySelector('#startGameButton');

startGameButton.addEventListener('click', startGame);

function startGame() {
    startMenu.style.display = 'none';
    addGamePiece(containers[0], 'white', 2);
    addGamePiece(containers[11], 'white', 5);
    addGamePiece(containers[16], 'white', 3);
    addGamePiece(containers[18], 'white', 5);
    addGamePiece(containers[23], 'black', 2);
    addGamePiece(containers[5], 'black', 5);
    addGamePiece(containers[7], 'black', 3);
    addGamePiece(containers[12], 'black', 5);
    turn('black');
}

//turn
const diceResult = document.querySelector('#diceResult');
let diceResults;

function turn(color) {
    //roll dice
    diceResults = diceRoll();
    //find your pieces
    markPieces(color, containers);
    //find possible places
    //choose place
    //reset or confirm
}

//turn functions
function diceRoll() {
    let result1 = Math.floor(Math.random() * 6 + 1);
    let result2 = Math.floor(Math.random() * 6 + 1);
    diceResult.innerHTML = `dice 1: ${result1}</br> dice 2: ${result2}`;
    return [result1, result2];
}

function markPieces(color, containers) {
    for (let item of containers) {
        if (item.innerHTML.includes('whiteGamePiece') && color === 'white') {
            item.style.background = 'rgb(0, 247, 255, 50)';
            item.addEventListener('click', findPossible);
        } else if (item.innerHTML.includes('blackGamePiece') && color === 'black') {
            item.style.background = 'rgb(0, 247, 255, 50)';
            item.addEventListener('click', findPossible);
        } else {
            item.removeEventListener('click', findPossible);
        }
    }
}

function findPossible() {
    let searchedKey;
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.background = 'rgb(228, 184, 126)';
        if (containers[i].id === this.id) {
            searchedKey = i;
        }
    }
    this.style.background = 'rgb(43, 255, 0)';
    if (this.innerHTML.includes('whiteGamePiece')) {
        let possibility1 = searchedKey + diceResults[0];
        let possibility2 = searchedKey + diceResults[1];
        let possibility3 = searchedKey + diceResults[0] + diceResults[1];
        if (possibility1 <= 23 && !(containers[possibility1].innerHTML.includes('blackGamePiece') && containers[possibility1].children.length >= 2)){
            containers[possibility1].style.background = 'rgb(0, 247, 255, 50)';
        } if (possibility2 <= 23 && !(containers[possibility2].innerHTML.includes('blackGamePiece') && containers[possibility2].children.length >= 2)) {
            containers[possibility2].style.background = 'rgb(0, 247, 255, 50)';
        } if (possibility3 <= 23 && !(containers[possibility3].innerHTML.includes('blackGamePiece') && containers[possibility3].children.length >= 2)) {
            containers[possibility3].style.background = 'rgb(0, 247, 255, 50)';
        }
    } else if (this.innerHTML.includes('blackGamePiece')) {
        let possibility1 = searchedKey - diceResults[0];
        let possibility2 = searchedKey - diceResults[1];
        let possibility3 = searchedKey - diceResults[0] - diceResults[1];
        if (possibility1 <= 23 && !(containers[possibility1].innerHTML.includes('whiteGamePiece') && containers[possibility1].children.length >= 2)){
            containers[possibility1].style.background = 'rgb(0, 247, 255, 50)';
        } if (possibility2 <= 23 && !(containers[possibility2].innerHTML.includes('whiteGamePiece') && containers[possibility2].children.length >= 2)) {
            containers[possibility2].style.background = 'rgb(0, 247, 255, 50)';
        } if (possibility3 <= 23 && !(containers[possibility3].innerHTML.includes('whiteGamePiece') && containers[possibility3].children.length >= 2)) {
            containers[possibility3].style.background = 'rgb(0, 247, 255, 50)';
        }
    }
}

function addGamePiece(container, color, num = 1) {
    if (color === 'white') {
        for (let i = 0; i < num; i++) {
            if (container.children.length < 4) {
                container.innerHTML += '<div class="whiteGamePiece"></div>';
            } else {
                break;
            }
        } if (num - 4 == 1) {
            container.innerHTML += '<div class="whiteGamePiece"></div>';
        } else if (num - 4 > 1) {
            container.innerHTML += `<div class="whiteGamePiece">${num - 4}</div>`;
        }
    } else if (color === 'black') {
        for (let i = 0; i < num; i++) {
            if (container.children.length < 4) {
                container.innerHTML += '<div class="blackGamePiece"></div>';
            } else {
                break;
            }
        } if (num - 4 == 1) {
            container.innerHTML += '<div class="blackGamePiece"></div>';
        } else if (num - 4 > 1) {
            container.innerHTML += `<div class="blackGamePiece">${num - 4}</div>`;
        }
    }
}
