// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDK-1mSfOiSpAe6N4DJA1moFHOZB-p3KgM",
    authDomain: "grad-projx.firebaseapp.com",
    projectId: "grad-projx",
    storageBucket: "grad-projx.appspot.com",
    messagingSenderId: "839430242950",
    appId: "1:839430242950:web:c020823e2797fb995c0707",
    measurementId: "G-CC0VNK6QHR"
};

// Innitialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);