"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ViewHeader.module.css";

function ViewHeader({ setIsEditMode ,setShowView}) {
  const navigate=useNavigate();
  const handleEditClick = () => {
    setIsEditMode(true); // Switch to edit mode
  };
  
  const handleBackClick = () => {
      setShowView(false);
    // or use: router.push("/upload") to go specifically to the upload flow
  };

  return (
    <header className={styles.container}>
      <div className={styles.titleContainer} onClick={handleBackClick} style={{cursor:"pointer"}}>
        <img
          src="/ep_back.png"
          alt="Edit transcript icon"
          className={styles.icon}
        />
        <h1 className={styles.title}>Edit Transcript</h1>
      </div>
      <button
        className={styles.editButton}
        onClick={handleEditClick}
        aria-label="Edit transcript"
      >
        Edit
      </button>
    </header>
  );
}

export default ViewHeader;
