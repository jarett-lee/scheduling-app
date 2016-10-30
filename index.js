
var firebase = require("firebase");
var provider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase

firebase.initializeApp({
  apiKey: "AIzaSyDFHUcWeR-AJwKNDf24Yl-tOFBwQoUyPMg",
  authDomain: "scheduling-app-ffcb8.firebaseapp.com",
  databaseURL: "https://scheduling-app-ffcb8.firebaseio.com",
  storageBucket: "scheduling-app-ffcb8.appspot.com",
  messagingSenderId: "912110575490"
});

// Initialize provider

provider.addScope('https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly');
