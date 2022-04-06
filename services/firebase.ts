// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVyONmMMvOZHRGcEiiL1fcfXamGUxvAF4",
  authDomain: "fb-demo-fabcgn.firebaseapp.com",
  projectId: "fb-demo-fabcgn",
  storageBucket: "fb-demo-fabcgn.appspot.com",
  messagingSenderId: "651482434560",
  appId: "1:651482434560:web:e62ecf235247c671b39ce5",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
export const functions = getFunctions()
