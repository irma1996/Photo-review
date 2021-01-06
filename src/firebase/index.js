import firebase from 'firebase/app';
import "firebase/storage";

//Project settings in the Firebase console 
const firebasConfig = {
    apiKey: "AIzaSyDcRGA2qFUe4FkVT-oxW6OrQCuQbfgQ6yQ",
    authDomain: "photo-review-27f9e.firebaseapp.com",
    projectId: "photo-review-27f9e",
    storageBucket: "photo-review-27f9e.appspot.com",
    messagingSenderId: "425369595049",
    appId: "1:425369595049:web:e974de3dbb9bba2fda8db8",
    measurementId: "G-YWFGLRFW19"
}

//Initialize connection to FIrebase
firebase.initializeApp(firebasConfig);

//Initialize connection to FIrebase
const storage= firebase.storage();

export{storage, firebase as default}