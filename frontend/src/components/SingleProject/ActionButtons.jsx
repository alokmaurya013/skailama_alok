"use client";
import React from "react";
import styles from "./ActionButtons.module.css";

function ActionButtons({onView}) {
  return (
    <div className={styles.actionContainer}>
      <button className={styles.viewButton} onClick={onView}>View</button>
      <div className={styles.divider} />
      <button className={styles.deleteButton}>Delete</button>
    </div>
  );
}

export default ActionButtons;
