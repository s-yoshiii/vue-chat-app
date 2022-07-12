// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpNBL4mcLUBOBF9YUAZ2fHMX34Fgsh89c",
  authDomain: "vue-chat-app-202207.firebaseapp.com",
  projectId: "vue-chat-app-202207",
  storageBucket: "vue-chat-app-202207.appspot.com",
  messagingSenderId: "534515056574",
  appId: "1:534515056574:web:5b4f74f20e849b3369c3ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
