// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyChOlKonPUXzvN2_UaRgujx5pnh7qyQH0c",
  authDomain:"empowered-ed9ae.firebaseapp.com",
  projectId: "empowered-ed9ae",
  storageBucket: "empowered-ed9ae.appspot.com",
  messagingSenderId:"352036931719",
  appId: "1:352036931719:web:ebb8ef62e1cfc998721022"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
export default auth;