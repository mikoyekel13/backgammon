const instructions = document.querySelector('#instructions');
const randomColorDiv = document.querySelector('#randomColor');
const generateBtn = document.querySelector('#generate');
let a; let b; let c;

generateBtn.addEventListener("click", randomColor);

function randomColor() {
    instructions.style.display = 'none';
    a = (Math.floor(Math.random()*51)) * 5;
    b = (Math.floor(Math.random()*51)) * 5;
    c = (Math.floor(Math.random()*51)) * 5;
    randomColorDiv.style.background = 'rgb(' + a + ',' + b + ',' + c + ")";
}


const guessedColorDiv = document.querySelector('#guessedColor');
const redValue = document.querySelector('#red');
const greenValue = document.querySelector('#green');
const blueValue = document.querySelector('#blue');
let R; let G; let B;

redValue.addEventListener("input", changeColor);
greenValue.addEventListener("input", changeColor);
blueValue.addEventListener("input", changeColor);

function changeColor() {
    R = redValue.value || 0;
    G = greenValue.value || 0;
    B = blueValue.value || 0;
    guessedColorDiv.style.background = 'rgb(' + R + ',' + G + ',' + B + ")";
}


const checkBtn = document.querySelector('#check');

checkBtn.addEventListener("click", check);

function check() {
    let Rpre = 100 - (Math.abs(a - R) * 100) / 255;
    let Gpre = 100 - (Math.abs(b - G) * 100) / 255;
    let Bpre = 100 - (Math.abs(c - B) * 100) / 255;
    let pre = (Math.round(((Rpre + Gpre + Bpre) / 3) * 100)) / 100;
    alert(`you were ${pre}% close to the real color which was: ${randomColorDiv.style.background}`)
    instructions.style.display = 'block';
    randomColorDiv.style.background = 'rgb(' + 255 + ',' + 255 + ',' + 255 + ")";
    guessedColorDiv.style.background = 'rgb(' + 255 + ',' + 255 + ',' + 255 + ")";
    redValue.value = '';
    greenValue.value = '';
    blueValue.value = '';
}