import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC7zKwSqLAbI-Tw4k24e4iPEVetBTwUaeI",
    authDomain: "behaviour-tracking-app.firebaseapp.com",
    projectId: "behaviour-tracking-app",
    storageBucket: "behaviour-tracking-app.appspot.com",
    messagingSenderId: "1031385648618",
    appId: "1:1031385648618:web:bdbcc52b9da3f9b2f07693"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export {app, auth, db, storage};