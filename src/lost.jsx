// import React, { useState } from "react";
// import { db } from './index'; // Import your Firestore configuration
// import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore methods

// function Lost() {
//     const [data, setData] = useState(null); // Track the fetched data
//     const [nfcId, setNfcId] = useState(""); // Track the NFC ID input
//     const [error, setError] = useState(""); // Track error messages

//     // Function to handle search by NFC ID
//     const handleSearch = async () => {
//         console.log("Search button clicked. NFC ID entered:", nfcId);
//         try {
//             // Create a query against the collection to find the matching NFC ID
//             const q = query(collection(db, "kids_details"), where("nfcid", "==", nfcId));
//             const querySnapshot = await getDocs(q); // Execute the query

//             if (!querySnapshot.empty) {
//                 // Assuming there's only one match, you can use `doc.data()` to set the data
//                 const doc = querySnapshot.docs[0];
//                 setData(doc.data()); // Set the data from the matched document
//                 setError(""); // Clear any previous errors
//             } else {
//                 setError("No such child found!"); // Show error if no document is found
//                 setData(null); // Clear any previous data
//             }

//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setData(null); // Clear any data if there's an error
//             setError("An error occurred while fetching data.");
//         }
//     };

//     return (
//         <div>
//             <h1>Lost Child Information</h1>
//             {/* Input field for NFC ID */}
//             <input
//                 type="text"
//                 placeholder="Enter NFC ID"
//                 value={nfcId}
//                 onChange={(e) => setNfcId(e.target.value)}
//             />
//             {/* Button to trigger search */}
//             <button onClick={handleSearch}>Search</button>

//             {/* Display error message, if any */}
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             {/* Display data if it exists */}
//             {data && (
//                 <div>
//                     <p><strong>Name:</strong> {data.name || 'N/A'}</p>
//                     <p><strong>Address:</strong> {data.address || 'N/A'}</p>
//                     <p><strong>Father's Name:</strong> {data.father_name || 'N/A'}</p>
//                     <p><strong>Phone Number:</strong> {data.phone_number || 'N/A'}</p>
//                     <p><strong>Blood Group:</strong> {data.blood_group || 'N/A'}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Lost;
import React, { useState, useEffect } from "react";
import { db } from './index';
import { collection, query, where, getDocs } from "firebase/firestore";
import './styles/lost.css'
function Lost({ nfcId }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (nfcId) {
            handleSearch();
        }
    }, [nfcId]);

    const handleSearch = async () => {
        try {
            const q = query(collection(db, "kids_details"), where("nfcid", "==", nfcId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                setData(doc.data());
                setError("");
            } else {
                setError("No such child found!");
                setData(null);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData(null);
            setError("An error occurred while fetching data.");
        }
    };

    return (
        <div>
            <h1>Lost Child Information</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    <p><strong>Name:</strong> {data.name || 'N/A'}</p>
                    <p><strong>Address:</strong> {data.address || 'N/A'}</p>
                    <p><strong>Father's Name:</strong> {data.father_name || 'N/A'}</p>
                    <p><strong>Phone Number:</strong> {data.phone_number || 'N/A'}</p>
                    <p><strong>Blood Group:</strong> {data.blood_group || 'N/A'}</p>
                </div>
            )}
        </div>
    );
}

export default Lost;