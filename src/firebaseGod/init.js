import * as firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsb26L3RkPstet0QLpyMalK4Ehq0zfjYw",
  authDomain: "god-ninja-smoothies.firebaseapp.com",
  databaseURL: "https://god-ninja-smoothies.firebaseio.com",
  projectId: "god-ninja-smoothies",
  storageBucket: "god-ninja-smoothies.appspot.com",
  messagingSenderId: "434509564809",
  appId: "1:434509564809:web:af8692899860054b6e2f58",
  measurementId: "G-FM41LTBQJY"
};
// Initialize Firebase
const firebaseAppGod = firebase.initializeApp(firebaseConfig);
export default firebaseAppGod.firestore();
