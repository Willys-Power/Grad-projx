import { AuthErrorCodes } from 'firebase/auth';

export const divLoginError = document.querySelector('#divLoginError');
export const loginError_message = document.querySelector('#loginError_message');
export const divAuthState = document.querySelector('#divAuthState');
export const AuthState_message = document.querySelector('#AuthState_msg');
export const divSignupError = document.querySelector('#divSignupError');
export const signupError_message = document.querySelector('#SignupError_message');

export const btnLogin = document.querySelector('#signIn');
export const btnSignup = document.querySelector('#sign_up');


export const hideLoginError = () => {
    divLoginError.style.display = 'none'
    loginError_message.innerHTML = ''
}

export const showLoginError = (error) => {
    divLoginError.style.display = 'block'
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
        loginError_message.innerHTML = 'Email or Password is incorrect. Try again.'
    } else {
        loginError_message.innerHTML = 'Error: ${error.message}'
    }
}

export const showSignupError = (error) => {
    divSignupError.style.display = 'block'
    if (error.code == AuthErrorCodes.EMAIL_EXISTS) {
        signupError_message.innerHTML = 'Email already exists. Try loggin in.'
    } else if (error.code == AuthErrorCodes.INVALID_EMAIL) {
        signupError_message.innerHTML = 'Please verify email.'
    } else {
        signupError_message.innerHTML = 'Error: ${error.message}'
    }
}

export const showLoginState = (user) => {
    divAuthState.style.display = 'block'
    if (user == null) {
        AuthState_message.innerHTML = ' You logged out.'
    } else {
        AuthState_message.innerHTML = 'You are logged in.'
    }

}