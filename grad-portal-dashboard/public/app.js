
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuuAMrOqkTix4hgvE4gG3MtA44ZYQWg2k",
    authDomain: "mindworxgrad.firebaseapp.com",
    databaseURL: "https://mindworxgrad-default-rtdb.firebaseio.com",
    projectId: "mindworxgrad",
    storageBucket: "mindworxgrad.appspot.com",
    messagingSenderId: "921423385255",
    appId: "1:921423385255:web:1e0ac2a0df745193e34182",
    measurementId: "G-D1HH02SNW3"
};

/// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

//Set up the SignUp function
function signup(){
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
   
  if (password != confirmPass){
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
      email : email,
      fullname : fullname,
      last_login : Date.now()
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




// Set up our login function
function login () {
    // Get all our input fields
    signInEmail = document.getElementById('signInEmail').value;
    signInpass = document.getElementById('signInpass').value;
  
    // Validate input fields
    if (validate_email(signInEmail) == false || validate_password(signInpass) == false ) {
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
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('usersNkocie/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!! ')
      window.location = "index.html"
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
 
function forgotPassword () {
    forgotPassEmail = document.getElementById("forgotPassEmail").value;

    // if (validate_email(forgotPassEmail)){
    //     alert('Invalid Email')
    // }

    auth.sendPasswordResetEmail(forgotPassEmail)
    .then(function(){
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

//Add new client
function addNewClient(){
    
    clientName = document.getElementById("clientName").value;
    clientEmail = document.getElementById("clientEmail").value;
    clientGender = document.getElementById("clientGender").value;
    clientTitle= document.getElementById("clientTitle").value;
    companyName = document.getElementById("companyName").value;
    clientDivision = document.getElementById("clientDivision").value;

    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://mindworxgrad.web.app',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
      };

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
        clientName : clientName,
        clientEmail : clientEmail,
        clientGender : clientGender,
        companyName : companyName,
        clientTitle : clientTitle,
        clientDivision : clientDivision
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
  
  function validate_checkbox(checkbox){
      if (checkbox.checked == true) {
          return true
      }else{
          return false
      }
  }