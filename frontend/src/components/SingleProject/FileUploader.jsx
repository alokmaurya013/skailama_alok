"use client";
import React, { useState } from "react";

import styles from "./FileUploader.module.css";

function FileUploader() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <section
      className={styles.uploaderContainer}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.uploaderContent}>
        <img src="/cloud_upload.png" alt="Upload icon" className={styles.uploadIcon} />
        <p className={styles.uploadInstructions}>
          Select a file or drag and drop here (Podcast Media or Transcription
          Text)
        </p>
        <p className={styles.supportedFormats}>
          MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
        </p>
        <button className={styles.selectButton}>
          <span className={styles.buttonText}>Select File</span>
        </button>
      </div>
    </section>
  );
}

export default FileUploader;
