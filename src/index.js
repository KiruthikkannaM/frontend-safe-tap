// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Add collection and getDocs imports

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdUwyWj2dAwNeS43VfgpGdeu2KHy8ci_4",
  authDomain: "backend-8b85c.firebaseapp.com",
  projectId: "backend-8b85c",
  storageBucket: "backend-8b85c.appspot.com",
  messagingSenderId: "1095233648966",
  appId: "1:1095233648966:web:53ba96a12040f5b77f0d47",
  measurementId: "G-ZHW59DYCPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app); // Make sure to pass the app instance and export db

// Example code to retrieve data from Firestore (optional)
const colRef = collection(db, 'kids_details'); // Correct usage of collection
getDocs(colRef)
    .then((snapshot) => {
        let details = [];
        snapshot.docs.forEach((doc) => {
            details.push({ ...doc.data(), id: doc.id });
        });

        console.log(details);
    })
    .catch(err => {
        console.log(err.message);
    });
