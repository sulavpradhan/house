// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5PjwOtAJO6V3R-N3l1tNECEaZT4Q2M-Q",
  authDomain: "house-marketplace-arbyte-task.firebaseapp.com",
  projectId: "house-marketplace-arbyte-task",
  storageBucket: "house-marketplace-arbyte-task.appspot.com",
  messagingSenderId: "421843378642",
  appId: "1:421843378642:web:ee38174538be7dbaefe80b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();