// src/CreateNfcTag.js
import React, { useState } from "react";
import axios from "axios";

const CreateNfcTag = () => {
    const [tagId, setTagId] = useState("");
    const [tagData, setTagData] = useState("");
    const [message, setMessage] = useState("");

    const handleCreateNfcTag = async () => {
        try {
            const response = await axios.post("http://localhost:3000/createNfcTag", {
                tagId,
                tagData,
            });
            setMessage(`NFC Tag created: ${response.data}`);
        } catch (error) {
            console.error("Error creating NFC tag:", error);
            setMessage("Error creating NFC tag: " + error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div>
            <h2>Create NFC Tag</h2>
            <input
                type="text"
                placeholder="Tag ID"
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tag Data"
                value={tagData}
                onChange={(e) => setTagData(e.target.value)}
            />
            <button onClick={handleCreateNfcTag}>Create NFC Tag</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateNfcTag;
