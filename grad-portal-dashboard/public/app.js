import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";

import { initializeApp } from './firebase/app';

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const sign_up = document.querySelector("#signUp");

const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_up.addEventListener("click", () => { Ready(); });
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuuAMrOqkTix4hgvE4gG3MtA44ZYQWg2k",
    authDomain: "mindworxgrad.firebaseapp.com",
    projectId: "mindworxgrad",
    storageBucket: "mindworxgrad.appspot.com",
    messagingSenderId: "921423385255",
    appId: "1:921423385255:web:1e0ac2a0df745193e34182",
    measurementId: "G-D1HH02SNW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize variables

const auth = firebase.auth()
const database = firebase.database()

username, email, password, confirmPass, surname;

// function Ready() {

//     username = document.getElementById("username");

//     email = document.getElementById("email");
//     password = document.getElementById("password");
//     confirmPass = document.getElementById("confirmPass");

//     alert("Values assigned");

//     auth.createUserWithEmailAndPassword(email, password).then(function() {

//         var user = auth.currentUser

//         //add user to DB

//         var databaseRef = database.ref()

//         var user_data = {

//             email: email,
//             full_name: username,
//             last_login: Data.Now()

//         }

//         databaseRef.child('user/' + user.uid).set(user_data)
//         alert('Userr created')
//     }).catch(function(error) {

//             var error_code = error.error_code
//             var error_message = error.message

//         }

//         /**if(password === confirmPass){

//           firebase.database().ref('graduate/'+email).set({
//            Email:email,
//            Username: username,
//            surname: userSurname,
//            Passsword: password,

//          });

//          alert("Sign up succesful");

//          }else{
//            alert("Password does not match");
//          }**/
//     }


// -------------------------Insert---------------------------------

document.getElementByClass("btn").onclick = function() {
    Ready;


}