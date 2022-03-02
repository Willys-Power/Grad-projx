// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyAuuAMrOqkTix4hgvE4gG3MtA44ZYQWg2k",
    authDomain: "mindworxgrad.firebaseapp.com",
    databaseURL: "https://mindworxgrad-default-rtdb.firebaseio.com",
    projectId: "mindworxgrad",
    storageBucket: "mindworxgrad.appspot.com",
    messagingSenderId: "921423385255",
    appId: "1:921423385255:web:1e0ac2a0df745193e34182",
    measurementId: "G-D1HH02SNW3"
});





/// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = getAuth(firebaseConfig);
const database = getFirestore(firebaseConfig);


//detect auth state
onAuthStateChanged(auth, user => {

    if (user != null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }

});


const Gradupdate = document.getElementById("save");

var fullname, email, gender, address, country, city, province, DOB, course, qualification, Qname, LinkedIn, github, WTR;
fullname = document.getElementById("fullname").value;
email = document.getElementById("email").value;
gender = document.getElementById("gender").value;
address = document.getElementById("address").value;
country = document.getElementById("country").value;
city = document.getElementById("city").value;
province = document.getElementById("province").value;
DOB = document.getElementById("DOB").value;
course = document.getElementById("course").value;
qualification = document.getElementById("qualification").value;

// skills = Array.from(document.getElementById("skills").selectedOptions).map(o => o.value);
LinkedIn = document.getElementById("LinkedIn").value;
github = document.getElementById("Github").value;
WTR = document.getElementById("WTR").value;
Qname = document.getElementById("qualificationName").value;

//Set up the SignUp function
function signup() {
    //get all the input fields
    fullname = document.getElementById("fullname").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    confirmPass = document.getElementById("confirmPass").value;
    checkbox = document.getElementById("checkbox").value;

    // Validate input fields

    if (validate_email(email) == false) {
        alert('Email Or Password is not valid!!')
        return
        // Don't continue running the code
    }

    if (password != confirmPass) {
        alert('Passwords do not match!!')
        return
    }
    if ((validate_field(fullname) == false)) {
        alert('One or More Extra Fields is not valid!!')
        return
    }

    //   

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                fullname: fullname,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('usersNkocie/' + user.uid).set(user_data)

            // DOne
            alert('User Created!!')

        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

function autofill(userData) {

    // save users on the session
    localStorage.setItem('country', (!Boolean(userData.get('country'))) ? "" : userData.get('country'));
    localStorage.setItem('city', (!Boolean(userData.get('city'))) ? "" : userData.get('city'));
    localStorage.setItem('address', (!Boolean(userData.get('address'))) ? "" : userData.get('address'));
    localStorage.setItem('course', (!Boolean(userData.get('course'))) ? "" : userData.get('course'));
    localStorage.setItem('DOB', (!Boolean(userData.get('DOB'))) ? "" : userData.get('DOB'));
    localStorage.setItem('qualification', (!Boolean(userData.get('qualification'))) ? "" : userData.get('qualification'));
    localStorage.setItem('qualificationName', (!Boolean(userData.get('qualificationName'))) ? "" : userData.get('qualificationName'));
    localStorage.setItem('WTR', (!Boolean(userData.get('WTR'))) ? "" : userData.get('WTR'));
    localStorage.setItem('gender', (!Boolean(userData.get('gender'))) ? "" : userData.get('gender'));
    localStorage.setItem('email', (!Boolean(userData.get('email'))) ? "" : userData.get('email'));
    localStorage.setItem('province', (!Boolean(userData.get('province'))) ? "" : userData.get('province'));
    localStorage.setItem('role', (!Boolean(userData.get('role'))) ? "" : userData.get('role'));
    localStorage.setItem('skills', (!Boolean(userData.get('skills'))) ? "" : userData.get('skills'));
    localStorage.setItem('Github', (!Boolean(userData.get('Github'))) ? "" : userData.get('Github'));
    localStorage.setItem('LinkedIn', (!Boolean(userData.get('LinkedIn'))) ? "" : userData.get('LinkedIn'));
    localStorage.setItem('KeepLoggedIn', 'yes');
    localStorage.setItem('userId', userData.get('uid'));

    // window.location = (user.get('role') === "admin")?"index.html": "pages/editProfile.html";



}

function loadData() {
    document.getElementById('DOB').value = localStorage.getItem('DOB');
    document.getElementById('LinkedIn').value = localStorage.getItem('LinkedIn');
    document.getElementById('Github').value = localStorage.getItem('Github');
    document.getElementById('province').value = localStorage.getItem('province');

}


// Set up our login function
function login() {
    // Get all our input fields
    signInEmail = document.getElementById('signInEmail').value;
    signInpass = document.getElementById('signInpass').value;

    // Validate input fields
    if (validate_email(signInEmail) == false || validate_password(signInpass) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }
    auth.signInWithEmailAndPassword(signInEmail, signInpass)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            localStorage.setItem('currentUser', user);
            localStorage.setItem('Id', user.uid);
            // Push to Firebase Database
            database_ref.child('usersNkocie/' + user.uid).update(user_data)

            // DOne
            //alert('User Logged In!! ')

            //GetUserData form Database and save it too the session

            database_ref.child('usersNkocie/' + user.uid).once("value", snap => {
                var data = snap.val()
                autofill(data.fullname)
            });
            window.location = "index.html"
                //console.log(user.uid)
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}


function updateGrad() {

    //enter updated values

    fullname = document.getElementById("fullname").value;
    email = document.getElementById("email").value;
    gender = document.getElementById("gender").value;
    address = document.getElementById("address").value;
    country = document.getElementById("country").value;
    city = document.getElementById("city").value;
    province = document.getElementById("province").value;
    DOB = document.getElementById("DOB").value;
    course = document.getElementById("course").value;
    qualification = document.getElementById("qualification").value;

    skills = Array.from(document.getElementById("skills").selectedOptions).map(o => o.value);
    LinkedIn = document.getElementById("LinkedIn").value;
    github = document.getElementById("Github").value;
    WTR = document.getElementById("WTR").value;
    Qname = document.getElementById("qualificationName").value;
    //

    var userId = localStorage.getItem('Id')
    alert("Id is " + userId);
    // Add this user to Firebase Database
    let DBRef = database.ref()
    let userUpdatedata = {

        fullname: fullname,
        email: email,
        gender: gender,
        address: address,
        country: country,
        city: city,
        province: province,
        DOB: DOB,
        course: course,
        qualification: qualification,
        qName: Qname,
        LinkedIn: LinkedIn,
        github: github,
        WTR: WTR,
        skills: skills

    }


    DBRef.child('usersNkocie/' + userId).update(userUpdatedata)
    console.log("user id is " + userId)
    const t = prompt(" Enter something")
    alert("user updated succesfully");
    window.location = "profile.html";

}


function forgotPassword() {
    forgotPassEmail = document.getElementById("forgotPassEmail").value;

    // if (validate_email(forgotPassEmail)){
    //     alert('Invalid Email')
    // }

    auth.sendPasswordResetEmail(forgotPassEmail)
        .then(function() {
            alert('Check emails for further instructions')
            window.location = "../signup.html"
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

Gradupdate.addEventListener("click", updateGrad);
//generate password
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
//Add new client
let clientPassword = generatePassword();

function addNewClient() {

    clientName = document.getElementById("clientName").value;
    clientEmail = document.getElementById("clientEmail").value;
    clientGender = document.getElementById("clientGender").value;
    clientTitle = document.getElementById("clientTitle").value;
    companyName = document.getElementById("companyName").value;
    clientDivision = document.getElementById("clientDivision").value;

    document.getElementById("clientPassword").value = clientPassword;

    alert("CLient password is " + clientPassword)

    auth.sendSignInLinkToEmail(clientEmail, actionCodeSettings)
        .then(function() {

            window.localStorage.setItem('emailForSignIn', clientEmail);
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });

    database.ref('usersNkocie/' + clientEmail).set({
        clientName: clientName,
        clientEmail: clientEmail,
        clientGender: clientGender,
        companyName: companyName,
        clientTitle: clientTitle,
        clientDivision: clientDivision
    })
    alert("Client Added Successfully!")
}

//Validate functions

function validate_email(email) {
    expression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password.length < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}

function validate_checkbox(checkbox) {
    if (checkbox.checked == true) {
        return true
    } else {
        return false
    }
}