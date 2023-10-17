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
    turn('white');
}

//turn
const diceResult = document.querySelector('#diceResult');
let diceResults; let possible; let nowPossible;

function turn(color) {
    //roll dice
    diceResults = diceRoll();
    //move as many times as allowed
    possible = findPossibe();
    markPieces(color);
    //reset or confirm
}

//turn functions
function diceRoll() {
    let result1 = Math.floor(Math.random() * 6 + 1);
    let result2 = Math.floor(Math.random() * 6 + 1);
    diceResult.innerHTML = `dice 1: ${result1}</br> dice 2: ${result2}`;
    return [result1, result2];
}

function markPieces(color) {
    resetColor();
    for (let item of containers) {
        if (item.innerHTML.includes('whiteGamePiece') && color === 'white') {
            item.style.background = 'rgb(0, 247, 255, 50)';
            item.addEventListener('click', lightPossible);
        } else if (item.innerHTML.includes('blackGamePiece') && color === 'black') {
            item.style.background = 'rgb(0, 247, 255, 50)';
            item.addEventListener('click', lightPossible);
        }
    }
}

function lightPossible() {
    resetColor();
    this.style.background = 'rgb(43, 255, 0)';
    if (this.innerHTML.includes('whiteGamePiece')) {
        nowPossible = findPossibeWhite(this);
        for (let item of nowPossible) {
            if (item <= 23 && !(containers[item].innerHTML.includes('blackGamePiece') && containers[item].children.length >= 2)) {
                containers[item].style.background = 'rgb(0, 247, 255, 50)';
                containers[item].removeEventListener('click', lightPossible);
                containers[item].addEventListener('click', movePieceHere);
            }
        }
    } else if (this.innerHTML.includes('blackGamePiece')) {
        nowPossible = findPossibeBlack(this);
        for (let item of nowPossible) {
            if (item <= 23 && !(containers[item].innerHTML.includes('whiteGamePiece') && containers[item].children.length >= 2)) {
                containers[item].style.background = 'rgb(0, 247, 255, 50)';
                containers[item].removeEventListener('click', lightPossible);
                containers[item].addEventListener('click', movePieceHere);
            }
        }
    }
}

function findPossibe() {
    if (diceResults[0] === diceResults[1]) {
        return [
            diceResults[0],
            (2 * diceResults[0]),
            (3 * diceResults[0]),
            (4 * diceResults[0]),
        ];
    } else {
        return [
            diceResults[0],
            diceResults[1],
            diceResults[0] + diceResults[1],
        ]
    }
}

function findPossibeWhite(container) {
    let searchedKey = findKey(container);
    return possible.map(item => searchedKey + item);
}

function findPossibeBlack(container) {
    let searchedKey = findKey(container);
    return possible.map(item => searchedKey - item);
}

function addGamePiece(container, color, num = 1) {
    if (color === 'white') {
        for (let i = 0; i < num; i++) {
            container.innerHTML += '<div class="whiteGamePiece"></div>';
        }
    } else if (color === 'black') {
        for (let i = 0; i < num; i++) {
            container.innerHTML += '<div class="blackGamePiece"></div>';
        }
    }
    if (container.children.length > 5) {
        container.children[4].innerHTML = `+${container.children.length - 5}`;
    }
}

function removeGamePiece(container) {
    container.removeChild(container.lastChild);
    if (container.children.length > 5) {
        container.children[4].innerHTML = `+${container.children.length - 5}`;
    }
}

function movePieceHere() {
    let color;
    handlePossible(this);
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].style.background == 'rgb(43, 255, 0)') {
            if (containers[i].innerHTML.includes('whiteGamePiece')) {
                color = 'white';
            } else if (containers[i].innerHTML.includes('blackGamePiece')) {
                color = 'black';
            }
            removeGamePiece(containers[i]);
            break;
        }
    }
    addGamePiece(this, color);
    resetColor();
    resetEventListeners();
    this.style.background = 'rgb(255, 98, 171)';
    if (possible.length > 0) {
        markPieces(color);
    } else {
        turn(oppositeColor(color));
    }
}

function handlePossible(container) {
    if (container === containers[nowPossible[3]]) {
        possible.splice(-4);
    } else if (container === containers[nowPossible[2]]) {
        possible.splice(-3);
    } else if (container === containers[nowPossible[1]]) {
        possible.splice(-2);
    } else if (container === containers[nowPossible[0]] && diceResults[0] == diceResults[1]) {
        possible.splice(-1);
    } else if (container === containers[nowPossible[0]] && diceResults[0] != diceResults[1]) {
        possible = [possible[1]];
    } 
    if (typeof possible[0] == 'undefined') {
        possible = [];
    }
}

function resetColor() {
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.background = 'rgb(228, 184, 126)';
    }
}

function resetEventListeners() {
    for (let i = 0; i < containers.length; i++) {
        containers[i].removeEventListener('click', lightPossible);
        containers[i].removeEventListener('click', movePieceHere);
    }

}

function findKey(container) {
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].id === container.id) {
            return i;
        }
    }
}

function oppositeColor(color) {
    if (color === 'white') {
        return 'black';
    } else if (color === 'black') {
        return 'white';
    }
}
