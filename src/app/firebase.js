// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAQSZH621h_iEe_1Ccf5lHhgwJXyys6pFw",
  authDomain: "ad-campaign-fea44.firebaseapp.com",
  projectId: "ad-campaign-fea44",
  storageBucket: "ad-campaign-fea44.appspot.com",
  messagingSenderId: "209232235501",
  appId: "1:209232235501:web:f05377426bb0d8ddd7b5e4",
  measurementId: "G-WLXEECQMF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);