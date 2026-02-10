import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMQg5ppvrRf30VJGwfhEZBj32_2oG7i1U",
  authDomain: "labproject-6930f.firebaseapp.com",
  projectId: "labproject-6930f",
  storageBucket: "labproject-6930f.firebasestorage.app",
  messagingSenderId: "585219397070",
  appId: "1:585219397070:web:90e9d44ee7b8d78996c79f",
  measurementId: "G-PMQ155J3P9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);