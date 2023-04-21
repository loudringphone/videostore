// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAxwMMMStu1MdOeLtuMxUFj9oLMhffnF1A",
//   authDomain: "video-store-5e07c.firebaseapp.com",
//   projectId: "video-store-5e07c",
//   storageBucket: "video-store-5e07c.appspot.com",
//   messagingSenderId: "74661860264",
//   appId: "1:74661860264:web:fa9497dad2c0b7fe90839d",
//   measurementId: "G-129L9G6Y67"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAdindKyDOfoOpdE1mwRIk11N9-Nr-oYSM",
  authDomain: "video-store-77873.firebaseapp.com",
  projectId: "video-store-77873",
  storageBucket: "video-store-77873.appspot.com",
  messagingSenderId: "413804572532",
  appId: "1:413804572532:web:6767d4647e8ccaf47e8621",
  measurementId: "G-B901TFE25G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);