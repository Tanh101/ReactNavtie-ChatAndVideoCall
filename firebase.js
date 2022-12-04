// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDmfN8BY73xdQXGYfVTMMHRs75w6Q5-vcU",
//     authDomain: "chatapp-60e65.firebaseapp.com",
//     projectId: "chatapp-60e65",
//     storageBucket: "chatapp-60e65.appspot.com",
//     messagingSenderId: "109350846857",
//     appId: "1:109350846857:web:98f84b30b1944828f86158"
// };
const firebaseConfig = {
    apiKey: "AIzaSyB9B3RwlJ9M8_IY2kjRvECZzTywNdYNPXc",
    authDomain: "chatandvideocall-e3da8.firebaseapp.com",
    databaseURL: "https://chatandvideocall-e3da8-default-rtdb.firebaseio.com",
    projectId: "chatandvideocall-e3da8",
    storageBucket: "chatandvideocall-e3da8.appspot.com",
    messagingSenderId: "421032074068",
    appId: "1:421032074068:web:d3528e5f2e52e560c486c1",
    measurementId: "G-6HM8WZXL7W",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
// const app = initializeApp(firebaseConfig);