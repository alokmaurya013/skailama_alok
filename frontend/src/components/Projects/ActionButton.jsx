// components/common/ActionButton.js
"use client";
import React, { useState } from "react";
import CreateProjectPopup from "../Home/CreateProjectPopup";
import styles from "../../pages/HomePage.module.css"; // Create separate CSS or reuse HomePage.module.css

const ActionButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button className={styles.actionButton} onClick={handleOpenPopup}>
        <img
          src="/plus_icon.png"
          alt="Create_Icon"
          className={styles.buttonIcon}
        />
        <span className={styles.buttonText}>Create New Project</span>
      </button>

      {isPopupOpen && <CreateProjectPopup onClose={handleClosePopup} />}
    </>
  );
};

export default ActionButton;
