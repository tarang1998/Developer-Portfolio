// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAvXz5c4MOj-y3ggkgv9mJCEbk07fB_8z0",
    authDomain: "portfolio-dbf21.firebaseapp.com",
    projectId: "portfolio-dbf21",
    storageBucket: "portfolio-dbf21.appspot.com",
    messagingSenderId: "743477747362",
    appId: "1:743477747362:web:9b29c1166ab9effdf841fb",
    measurementId: "G-7ZFYH905NX"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

export default firebase 