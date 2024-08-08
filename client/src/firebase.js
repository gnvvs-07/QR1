// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "mernqr-8c2cc.firebaseapp.com",
  projectId: "mernqr-8c2cc",
  storageBucket: "mernqr-8c2cc.appspot.com",
  messagingSenderId: "1037851449557",
  appId: "1:1037851449557:web:b8fa9ec59729509657aa5c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
