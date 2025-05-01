// components/EmptyState.js
import React from "react";
import styles from "./EmptyState.module.css";

function EmptyState({ message = "Feature not implemented" }) {
  return (
    <div className={styles.emptyContainer}>
      <p className={styles.emptyText}>{message}</p>
    </div>
  );
}

export default EmptyState;
