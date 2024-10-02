// import React, { useState } from "react";
// import { db } from './index'; // Firestore configuration
// import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods

// function Emergency() {
//   const [authStatus, setAuthStatus] = useState(null); // Track authentication status
//   const [nfcId, setNfcId] = useState(""); // Track NFC ID input
//   const [data, setData] = useState(null); // Track retrieved data
//   const [hospital, setHospital] = useState({ name: "", code: "" }); // Track hospital input
//   const [error, setError] = useState(""); // Track error messages

//   const handleAuthentication = async () => {
//     const hospitalRef = collection(db, "hospital");
//     const q = query(hospitalRef, 
//       where("name", "==", hospital.name), 
//       where("code", "==", hospital.code)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         setAuthStatus(true); 
//         setError("");
//       } else {
//         setAuthStatus(false); 
//         setError("Authentication failed: Invalid hospital name or code");
//       }
//     } catch (error) {
//       console.error("Error during authentication:", error);
//       setError("Error during authentication");
//     }
//   };

//   const handleEmergencyData = async () => {
//     if (authStatus) {
//       const studentRef = collection(db, "students");
//       const q = query(studentRef, where("nfcid", "==", nfcId)); 

//       try {
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           const studentData = querySnapshot.docs[0].data(); 
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
//     } else {
//       setError("Please authenticate first!");
//     }
//   };

//   return (
//     <div>
//       <h1>Hospital Authentication</h1>
//       {/* Hospital Name Input */}
//       <input
//         type="text"
//         placeholder="Hospital Name"
//         value={hospital.name}
//         onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
//       />
//       {/* Hospital Code Input */}
//       <input
//         type="text"
//         placeholder="Hospital Code"
//         value={hospital.code}
//         onChange={(e) => setHospital({ ...hospital, code: e.target.value })}
//       />
//       {/* Authenticate Button */}
//       <button onClick={handleAuthentication}>Authenticate</button>

//       {/* Error Message Display */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {/* If Authenticated, Display NFC Input Section */}
//       {authStatus === true && (
//         <div>
//           <h2>Enter NFC ID</h2>
//           {/* NFC ID Input */}
//           <input
//             type="text"
//             placeholder="Enter NFC ID"
//             value={nfcId}
//             onChange={(e) => setNfcId(e.target.value)}
//           />
//           {/* Get Emergency Data Button */}
//           <button onClick={handleEmergencyData}>Get Emergency Data</button>

//           {/* Display Emergency Data */}
//           {data && (
//             <div>
//               <p><strong>Name:</strong> {data.name || 'N/A'}</p>
//               <p><strong>Blood Group:</strong> {data.blood_group || 'N/A'}</p>
//               <p><strong>Address:</strong> {data.address || 'N/A'}</p>
//               <p><strong>Father's Contact:</strong> 
//                 {data.father_contact ? (
//                   <a href={`tel:${data.father_contact}`}>{data.father_contact}</a>
//                 ) : 'N/A'}
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Display Authentication Failed Message */}
//       {authStatus === false && <p>Authentication Failed!</p>}
//     </div>
//   );
// }

// export default Emergency;
import React, { useState, useEffect } from "react";
import { db } from './index';
import { collection, getDocs, query, where } from "firebase/firestore";
import './styles/emergency.css'

function Emergency({ nfcId }) {
    const [authStatus, setAuthStatus] = useState(null);
    const [data, setData] = useState(null);
    const [hospital, setHospital] = useState({ name: "", code: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        if (nfcId && authStatus) {
            handleEmergencyData();
        }
    }, [nfcId, authStatus]);

    const handleAuthentication = async () => {
        const hospitalRef = collection(db, "hospital");
        const q = query(hospitalRef, 
            where("name", "==", hospital.name), 
            where("code", "==", hospital.code)
        );

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setAuthStatus(true);
                setError("");
            } else {
                setAuthStatus(false);
                setError("Authentication failed: Invalid hospital name or code");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setError("Error during authentication");
        }
    };

    const handleEmergencyData = async () => {
        if (authStatus) {
            const studentRef = collection(db, "students");
            const q = query(studentRef, where("nfcid", "==", nfcId));

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const studentData = querySnapshot.docs[0].data();
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
            <input
                type="text"
                placeholder="Hospital Name"
                value={hospital.name}
                onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Hospital Code"
                value={hospital.code}
                onChange={(e) => setHospital({ ...hospital, code: e.target.value })}
            />
            <button onClick={handleAuthentication}>Authenticate</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {authStatus === true && (
                <div>
                    <h2>Emergency Data</h2>
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

            {authStatus === false && <p>Authentication Failed!</p>}
        </div>
    );
}

export default Emergency;