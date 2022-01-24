
import {initializeApp} from './firebase/app';

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});



const firebaseConfig = {
apiKey: "AIzaSyBjb2q8JxIgOtA5c8vbH54aD6axYjt3ujc",
authDomain: "mindworx-grad.firebaseapp.com",
databaseURL: "https://mindworx-grad-default-rtdb.firebaseio.com/",
projectId: "mindworx-grad",
storageBucket: "mindworx-grad.appspot.com",
messagingSenderId: "632704211807",
appId: "1:632704211807:web:d2f599fe23015e9f9934ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

username,email,password,confirmPass,surname;

function Ready(){

  username = document.getElementById("username");
  surname = document.getElementById("userSurname");
  email = document.getElementById("email");
  password = document.getElementById("password");
  confirmPass = document.getElementById("confirmPass");
  
  alert("Values assigned");
}


// -------------------------Insert---------------------------------

document.getElementByClass("btn").onclick = function(){
 Ready;

 if(password.localeCompare(confirmPass) == 0){

  firebase.database().ref('graduate/'+email).set({
   Email:email,
   Username: username,
   surname: userSurname,
   Passsword: password,
   
 });

 alert("Sign up succesful");

 }else{
   alert("Password does not match");
 }
}
