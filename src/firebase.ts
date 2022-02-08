// Import the functions you need from the SDKs you need


import * as firebase from 'firebase/app';

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7fHUncLZqZavTiaeMH83sFzs5ZUM4Lx8",
    authDomain: "shop-app-1b2ec.firebaseapp.com",
    databaseURL: "https://shop-app-1b2ec-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shop-app-1b2ec",
    storageBucket: "shop-app-1b2ec.appspot.com",
    messagingSenderId: "483115096520",
    appId: "1:483115096520:web:fa9d686b0115c318fb48fd",
    measurementId: "G-Y37LL39SWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default firebase;