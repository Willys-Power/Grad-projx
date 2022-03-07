import {
    hideLoginError,
    btnLogin,
    btnSignup,
    btnLogout,
    showLoginState,
    showLoginError,
    showSignupError,
    AuthState_message,
} from './assets/js/ui'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { getDatabase, ref, set, child, update, remove, onValue, push, onChildAdded } from 'firebase/database';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase
const firebaseApp = {
    apiKey: "AIzaSyBeVHBQg_1eG39DLrvYfY7-1iCRxPyqDTk",
    authDomain: "mindworx-ce3e7.firebaseapp.com",
    databaseURL: "https://mindworx-ce3e7-default-rtdb.firebaseio.com",
    projectId: "mindworx-ce3e7",
    storageBucket: "mindworx-ce3e7.appspot.com",
    messagingSenderId: "128645755464",
    appId: "1:128645755464:web:d28831b9440848e7725e7d",
    measurementId: "G-BV6Y0H03L7"
};


//initialize app
const app = initializeApp(firebaseApp);

//reference to database
const db = getDatabase(app);


//Reference to the authentication service
const auth = getAuth(app);



//detect authentication state
const trackAuthState = async() => {
    onAuthStateChanged(auth, user => {

        if (user != null) {
            // User is signed in
            console.log(user);
            console.log('logged in!');
            showLoginState(user);
            hideLoginError();
        } else {
            console.log('No user');
            showLoginState(user);
            AuthState_message.innerHTML = "Logged Out";
        }

    });
}
trackAuthState();


//------------------References----------------------// 
//-Graduate references-//
var fullname, email, gender, password, confirmPassword, address, country, city, province, DOB, skills, qualification, Qname, LinkedIn, github, WTR,
    checkboxPOPI;


const Gradupdatebtn = document.getElementById("save");

fullname = document.getElementById("fullname");
email = document.getElementById("email");
gender = document.getElementById("gender");
address = document.getElementById("address");
country = document.getElementById("country");
city = document.getElementById("city");
province = document.getElementById("province");
DOB = document.getElementById("DOB");
skills = document.getElementById("skills");
qualification = document.getElementById("qualification");
password = document.getElementById("psw");
confirmPassword = document.getElementById("confirmPsw");
checkboxPOPI = document.getElementById("popiACTchkbox");

// skills = Array.from(document.getElementById("skills").selectedOptions).map(o => o.value);
LinkedIn = document.getElementById("LinkedIn");
github = document.getElementById("Github");
WTR = document.getElementById("WTR");
Qname = document.getElementById("qualificationName");


//keep count of grad numbers
var countGrads = 0;
var countAdmins = 0;
var countClients = 0;

//----------------- INSERT DATA FUNCTION -------------//

//SIGN-UP A GRADUATE USER TYPE FUNCTION
const signup = async() => {

    //get all the input fields
    var fullName = fullname.value;
    var Email = email.value;
    var psw = password.value;
    var checkbox = checkboxPOPI.value;


    //make user sign in with email and password.
    try {

        const userCredential = await createUserWithEmailAndPassword(auth, Email, psw);
        if (userCredential) {
            //Signed in automatically
            console.log(userCredential.user);
            const user = userCredential.user;

            //add the grad in users.
            set(ref(db, 'users/' + user.uid), {
                fullname: fullName,
                email: Email,
                psw: psw,
                checkbox: checkbox,
                create_at: (new Date()).toDateString(),
                groups: {
                    group3: true,
                }

            });

            //update the graduate group members.
            updateGradGroup();


            console.log("logged in!");
            //print a nice message to notify user of created account.
            alert("SAVED");
            //redrect user to index page after 2 sec.
        }

    } catch (error) {
        console.log(error);
        showSignupError(error);

    }



}

//SIGN-IN A USER FUNCTON
const login = async() => {
    // Get all our input fields
    const signInEmail = document.getElementById('signInEmail').value;
    const signInpass = document.getElementById('signInpass').value;


    //catch any invaild inputs
    try {
        const userCredential = await signInWithEmailAndPassword(auth, signInEmail, signInpass);
        console.log(userCredential.user);
        window.location = "index";

    } catch (error) {
        console.log(error);
        //show error to the user in a pretty way
        showLoginError(error);
    }

}

//SIGN-OUT A USER FUNCTION
const logout = async() => {

    await signOut(auth);

    showLoginState(userCredential.user);


}

//--------------------- END CORE FUNCTIONALITY ------------------------------//

//---- START GET DATA FUNCTIONS -------/////////
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

//get skills data for user to pick from.
function showSkilloptions() {
    const skillsRef = ref(db, 'skills/');
    var counting = 0;
    var skillSelectElement = document.getElementById('skills');
    onChildAdded(skillsRef, (data) => {
        //get item key-value pair
        var skillKey = data.key;
        var skillVal = data.val();

        //create new option
        var anOption = document.createElement("option");
        var nodeOpt = document.createTextNode(`${skillVal}`);
        anOption.setAttribute("value", `${skillKey}`);
        anOption.appendChild(nodeOpt);

        //add new option in the multiple selector
        skillSelectElement.appendChild(anOption);

    })
}
showSkilloptions();


//---- END GET DATA FUNCTIONS -------/////////


//-------- START UPDATE GRADUATE PROFILE FUNCTION ------------------------//
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

//update graduate group object
function updateGradGroup() {
    countGrads++;
    console.log(countGrads);
    //get current user 
    const userId = auth.currentUser.uid;

    //reference to database
    const db = getDatabase(app);

    let updates = {};
    //get number of graduate users to update them.
    //const newGrad = ref(db, '/groups/group3/no_of_users/');

    updates['/groups/group3/no_of_users/'] = countGrads;


    //add userID to new graduate member list.
    updates['/groups/group3/members/' + userId] = true;
    //updated child node.


    alert('Group updated successfully');
    return update(ref(db), updates);

}

//update administrators group object
function updateAdminGroup() {
    countAdmins++;
    console.log(countAdmins);
    //get current user 
    const userId = auth.currentUser.uid;

    //reference to database
    const db = getDatabase(app);

    let updates = {};
    //get number of graduate users to update them.
    //const newGrad = ref(db, '/groups/group3/no_of_users/');

    updates['/groups/group1/no_of_users/'] = countAdmins;


    //add userID to new graduate member list.
    updates['/groups/group1/members/' + userId] = true;
    //updated child node.


    alert('Group updated successfully');
    return update(ref(db), updates);

}

//update clients group object
function updateClientGroup() {
    countClients++;
    console.log(countClients);
    //get current user 
    const userId = auth.currentUser.uid;

    //reference to database
    const db = getDatabase(app);

    let updates = {};
    //get number of graduate users to update them.
    //const newGrad = ref(db, '/groups/group3/no_of_users/');

    updates['/groups/group2/no_of_users/'] = countClients;


    //add userID to new graduate member list.
    updates['/groups/group2/members/' + userId] = true;
    //updated child node.


    alert('Group updated successfully');
    return update(ref(db), updates);

}

// -------- END UPDATE FUNCTIONS --------------------------------//




function forgotPassword() {
    forgotPassEmail = document.getElementById("forgotPassEmail").value;

    // if (validate_email(forgotPassEmail)){
    //     alert('Invalid Email')
    // }

    auth.sendPasswordResetEmail(forgotPassEmail)
        .then(function() {
            alert('Check emails for further instructions')
            window.location = "./signup.html"
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

//Gradupdate.addEventListener("click", updateGrad);
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


//------------- START VALIDATION FUNTIONS ---------//
function validate_email(email) {
    // expression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    //library to validate actual existance of an email.


    console.log(main);
    return main;
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

// ----- END VALIDATION FUNCTIONS -----//


//--------START EVENT HANDLERS -----///
if (btnSignup) {
    btnSignup.addEventListener('click', signup, false);
}

if (btnLogin) {
    btnLogin.addEventListener('click', login, false);
}
if (btnLogout) {
    btnLogout.addEventListener('click', logout, false);
    window.location = "signup";
}

// ----- END EVENT HANDLERS -----//