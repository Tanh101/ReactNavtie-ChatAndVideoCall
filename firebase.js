// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import firestore from "firebase/firestore";
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
    apiKey: "AIzaSyAp6X58VRfIE--8RR6-gKxQ7MdqFhq8f7I",
    authDomain: "messengerdemo-f9832.firebaseapp.com",
    projectId: "messengerdemo-f9832",
    storageBucket: "messengerdemo-f9832.appspot.com",
    messagingSenderId: "214757913052",
    appId: "1:214757913052:web:f35a0c1cfebb2b42979f19"
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
