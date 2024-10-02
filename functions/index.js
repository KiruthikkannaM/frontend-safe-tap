// // /**
// //  * Import function triggers from their respective submodules:
// //  *
// //  * const {onCall} = require("firebase-functions/v2/https");
// //  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
// //  *
// //  * See a full list of supported triggers at https://firebase.google.com/docs/functions
// //  */

// // const {onRequest} = require("firebase-functions/v2/https");
// // const logger = require("firebase-functions/logger");

// // // Create and deploy your first functions
// // // https://firebase.google.com/docs/functions/get-started

// // // exports.helloWorld = onRequest((request, response) => {
// // //   logger.info("Hello logs!", {structuredData: true});
// // //   response.send("Hello from Firebase!");
// // // });
// // const { onRequest } = require("firebase-functions/v2/https");
// // const logger = require("firebase-functions/logger");
// // const admin = require("firebase-admin");

// // admin.initializeApp();
// // const db = admin.firestore();

// // // Function to create a new NFC tag
// // exports.createNfcTag = onRequest(async (request, response) => {
// //     const { uid, tagId, tagData } = request.body; // Assuming tagData contains relevant NFC data

// //     try {
// //         await db.collection('nfcTags').add({
// //             uid,
// //             tagId,
// //             tagData,
// //             createdAt: admin.firestore.FieldValue.serverTimestamp()
// //         });
// //         logger.info("NFC tag created successfully.", { structuredData: true });
// //         response.status(201).send('NFC tag created successfully.');
// //     } catch (error) {
// //         logger.error("Error creating NFC tag:", error);
// //         response.status(500).send('Error creating NFC tag.');
// //     }
// // });

// // // Function to retrieve NFC tags for a specific user
// // exports.getNfcTags = onRequest(async (request, response) => {
// //     const { uid } = request.query;

// //     try {
// //         const snapshot = await db.collection('nfcTags').where('uid', '==', uid).get();
// //         const tags = [];
        
// //         snapshot.forEach(doc => {
// //             tags.push({ id: doc.id, ...doc.data() });
// //         });
        
// //         logger.info("Retrieved NFC tags successfully.", { structuredData: true });
// //         response.status(200).json(tags);
// //     } catch (error) {
// //         logger.error("Error retrieving NFC tags:", error);
// //         response.status(500).send('Error retrieving NFC tags.');
// //     }
// // });

// // // Function to authenticate a user (using email and password)
// // exports.createUser = onRequest(async (request, response) => {
// //     const { email, password } = request.body;

// //     try {
// //         const userRecord = await admin.auth().createUser({
// //             email,
// //             password
// //         });
// //         logger.info(`User created: ${userRecord.uid}`, { structuredData: true });
// //         response.status(201).send(`User created: ${userRecord.uid}`);
// //     } catch (error) {
// //         logger.error("Error creating new user:", error);
// //         response.status(500).send('Error creating user.');
// //     }
// // });

// // // Function to sign in a user
// // exports.signInUser = onRequest(async (request, response) => {
// //     const { email, password } = request.body;

// //     try {
// //         const user = await admin.auth().getUserByEmail(email);
// //         // Note: Password verification must be done on the client-side
// //         logger.info(`User signed in: ${user.uid}`, { structuredData: true });
// //         response.status(200).send(`User signed in: ${user.uid}`);
// //     } catch (error) {
// //         logger.error("Error signing in user:", error);
// //         response.status(500).send('Error signing in user.');
// //     }
// // });
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics,getFirestore } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBdUwyWj2dAwNeS43VfgpGdeu2KHy8ci_4",
//   authDomain: "backend-8b85c.firebaseapp.com",
//   projectId: "backend-8b85c",
//   storageBucket: "backend-8b85c.appspot.com",
//   messagingSenderId: "1095233648966",
//   appId: "1:1095233648966:web:53ba96a12040f5b77f0d47",
//   measurementId: "G-ZHW59DYCPV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// const db=getFirestore();
// const db=firebase.firestore();

// const colRef=collection(db,'kids_details')
// getDocs(colRef)
//     .then((snapshot)=>{
//         let details=[]
//         snapshot.docs.forEach((doc)=>{
//             details.push({...doc.data(),id: doc.id})
//         })

//         console.log(details)
//     })
//     .catch(err=>{
//         console.log(err.message) 
//     })
