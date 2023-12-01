// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBih76RiBHefFxEvz_d9uI68tKxtiqMwRU",
  authDomain: "ecommerce-6a167.firebaseapp.com",
  projectId: "ecommerce-6a167",
  storageBucket: "ecommerce-6a167.appspot.com",
  messagingSenderId: "1018576697513",
  appId: "1:1018576697513:web:dff9b424fc64779d71d1b8",
  measurementId: "G-HSB8M6TW4V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
