// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import {getAuth, OnAuthStateChanged} from 'firebase/auth'
import {getDatabase} from 'firebase/database'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYE62gUpfCf8s5UB9yKu5XW-OrSjkQ2GM",
  authDomain: "restaurant-manager-32812.firebaseapp.com",
  databaseURL: "https://restaurant-manager-32812-default-rtdb.firebaseio.com",
  projectId: "restaurant-manager-32812",
  storageBucket: "restaurant-manager-32812.appspot.com",
  messagingSenderId: "850744398481",
  appId: "1:850744398481:web:bd948e1df8c447742fa530",
  measurementId: "G-XYTXJC5TFC"
};

// Initialize Firebase
let otherapp;
if(firebase.apps.length === 0){
    otherapp = firebase.initializeApp(firebaseConfig);
}
else {
    otherapp = firebase.app()
}
const database = getDatabase(otherapp)
const Manager_auth = firebase.auth(otherapp)
const Manager_db = otherapp.firestore()

export{ Manager_auth,database,Manager_db };