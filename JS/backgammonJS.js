const startMenu = document.querySelector('header');
const containers = document.querySelector('main').children;
const eatenContainer = document.querySelector('#eatenPieces').children;
const diceResult = document.querySelector('#diceResult');
let diceResults; let possible; let nowPossible; let nowPossibleOut;
let lightPossibleEvent = []; let outPossibilites = []; let outButtonEvent = [];
const startGameButton = document.querySelector('#startGameButton');
const outButton = document.querySelector('#outButton');
const winnerTag = document.querySelector('#winnerTag');
const winnerTxt = document.querySelector('#winnerTxt');
const restartButton = document.querySelector('#restartButton');

//start game menu load
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
outButton.addEventListener('click', takeOut);
startGameButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame)

function startGame() {
    startMenu.style.display = 'none';
    winnerTag.style.display = 'none';
    cleanBoard();
    addGamePiece(containers[0], 'white', 2);
    addGamePiece(containers[11], 'white', 5);
    addGamePiece(containers[16], 'white', 3);
    addGamePiece(containers[18], 'white', 5);
    addGamePiece(containers[23], 'black', 2);
    addGamePiece(containers[5], 'black', 5);
    addGamePiece(containers[7], 'black', 3);
    addGamePiece(containers[12], 'black', 5);
    //show features
    // addGamePiece(containers[23], 'white', 2);
    // addGamePiece(containers[22], 'white', 2);
    // addGamePiece(containers[17], 'white', 1);
    // addGamePiece(containers[0], 'black', 2);
    // addGamePiece(containers[1], 'black', 2);
    // addGamePiece(eatenContainer[1], 'black', 1);
    turn('white');
}

//turn
function turn(color) {
    //roll dice
    diceResults = diceRoll();
    //move as many times as allowed
    possible = findPossible();
    markPieces(color);
    //reset or confirm
}

//turn functions
function markPieces(color) {
    let checkPossible = false;
    resetColor();
    if (color == 'white') {
        for (let item of containers) {
            if (item.innerHTML.includes('whiteGamePiece') && realPossible(findPossibleWhite(item), 'white').length > 0 && eatenContainer[0].children.length == 0) {
                checkPossible = true;
                item.style.background = 'rgba(0, 247, 255, 0.35)';
                item.style.border = 'black 3px solid';
                item.addEventListener('click', lightPossible);
            }
        }
        if (eatenContainer[0].children.length > 0) {
            checkPossible = false;
            if (realPossible(findPossibleWhite(eatenContainer[0], true), 'white').length > 0) {
                checkPossible = true;
                eatenContainer[0].style.background = 'rgb(182, 196, 152)';
                eatenContainer[0].addEventListener('click', lightPossible);
            }
        }
    } else if (color == 'black') {
        for (let item of containers) {
            if (item.innerHTML.includes('blackGamePiece') && realPossible(findPossibleBlack(item), 'black').length > 0 && eatenContainer[1].children.length == 0) {
                checkPossible = true;
                item.style.background = 'rgba(0, 247, 255, 0.35)';
                item.style.border = 'black 3px solid';
                item.addEventListener('click', lightPossible);
            }
        }
        if (eatenContainer[1].children.length > 0) {
            if (realPossible(findPossibleBlack(eatenContainer[1], true), 'black').length > 0) {
                checkPossible = true;
                eatenContainer[1].style.background = 'rgb(182, 196, 152)';
                eatenContainer[1].addEventListener('click', lightPossible);
            }
        }
    }
    if (takingOutAllowed(color)) {
        possibleEndGameAdjusment(color);
        checkPossible = markPiecesOut(color, checkPossible);
    }
    if (checkPossible === false) {
        turn(oppositeColor(color));
    }
}

function lightPossible() {
    resetColor();
    resetMoveHere();
    lightPossibleEvent.forEach(item => item.addEventListener('click', lightPossible));
    outButtonEvent.forEach(item => item.addEventListener('click', outButtonActive));
    lightPossibleEvent = []; outButtonEvent = [];
    outButton.style.display = 'none';
    this.style.background = 'rgba(43, 255, 0, 0.35)';
    this.style.border = 'black 3px solid';
    if (this.innerHTML.includes('whiteGamePiece')) {
        nowPossible = findPossibleWhite(this);
        if (this.id.includes('whiteEatenPieces')) { nowPossible = findPossibleWhite(this, true); };
        for (let item of realPossible(nowPossible, 'white')) {
            item.style.background = 'rgba(0, 247, 255, 0.35)';
            item.style.border = 'black 3px solid';
            resetPossibleEvents(outPossibilites);
            item.removeEventListener('click', lightPossible);
            lightPossibleEvent.push(item);
            item.addEventListener('click', movePieceHere);
        }
    } else if (this.innerHTML.includes('blackGamePiece')) {
        nowPossible = findPossibleBlack(this);
        if (this.id.includes('blackEatenPieces')) { nowPossible = findPossibleBlack(this, true); };
        for (let item of realPossible(nowPossible, 'black')) {
            item.style.background = 'rgba(0, 247, 255, 0.35)';
            item.style.border = 'black 3px solid';
            resetPossibleEvents(outPossibilites);
            item.removeEventListener('click', lightPossible);
            item.removeEventListener('click', lightPossible);
            lightPossibleEvent.push(item);
            item.addEventListener('click', movePieceHere);
        }
    }
}

function movePieceHere() {
    let color;
    handlePossible(this);
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].style.background == 'rgba(43, 255, 0, 0.35)') {
            if (containers[i].innerHTML.includes('whiteGamePiece')) {
                color = 'white';
            } else if (containers[i].innerHTML.includes('blackGamePiece')) {
                color = 'black';
            }
            removeGamePiece(containers[i]);
            break;
        }
    }
    if (eatenContainer[0].style.background == 'rgba(43, 255, 0, 0.35)') {
        color = 'white';
        removeGamePiece(eatenContainer[0]);
    } else if (eatenContainer[1].style.background == 'rgba(43, 255, 0, 0.35)') {
        color = 'black';
        removeGamePiece(eatenContainer[1]);
    }
    if (this.children.length > 0 && this.innerHTML.includes(`${oppositeColor(color)}GamePiece`)) {
        removeGamePiece(this);
        if (color == 'white') {
            addGamePiece(eatenContainer[1], 'black');
        } else if (color == 'black') {
            addGamePiece(eatenContainer[0], 'white');
        }
    }
    addGamePiece(this, color);
    resetColor();
    resetEventListeners();
    if (checkWinner(color)) {
        declareWin(color);
    } else if (possible.length > 0) {
        markPieces(color);
    } else {
        turn(oppositeColor(color));
    }
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
    } else if (container.children.length == 5) {
        container.children[4].innerHTML = '';
    }
}

function checkWinner(color) {
    let checkWin = true;
    for (i = 0; i < containers.length; i++) {
        if (containers[i].innerHTML.includes(`${color}GamePiece`) > 0) {
            checkWin = false;
            break;
        }
    }
    if (eatenContainer[0].children.length > 0 && color == 'white') {
        checkWin = false;
    } else if (eatenContainer[1].children.length > 0 && color == 'black') {
        checkWin = false;
    }
    return checkWin;
}

function declareWin(color) {
    winnerTxt.innerHTML = `<h1>${color} Won The</br>Game!</h1>`;
    winnerTag.style.background = color;
    winnerTxt.style.color = oppositeColor(color);
    winnerTag.style.display = 'block';
}

//taking pieces out
function takingOutAllowed(color) {
    if (color == 'white') {
        for (let i = 17; i >= 0; i--) {
            if (containers[i].innerHTML.includes('whiteGamePiece')) {
                return false;
            }
        }
    } else if (color == 'black') {
        for (let i = 6; i <= 23; i++) {
            if (containers[i].innerHTML.includes('blackGamePiece')) {
                return false;
            }
        }
    } return true;
}

function markPiecesOut(color, possibleCheck) {
    outPossibilites = [];
    outButton.style.display = 'none';
    let check = possibleCheck;
    if (color == 'white') {
        for (let i = 23; i >= 18; i--) {
            if (containers[i].innerHTML.includes('whiteGamePiece') && eatenContainer[0].children.length == 0 && checkOutPossible(containers[i], color)) {
                check = true;
                containers[i].style.background = 'rgba(255, 53, 221, 0.35)';
                containers[i].style.border = 'black 3px solid';
                outPossibilites.push(containers[i]);
                containers[i].addEventListener('click', outButtonActive);
            }
        }
    } else if (color == 'black') {
        for (let i = 0; i <= 5; i++) {
            if (containers[i].innerHTML.includes('blackGamePiece') && eatenContainer[1].children.length == 0 && checkOutPossible(containers[i], color)) {
                check = true;
                containers[i].style.background = 'rgba(255, 53, 221, 0.35)';
                containers[i].style.border = 'black 3px solid';
                outPossibilites.push(containers[i]);
                containers[i].addEventListener('click', outButtonActive);
            }
        }
    } return check;
}

function outButtonActive() {
    lightPossibleEvent.forEach(item => item.addEventListener('click', lightPossible));
    outButtonEvent.forEach(item => item.addEventListener('click', outButtonActive));
    lightPossibleEvent = []; outButtonEvent = [];
    resetColor();
    lightPossible.call(this);
    resetPossibleEvents(outPossibilites);
    nowPossibleOut = [...possible];
    this.style.background = 'rgba(43, 255, 0, 0.35)';
    this.style.border = 'black 3px solid';
    outButton.style.display = 'block';
}

function checkOutPossible(container, color) {
    if (color == 'white') {
        for (let item of possible) {
            if (findKey(container) == 24 - item) {
                return true;
            }
        }
    } else if (color == 'black') {
        for (let item of possible) {
            if (findKey(container) == item - 1) {
                return true;
            }
        }
    }
}

function takeOut() {
    let color;
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].style.background == 'rgba(43, 255, 0, 0.35)') {
            if (containers[i].innerHTML.includes('whiteGamePiece')) {
                color = 'white';
            } else if (containers[i].innerHTML.includes('blackGamePiece')) {
                color = 'black';
            }
            handlePossibleOut(containers[i]);
            removeGamePiece(containers[i]);
            break;
        }
    }
    resetColor();
    resetEventListeners();
    if (checkWinner(color)) {
        declareWin(color);
    } if (possible.length > 0) {
        markPieces(color);
    } else {
        turn(oppositeColor(color));
    }
}

function handlePossibleOut(container) {
    let keyDefiniteValue;
    if (container.innerHTML.includes('whiteGamePiece')) {
        keyDefiniteValue = 24 - findKey(container);
    } else if (container.innerHTML.includes('blackGamePiece')) {
        keyDefiniteValue = findKey(container) + 1;
    }
    if (keyDefiniteValue == nowPossibleOut[0] && diceResults[0] == diceResults[1]) {
        possible.splice(-1);
    } else if (keyDefiniteValue == nowPossibleOut[0] && diceResults[0] != diceResults[1]) {
        possible = [possible[1]];
    } else if (keyDefiniteValue == nowPossibleOut[1]) {
        possible.splice(-2);
    } else if (keyDefiniteValue == nowPossibleOut[2]) {
        possible.splice(-3);
    } else if (keyDefiniteValue == nowPossibleOut[3]) {
        possible.splice(-4);
    }
    if (typeof possible == 'undefined') {
        possible = [];
    }
}

function possibleEndGameAdjusment(color) {
    let lastKey = findLastKey(color);
    if (color == 'white') {
        if (diceResults[0] == diceResults[1] && possible[0] > 24 - lastKey) {
            for (let i = 0; i < possible.length; i++) {
                possible[i] = 24 - lastKey;
            }
        }
        if (possible[0] > 24 - lastKey && diceResults[0] != diceResults[1]) {
            possible[0] = 24 - lastKey;
        }
        if (possible[1] > 24 - lastKey && diceResults[0] != diceResults[1]) {
            possible[1] = 24 - lastKey;
        }
    } else if (color == 'black') {
        if (diceResults[0] == diceResults[1] && possible[0] > lastKey + 1) {
            for (let i = 0; i < possible.length; i++) {
                possible[i] = lastKey + 1;
            }
        }
        if (possible[0] > lastKey + 1 && diceResults[0] != diceResults[1]) {
            possible[0] = lastKey + 1;
        }
        if (possible[1] > lastKey + 1 && diceResults[0] != diceResults[1]) {
            possible[1] = lastKey + 1;
        }
    }
}

//handle dice and possibilities
function diceRoll() {
    let result1 = Math.floor(Math.random() * 6 + 1);
    let result2 = Math.floor(Math.random() * 6 + 1);
    diceResult.innerHTML = `dice 1: ${result1}</br> dice 2: ${result2}`;
    return [result1, result2];
}

function findPossible() {
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

function findPossibleWhite(container, backToGame = false) {
    let searchedKey = findKey(container);
    if (backToGame) { searchedKey = -1 };
    return possible.map(item => searchedKey + item);
}

function findPossibleBlack(container, backToGame = false) {
    let searchedKey = findKey(container);
    if (backToGame) { searchedKey = 24 };
    return possible.map(item => searchedKey - item);
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

function realPossible(array, color) {
    let arr = [];
    for (let item of array) {
        if (0 <= item && item <= 23) {
            if (!(containers[item].innerHTML.includes(`${oppositeColor(color)}GamePiece`) && containers[item].children.length >= 2)) {
                arr.push(containers[item]);
            }
        }
    }
    if (diceResults[0] == diceResults[1]) {
        if (arr[0] != containers[array[0]]) {
            arr = [];
        }
    } else {
        if (arr[0] == containers[array[2]]) {
            arr = [];
        }
    }
    return arr;
}

//useful functions
function resetColor() {
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.background = 'transparent';
        containers[i].style.border = 'transparent 3px solid';
    }
    eatenContainer[0].style.background = 'rgb(175, 136, 85)';
    eatenContainer[1].style.background = 'rgb(175, 136, 85)';
    eatenContainer[0].style.border = 'rgb(133, 96, 48) 7px solid';
    eatenContainer[1].style.border = 'rgb(133, 96, 48) 7px solid';
}

function resetEventListeners() {
    for (let i = 0; i < containers.length; i++) {
        containers[i].removeEventListener('click', lightPossible);
        containers[i].removeEventListener('click', movePieceHere);
        containers[i].removeEventListener('click', outButtonActive);
    }
    eatenContainer[0].removeEventListener('click', lightPossible);
    eatenContainer[1].removeEventListener('click', lightPossible);
}

function resetMoveHere() {
    for (let i = 0; i < containers.length; i++) {
        containers[i].removeEventListener('click', movePieceHere);
    }
}

function resetPossibleEvents(array) {
    for (let item of array) {
        if (item.style.background == 'rgba(0, 247, 255, 0.35)') {
            item.removeEventListener('click', outButtonActive);
            item.removeEventListener('click', lightPossible);
            outButtonEvent.push(item);
        }
    }
}

function findKey(container) {
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].id === container.id) {
            return i;
        }
    }
}

function findLastKey(color) {
    if (color == 'white') {
        if (eatenContainer[0].children.length == 0) {
            for (let i = 18; i <= 23; i++) {
                if (containers[i].children.length > 0) {
                    return i;
                }
            }
        } return -1;
    } else if (color == 'black') {
        if (eatenContainer[1].children.length == 0) {
            for (let i = 5; i >= 0; i--) {
                if (containers[i].children.length > 0) {
                    return i;
                }
            }
        } return 24;
    }
}

function oppositeColor(color) {
    if (color === 'white') {
        return 'black';
    } else if (color === 'black') {
        return 'white';
    }
}

function cleanBoard() {
    for (let i = 0; i < containers.length; i++) {
        if (containers[i].children.length > 0) {
            containers[i].innerHTML = i + 1;
        }
    }
}