"use client";
import React from "react";
import styles from "./ViewContent.module.css";

function ViewContent({ isEditMode, file, onContentChange }) {
  const handleTitleChange = (e) => {
    onContentChange({ name: e.target.value });
  };

  const handleTranscriptChange = (e) => {
    onContentChange({ transcript: e.target.value });
  };

  return (
    <section className={styles.container}>
      <article className={styles.textContent}>
        {isEditMode ? (
          <>
            <input
              type="text"
              className={`${styles.heading} ${styles.editableInput}`}
              value={file.name || ""}
              onChange={handleTitleChange}
              placeholder="Enter title"
            />
            <textarea
              className={styles.textarea}
              value={file.transcript || ""}
              onChange={handleTranscriptChange}
              placeholder="Enter transcript"
            />
          </>
        ) : (
          <>
            <h1 className={styles.heading}>{file.name}</h1>
            <p className={styles.paragraph}>{file.transcript}</p>
          </>
        )}
      </article>
    </section>
  );
}

export default ViewContent;
