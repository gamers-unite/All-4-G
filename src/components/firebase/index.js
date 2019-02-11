import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
var config = {
    authDomain: "all-4-g.firebaseapp.com",
    databaseURL: "https://all-4-g.firebaseio.com",
    projectId: "all-4-g",
    storageBucket: "all-4-g.appspot.com",
    messagingSenderId: "522420826461"
};
firebase.initializeApp(config);

//Firebase Storage

const storage = firebase.storage();

export { storage, firebase as default };
