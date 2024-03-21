// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX4m9NBkes2W7kC8x0B1a2LhTAio6rdJ0",
  authDomain: "ad-campaign-eeee9.firebaseapp.com",
  projectId: "ad-campaign-eeee9",
  storageBucket: "ad-campaign-eeee9.appspot.com",
  messagingSenderId: "416962814018",
  appId: "1:416962814018:web:a35876811d0a91a0404ddb",
  measurementId: "G-CL01H92YJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);