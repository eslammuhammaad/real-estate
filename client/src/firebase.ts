// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-3eda1.firebaseapp.com",
  projectId: "real-estate-3eda1",
  storageBucket: "real-estate-3eda1.appspot.com",
  messagingSenderId: "547128154511",
  appId: "1:547128154511:web:b709850ce1757055f153fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);