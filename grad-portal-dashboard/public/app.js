import {
    img_inputloader,
    img_outputDisplay,
    profileLogoutLink,
    btnSignout,
    profileheader,
    menu,
    menuOnclick
} from './pages/profile'
import {
    hideLoginError,
    btnLogin,
    btnSignup,
    showLoginState,
    showLoginError,
    showSignupError,
    AuthState_message,
} from './assets/js/ui';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';


import { getDatabase, ref, set, child, update, remove, onValue, push, onChildAdded } from 'firebase/database';
import { getStorage, getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

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

//reference to storage services
const storage = getStorage(app);

//Reference to the authentication service
const auth = getAuth(app);


//detect authentication state
const trackAuthState = async() => {
    onAuthStateChanged(auth, user => {
        if (user != null) {
            // User is signed in
            console.log(`logged in! ${user.displayName}`);
            getProfilepic()
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
    checkboxPOPI, profession;


const Gradupdatebtn = document.getElementById("save");

fullname = document.getElementById("fullname");
email = document.getElementById("email");
gender = document.getElementById("gender");
// address = document.getElementById("address");
country = document.getElementById("country");
profession = document.getElementById("profession");
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
var fileName = '';


//----------------------------------------------- Start Custom page handler conditions --------------------//
const editProfile_activ = document.body.id;
if (editProfile_activ == 'editProfile_xc') {
    showSkilloptions();
}

const profileScrollor = document.body.id;
if (profileScrollor == 'gradprofileScroll') {
    window.onscroll = () => {
        menu.classList.remove("fa-times");
        profileheader.classList.remove("active");
    };
}

if (window.location.pathname == '/') {
    populateGradTable();
}

if (window.location.pathname == '/pages/profile') {
    setTimeout(getProfile, 1500);

}
//---------------------------------------------- End Custom page handler conditions --------------------------------///

//----------------- START INSERT DATA FUNCTION -------------//

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
            //redrect user to index page after 2 sec.
            window.location = '/pages/profile';
            // MULTI USER REDIRECTS

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

}

//UPDATE PROFILE PICTURE FILE
function loadImg(e) {
    //the file
    const fileList = e.target.files;
    console.log(fileList[0]);
    //get current user
    const userId = auth.currentUser.uid;

    const usrImgRef = sRef(storage, '/profileImages/' + userId + '/' + fileList[0].name);

    // const metadata = {
    //     name: fileList[0].name,
    //     size: fileList[0].size,
    //     ContentType: fileList[0].type,

    // };

    // console.log(metadata);
    // 'file' comes from the Blob or File API
    uploadBytes(usrImgRef, fileList[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!' + snapshot.metadata.size);
    });

    fileName = fileList[0].name;
    // var localURL = URL.createObjectURL(fileList[0]);
    // var globalRefURL = sRef(storage, '/profileImages/' + userId + '/' + fileList[0].name);
    // var globalRefURL = sRef(storage, `/profileImages/${userId}/${fileList[0].name}`);
    // img_outputDisplay.setAttribute("src", localURL);


    let updates = {};

    updates['/profileImg/' + userId + '/'] = fileName;

    update(ref(db), updates);


}


//--------------------- END INSERT DATA FUNCTIONA ------------------------------//


//---------------------- START GET DATA FUNCTIONS -------/////////
//show all available skills data for user to pick from.
function showSkilloptions() {
    const skillsRef = ref(db, '/skills/');
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

//pull all graduates to table
function populateGradTable() {

    // var tblUserElement = document.getElementById('graduatesTable');
    var tbodyUserElement = document.getElementById('gradBodyT');

    const usersRef = ref(db, 'profile/');
    onValue(usersRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {

            // const childData = childSnapshot.val();
            // ...
            var Name = childSnapshot.val().fullname;
            var profession = childSnapshot.val().profession;
            var qName = childSnapshot.val().qName;
            var coursename = childSnapshot.val().course;




            //create a table row for each user
            var userRow = document.createElement('tr');
            userRow.classList.add("text-gray-700", "dark:text-gray-400");


            //create tds and text nodes for each user
            var cellName = document.createElement('td');
            cellName.classList.add("px-4", "py-3");
            var divClss = document.createElement('div');
            divClss.classList.add("flex", "items-center", "text-sm");
            var divImg = document.createElement('div');
            divImg.classList.add("relative", "hidden", "w-8", "h-8", "mr-3", "rounded-full", "md:block");
            var gradprofpic = document.createElement('img');
            gradprofpic.classList.add("object-cover", "w-full", "h-full", "rounded-full");
            var divLast = document.createElement('div');
            divLast.classList.add("absolute", "inset-0", "rounded-full", "shadow-inner");
            divLast.ariaHidden = true;
            //name of graduate
            var divNameNprofes = document.createElement('div');
            var paragraph1 = document.createElement('p');
            paragraph1.classList.add("font-semibold");
            var paragraph1Text = document.createTextNode(`${Name}`);
            paragraph1.appendChild(paragraph1Text);
            //graduate profession
            var paragraph2 = document.createElement('p');
            paragraph2.classList.add("text-xs", "text-gray-600", "dark:text-gray-400");
            var paragraph2Text = document.createTextNode(`${profession}`);
            paragraph2.appendChild(paragraph2Text);

            //get current user
            const childKey = childSnapshot.key;
            const userId = childKey;

            //get file name from database, not storage
            const userprofile = ref(db, '/profileImg/' + userId + '/');
            onValue(userprofile, (snapshot) => {
                var userImgName = snapshot.val();
                console.log(userImgName);
                // Note that in the URL, characters are URL escaped!

                const imgpathReference = sRef(storage, '/profileImages/' + userId + '/' + userImgName);

                getDownloadURL(imgpathReference)
                    .then((url) => {
                        gradprofpic.src = url;
                    })

            });


            //append image div
            divImg.appendChild(gradprofpic);
            divImg.appendChild(divLast);

            //append name & profession
            divNameNprofes.appendChild(paragraph1);
            divNameNprofes.appendChild(paragraph2);


            //add divImage to 
            divClss.appendChild(divImg);
            divClss.appendChild(divNameNprofes);

            //add the td NAMES
            cellName.appendChild(divClss);



            //academic cell.
            var cellAcademic = document.createElement('td');
            cellAcademic.classList.add("px-4", "text-sm");

            var cellAcademicTextNode = document.createTextNode(`${coursename}`);
            cellAcademic.appendChild(cellAcademicTextNode);


            //Qualification cell.
            var cellQualications = document.createElement('td');
            cellQualications.classList.add("px-4", "text-xs");


            var cellQualicationsNode = document.createTextNode(`${qName}`);
            cellQualications.appendChild(cellQualicationsNode);


            //Avalibility cell.
            var cellAvailability = document.createElement('td');
            cellAvailability.classList.add("px-4", "text-sm");
            var spanPara = document.createElement('span');
            spanPara.classList.add("px-2", "py-1", "font-semibold", "leading-tight", "text-green-700", "bg-green-100", "rounded-full", "dark:bg-green-700", "dark:text-green-100");

            var spanParaNode = document.createTextNode("open");
            spanPara.appendChild(spanParaNode);

            var btnInterview = document.createElement("button");
            btnInterview.classList.add("px-4", "py-2", "text-sm", "font-medium", "leading-5", "text-white", "transition-colors", "duration-150", "bg-purple-600", "border", "border-transparent", "rounded-lg", "active:bg-purple-600", "hover:bg-purple-700", "focus:outline-none", "focus:shadow-outline-purple");

            var btnInterviewNode = document.createTextNode('Interviews');
            btnInterview.appendChild(btnInterviewNode);

            //add to cellAvailability
            cellAvailability.appendChild(spanPara);
            cellAvailability.appendChild(btnInterview);



            //add all td in row
            userRow.appendChild(cellName);
            userRow.appendChild(cellAcademic);
            userRow.appendChild(cellQualications);
            userRow.appendChild(cellAvailability);

            //add new row in the table boda\y
            tbodyUserElement.appendChild(userRow);
        });

    });
    // tblUserElement.appendChild(tbodyUserElement);
}

//show all qualifications available for user to pick from.

//get profile picture.
function getProfilepic() {
    //get current user
    const userId = auth.currentUser.uid;
    //get file name from database, not storage
    const userprofile = ref(db, '/profileImg/' + userId + '/');
    onValue(userprofile, (snapshot) => {
        var userImgName = snapshot.val();
        console.log(userImgName);
        // Create a reference from an HTTPS URL

        // Note that in the URL, characters are URL escaped!

        const imgpathReference = sRef(storage, '/profileImages/' + userId + '/' + userImgName);

        getDownloadURL(imgpathReference)
            .then((url) => {
                // //display image
                if (window.location.pathname != '/pages/editProfile' && window.location.pathname != '/signup')
                    img_outputDisplay.setAttribute("src", url);
            })

    }, {
        onlyOnce: true,
    });

}

//get profile details
function getProfile() {
    const userId = auth.currentUser.uid;
    console.log(userId);
    const usersRef = ref(db, '/profile/' + userId + '/');

    onValue(usersRef, (snapshot) => {
        console.log(snapshot.val());
        document.getElementById('gradName').innerHTML = snapshot.val().fullname;
        document.getElementById('gradName2').innerHTML = snapshot.val().fullname;
        document.getElementById('gradName3').innerHTML = snapshot.val().fullname;
        document.getElementById('gradName4').innerHTML = snapshot.val().fullname;



        document.getElementById('gradQuali').innerHTML = snapshot.val().qualification;

        document.getElementById('gradprofession').innerHTML = snapshot.val().profession;

    }, {
        onlyOnce: true,
    });
}

//---- END GET DATA FUNCTIONS -------/////////




//-------- START UPDATE GRADUATE PROFILE FUNCTION ------------------------//
function updateGrad() {


    //enter updated values

    fullname = document.getElementById("fullname").value;
    email = document.getElementById("email").value;
    gender = document.getElementById("gender").value;
    profession = document.getElementById("profession").value;
    country = document.getElementById("country").value;
    city = document.getElementById("city").value;
    province = document.getElementById("province").value;
    DOB = document.getElementById("DOB").value;
    var course = document.getElementById("course").value;
    qualification = document.getElementById("qualification").value;

    skills = Array.from(document.getElementById("skills").selectedOptions).map(o => o.value);
    LinkedIn = document.getElementById("LinkedIn").value;
    github = document.getElementById("Github").value;
    WTR = document.getElementById("WTR").value;
    Qname = document.getElementById("qualificationName").value;

    //get currently signned in user.
    var userId = auth.currentUser.uid;

    let updates = {};
    //update userid profile to Firebase Database
    let userUpdatedata = {

        fullname: fullname,
        gender: gender,
        profession: profession,
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

    // let isEmpty = Object.values(userUpdatedata).every()
    updates['/profile/' + userId + '/'] = userUpdatedata;
    updates['/users/' + userId + '/fullname/'] = fullname;

    return update(ref(db), updates);
}

//-------- END UPDATE GRADUATE PROFILE FUNCTION ------------------------//

//update graduate group object
function updateGradGroup() {

    //get current user 
    const userId = auth.currentUser.uid;
    let updates = {};

    //reference to database
    const db = getDatabase(app);
    //get number of graduate users to update them.
    const numofusers = ref(db, 'groups/group3/no_of_users');
    onValue(numofusers, (snapshot) => {
        var data = snapshot.val();
        console.log(data);

        data += 1;
        console.log(data);
        updates['/groups/group3/no_of_users/'] = data;

        //add userID to new graduate member list.
        updates['/groups/group3/members/' + userId] = true;
        //updated child node.


        alert('Group updated successfully');
        update(ref(db), updates);

    }, {
        onlyOnce: true,
    });




}

//update administrators group object
function updateAdminGroup() {
    //get current user 
    const userId = auth.currentUser.uid;
    let updates = {};


    //reference to database
    const db = getDatabase(app);
    //get number of administrators to update them.
    const numofAdmins = ref(db, 'groups/group1/no_of_users');
    onValue(numofAdmins, (snapshot) => {
        var data = snapshot.val();
        console.log(data);

        data += 1;
        console.log(data);
        updates['/groups/group1/no_of_users/'] = data;

        //add userID to new graduate member list.
        updates['/groups/group1/members/' + userId] = true;
        //updated child node.


        alert('Group updated successfully');
        update(ref(db), updates);

    }, {
        onlyOnce: true,
    });

}

//update clients group object
function updateClientGroup() {
    //get current user 
    const userId = auth.currentUser.uid;
    let updates = {};


    //reference to database
    const db = getDatabase(app);
    //get number of administrators to update them.
    const numofAdmins = ref(db, 'groups/group1/no_of_users');
    onValue(numofAdmins, (snapshot) => {
        var data = snapshot.val();
        console.log(data);

        data += 1;
        console.log(data);
        updates['/groups/group1/no_of_users/'] = data;

        //add userID to new graduate member list.
        updates['/groups/group1/members/' + userId] = true;
        //updated child node.


        alert('Group updated successfully');
        update(ref(db), updates);

    }, {
        onlyOnce: true,
    });

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

// if (indexLogoutLink) {
//     indexLogoutLink.addEventListener('click', logout, false);
// }

if (Gradupdatebtn) {
    Gradupdatebtn.addEventListener('click', updateGrad, false);
}

if (img_inputloader) {
    img_inputloader.addEventListener('change', loadImg, false);
}


if (profileLogoutLink) {
    profileLogoutLink.addEventListener("click", logout, false);
}

if (btnSignout) {
    btnSignout.addEventListener('click', logout, false);
}


if (menu) {
    menu.addEventListener('click', menuOnclick, false);
}


// ----- END EVENT HANDLERS -----//
//