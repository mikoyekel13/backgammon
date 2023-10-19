window.onload = window.history.replaceState(null, '');

function load() {
    usernameAlert.style.display = 'none';
    passwordAlert.style.display = 'none';
    checkPasswordAlert.style.display = 'none';
    signUpSubmitFail.style.display = 'none'; 
    usernameSubmitFail.style.display = 'none';
    passwordSubmitFail.style.display = 'none'; 
    signUpForm.style.display = 'none';
    loginForm.style.display = 'none';
    header.style.display = 'block';
}

//display login or sign up forms
const header = document.querySelector('header');
const loginButton = document.querySelector('#loginButton');
const signUpButton = document.querySelector('#signUpButton');
const loginForm = document.querySelector('#loginForm');
const signUpForm = document.querySelector('#signUpForm');

loginButton.addEventListener('click', openForm);
signUpButton.addEventListener('click', openForm);

function openForm() {
    header.style.display = 'none';
    switch(this.id) {
        case("loginButton"):
            loginForm.style.display = 'flex';
            break;
        case("signUpButton"):
        signUpForm.style.display = 'flex';
    }
}

//sign up form check and save info
const usernameSignUp = document.querySelector('#usernameSignUp');
const passwordSignUp = document.querySelector('#passwordSignUp');
const checkPasswordSignUp = document.querySelector('#checkPasswordSignUp');
const usernameAlert = document.querySelector('#usernameAlert');
const passwordAlert = document.querySelector('#passwordAlert');
const checkPasswordAlert = document.querySelector('#checkPasswordAlert');
const signUpSubmitButton = document.querySelector('#signUpSubmitButton');
const signUpBackButton = document.querySelector('#signUpBackButton');
const signUpSubmitFail = document.querySelector('#signUpSubmitFail');

usernameSignUp.addEventListener('input', checkUsername);
passwordSignUp.addEventListener('input', checkPassword);
checkPasswordSignUp.addEventListener('input', checkPasswordAgain);
signUpSubmitButton.addEventListener('click', signUpSubmit);
signUpBackButton.addEventListener('click', load);

signUpSubmit.disabled = true;
const usernameRegex = /^\w{3,8}$/;
const passwordRegex = /^(?=\w{8,})(?=\w*[A-Z])(?=\w*[a-z])(?=\w*\d)(?!\w*\W)/;

function checkUsername() {
    if (usernameRegex.test(usernameSignUp.value) || usernameSignUp.value == '') {
        usernameAlert.style.display = 'none';
    } else {
        usernameAlert.style.display = 'block';
    }
}

function checkPassword() {
    if (passwordRegex.test(passwordSignUp.value) || passwordSignUp.value == '') {
        passwordAlert.style.display = 'none';
    } else {
        passwordAlert.style.display = 'block';
    }
    if (checkPasswordSignUp.value === passwordSignUp.value || checkPasswordSignUp.value == '') {
        checkPasswordAlert.style.display = 'none';
    } else {
        checkPasswordAlert.style.display = 'block';
    }
}

function checkPasswordAgain() {
    if (checkPasswordSignUp.value === passwordSignUp.value || checkPasswordSignUp.value == '') {
        checkPasswordAlert.style.display = 'none';
    } else {
        checkPasswordAlert.style.display = 'block';
    }
}

function signUpSubmit() {
    if (usernameAlert.style.display === 'none' && passwordAlert.style.display == 'none' && checkPasswordAlert.style.display === 'none') {
        localStorage.setItem('username', usernameSignUp.value);
        localStorage.setItem('password', passwordSignUp.value);
        signUpSubmitFail.style.display = 'none';  
        signUpForm.style.display = 'none';
        header.style.display = 'block';
    } else {
        signUpSubmitFail.style.display = 'block';   
    }
}

//login form check 
const usernameLogin = document.querySelector('#usernameLogin');
const passwordLogin = document.querySelector('#passwordLogin');
const usernameSubmitFail = document.querySelector('#usernameSubmitFail');
const passwordSubmitFail = document.querySelector('#passwordSubmitFail');
const loginSubmitButton = document.querySelector('#loginSubmitButton');
const loginBackButton = document.querySelector('#loginBackButton')

loginSubmitButton.addEventListener('click', loginSubmit);
loginBackButton.addEventListener('click', load);

function loginSubmit() {
    usernameSubmitFail.style.display = 'none';
    passwordSubmitFail.style.display = 'none';
    if (usernameLogin.value !== localStorage.getItem("username")) {
        usernameSubmitFail.style.display = 'block';
    }
    else if (passwordLogin.value !== localStorage.getItem("password")) {
        passwordSubmitFail.style.display = 'block';
    } else {
        window.location.href = './HTML/gameSite.html';
    }
    
}