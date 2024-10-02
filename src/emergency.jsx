// // import React, { useState } from "react";
// // import axios from "axios";

// // function Emergency() {
// //   const [authStatus, setAuthStatus] = useState(null);
// //   const [nfcId, setNfcId] = useState("");
// //   const [data, setData] = useState(null);
// //   const [hospital, setHospital] = useState({ name: "", code: "" });
// //   const [error, setError] = useState("");

// //   const handleAuthentication = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:3000/authentication`, {
// //         params: { name: hospital.name, code: hospital.code },
// //       });
// //       if (response.status === 200) {
// //         setAuthStatus(true);
// //         setError("");
// //       }
// //     } catch (error) {
// //       setAuthStatus(false);
// //       setError(error.response?.data?.message || "Authentication failed");
// //       console.error("Authentication failed:", error);
// //     }
// //   };

// //   const handleEmergencyData = async () => {
// //     if (authStatus) {
// //       try {
// //         const response = await axios.get(`http://localhost:3000/emergency`, {
// //           params: { nfcid: nfcId },
// //         });
// //         console.log("Emergency data response:", response.data);
// //         setData(response.data[0]); // Assuming the API returns an array with one object
// //         setError("");
// //       } catch (error) {
// //         console.error("Error fetching emergency data:", error);
// //         setError(error.response?.data?.message || "Error fetching emergency data");
// //         setData(null);
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Hospital Authentication</h1>
// //       <input
// //         type="text"
// //         placeholder="Hospital Name"
// //         value={hospital.name}
// //         onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
// //       />
// //       <input
// //         type="text"
// //         placeholder="Hospital Code"
// //         value={hospital.code}
// //         onChange={(e) => setHospital({ ...hospital, code: e.target.value })}
// //       />
// //       <button onClick={handleAuthentication}>Authenticate</button>

// //       {error && <p style={{ color: 'red' }}>{error}</p>}

// //       {authStatus === true && (
// //         <div>
// //           <h2>Enter NFC ID</h2>
// //           <input
// //             type="text"
// //             placeholder="Enter NFC ID"
// //             value={nfcId}
// //             onChange={(e) => setNfcId(e.target.value)}
// //           />
// //           <button onClick={handleEmergencyData}>Get Emergency Data</button>

// //           {data && (
// //             <div>
// //               <p>Name: {data.name || 'N/A'}</p>
// //               <p>Blood Group: {data.blood_group || 'N/A'}</p>
// //               <p>Address: {data.address || 'N/A'}</p>
// //               <p>
// //                 Father's Contact:{" "}
// //                 {data.father_contact ? (
// //                   <a href={`tel:${data.father_contact}`}>{data.father_contact}</a>
// //                 ) : 'N/A'}
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {authStatus === false && <p>Authentication Failed!</p>}
// //     </div>
// //   );
// // }

// // export default Emergency;
// import React, { useState } from "react";
// import { db } from './index'; // Import your Firestore configuration
// import { collection, getDocs, query, where } from "firebase/firestore"; // Import necessary Firestore methods

// function Emergency() {
//   const [authStatus, setAuthStatus] = useState(null);
//   const [nfcId, setNfcId] = useState("");
//   const [data, setData] = useState(null);
//   const [hospital, setHospital] = useState({ name: "", code: "" });
//   const [error, setError] = useState("");

//   // Function to handle hospital authentication
//   const handleAuthentication = async () => {
//     // Reference to the hospitals collection in Firestore
//     const hospitalRef = collection(db, "hospital");
//     // Create a query to find the hospital by name and code
//     const q = query(hospitalRef, 
//       where("name", "==", hospital.name), 
//       where("code", "==", hospital.code)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         setAuthStatus(true); // Set auth status to true if hospital found
//         setError("");
//       } else {
//         setAuthStatus(false); // Set auth status to false if no hospital found
//         setError("Authentication failed: Invalid hospital name or code");
//       }
//     } catch (error) {
//       console.error("Error during authentication:", error);
//       setError("Error during authentication");
//     }
//   };

//   // Function to handle fetching emergency data
//   const handleEmergencyData = async () => {
//     if (authStatus) {
//       // Reference to the students collection in Firestore
//       const studentRef = collection(db, "students");
//       // Create a query to find the student by NFC ID
//       const q = query(studentRef, where("nfcId", "==", nfcId));

//       try {
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           const studentData = querySnapshot.docs[0].data(); // Get the first document's data
//           setData(studentData);
//           setError("");
//         } else {
//           setError("No data found for this NFC ID!");
//           setData(null);
//         }
//       } catch (error) {
//         console.error("Error fetching emergency data:", error);
//         setError("Error fetching emergency data");
//         setData(null);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Hospital Authentication</h1>
//       <input
//         type="text"
//         placeholder="Hospital Name"
//         value={hospital.name}
//         onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Hospital Code"
//         value={hospital.code}
//         onChange={(e) => setHospital({ ...hospital, code: e.target.value })}
//       />
//       <button onClick={handleAuthentication}>Authenticate</button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {authStatus === true && (
//         <div>
//           <h2>Enter NFC ID</h2>
//           <input
//             type="text"
//             placeholder="Enter NFC ID"
//             value={nfcId}
//             onChange={(e) => setNfcId(e.target.value)}
//           />
//           <button onClick={handleEmergencyData}>Get Emergency Data</button>

//           {data && (
//             <div>
//               <p>Name: {data.name || 'N/A'}</p>
//               <p>Blood Group: {data.blood_group || 'N/A'}</p>
//               <p>Address: {data.address || 'N/A'}</p>
//               <p>
//                 Father's Contact:{" "}
//                 {data.father_contact ? (
//                   <a href={`tel:${data.father_contact}`}>{data.father_contact}</a>
//                 ) : 'N/A'}
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {authStatus === false && <p>Authentication Failed!</p>}
//     </div>
//   );
// }

// export default Emergency;
import React, { useState } from "react";
import { db } from './index'; // Firestore configuration
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods

function Emergency() {
  const [authStatus, setAuthStatus] = useState(null); // Track authentication status
  const [nfcId, setNfcId] = useState(""); // Track NFC ID input
  const [data, setData] = useState(null); // Track retrieved data
  const [hospital, setHospital] = useState({ name: "", code: "" }); // Track hospital input
  const [error, setError] = useState(""); // Track error messages

  // Function to authenticate the hospital
  const handleAuthentication = async () => {
    // Reference to the hospital collection in Firestore
    const hospitalRef = collection(db, "hospital");
    // Query Firestore to find a hospital with the given name and code
    const q = query(hospitalRef, 
      where("name", "==", hospital.name), 
      where("code", "==", hospital.code)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setAuthStatus(true); // Hospital found, authentication successful
        setError("");
      } else {
        setAuthStatus(false); // Authentication failed
        setError("Authentication failed: Invalid hospital name or code");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setError("Error during authentication");
    }
  };

  // Function to fetch emergency data based on the NFC ID
  const handleEmergencyData = async () => {
    if (authStatus) {
      // Reference to the students collection in Firestore
      const studentRef = collection(db, "students");
      // Query Firestore to find a student with the given NFC ID
      const q = query(studentRef, where("nfcid", "==", nfcId)); // Match the field name to the one in Firestore

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const studentData = querySnapshot.docs[0].data(); // Get the first document's data
          setData(studentData);
          setError("");
        } else {
          setError("No data found for this NFC ID!");
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching emergency data:", error);
        setError("Error fetching emergency data");
        setData(null);
      }
    } else {
      setError("Please authenticate first!");
    }
  };

  return (
    <div>
      <h1>Hospital Authentication</h1>
      {/* Hospital Name Input */}
      <input
        type="text"
        placeholder="Hospital Name"
        value={hospital.name}
        onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
      />
      {/* Hospital Code Input */}
      <input
        type="text"
        placeholder="Hospital Code"
        value={hospital.code}
        onChange={(e) => setHospital({ ...hospital, code: e.target.value })}
      />
      {/* Authenticate Button */}
      <button onClick={handleAuthentication}>Authenticate</button>

      {/* Error Message Display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* If Authenticated, Display NFC Input Section */}
      {authStatus === true && (
        <div>
          <h2>Enter NFC ID</h2>
          {/* NFC ID Input */}
          <input
            type="text"
            placeholder="Enter NFC ID"
            value={nfcId}
            onChange={(e) => setNfcId(e.target.value)}
          />
          {/* Get Emergency Data Button */}
          <button onClick={handleEmergencyData}>Get Emergency Data</button>

          {/* Display Emergency Data */}
          {data && (
            <div>
              <p><strong>Name:</strong> {data.name || 'N/A'}</p>
              <p><strong>Blood Group:</strong> {data.blood_group || 'N/A'}</p>
              <p><strong>Address:</strong> {data.address || 'N/A'}</p>
              <p><strong>Father's Contact:</strong> 
                {data.father_contact ? (
                  <a href={`tel:${data.father_contact}`}>{data.father_contact}</a>
                ) : 'N/A'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Display Authentication Failed Message */}
      {authStatus === false && <p>Authentication Failed!</p>}
    </div>
  );
}

export default Emergency;
