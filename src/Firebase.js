// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-rentspark.firebaseapp.com",
  projectId: "mern-rentspark",
  storageBucket: "mern-rentspark.appspot.com",
  messagingSenderId: "1097700366981",
  appId: "1:1097700366981:web:4c65779021a48d9493a7ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);