import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";


//Project settings in the Firebase console 
const firebasConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID

};

//Initialize connection to FIrebase
firebase.initializeApp(firebasConfig);

//get firebase auth instance
const auth = firebase.auth()

//initialize Firebase Firestore
const db = firebase.firestore();

//Initialize connection to FIrebase
const storage= firebase.storage();

export{ auth, db, storage, firebase as default}