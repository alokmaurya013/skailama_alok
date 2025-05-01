"use client";
import React from "react";
import styles from "./EditHeader.module.css";

// Left side: title + icon
const EditTranscriptHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <img src="/ep_back.png" alt="Edit_icon" className={styles.headerIcon} />
      <h1 className={styles.headerTitle}>Edit Transcript</h1>
    </div>
  );
};

// Right side: action buttons
const ActionButtons = ({ setIsEditMode, editedData }) => {
  const handleDiscard = () => {
    setIsEditMode(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token"); // Or use cookies if set with HttpOnly

      if (!token) {
        alert("You are not authorized to make changes.");
        return;
      }

      if (!editedData.id) {
        alert("No file ID provided. Unable to save.");
        return;
      }

      // Assuming `editedData.id` is the ID of the file to be updated
      const res = await fetch(`http://localhost:5000/api/podcast/${editedData.id}`, {
        method: "PUT", // Use PUT for updating the file
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: JSON.stringify({
          name: editedData.name,
          transcript: editedData.transcript,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save transcript");
      }

      console.log("Transcript saved successfully");
      setIsEditMode(false);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <div className={styles.actionButtonsContainer}>
      <button className={styles.discardButton} onClick={handleDiscard}>
        Discard
      </button>
      <button className={styles.saveButton} onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

// Main EditHeader component
function EditHeader({ setIsEditMode, editedData }) {
  return (
    <header className={styles.container}>
      <EditTranscriptHeader />
      <ActionButtons
        setIsEditMode={setIsEditMode}
        editedData={editedData}
      />
    </header>
  );
}

export default EditHeader;
