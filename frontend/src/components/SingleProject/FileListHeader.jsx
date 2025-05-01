import React from "react";
import styles from "./FileListHeader.module.css";

function FileListHeader() {
  return (
    <div className={styles.headerContainer}>
      <span className={styles.headerItem}>No.</span>
      <span className={styles.headerItem}>Name</span>
      <span className={styles.headerItem}>Upload Date & Time</span>
      <span className={styles.headerItem}>Action</span>
    </div>
  );
}

export default FileListHeader;
