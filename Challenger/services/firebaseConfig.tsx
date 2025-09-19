// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxlrXiv_ZlyTG1JDRPtdblQecjsNy0TTU",
  authDomain: "app-mottu.firebaseapp.com",
  projectId: "app-mottu",
  storageBucket: "app-mottu.firebasestorage.app",
  messagingSenderId: "526486425723",
  appId: "1:526486425723:web:96bb1659a7b157505312de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);