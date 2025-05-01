"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./PodcastPopUp.module.css";

function UploadHeader({ onClose }) {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.titleWrapper}>
        <img src="/y1.png" alt="YouTube icon" className={styles.youtubeIcon} />
        <h1 className={styles.uploadTitle}>Upload from Youtube</h1>
      </div>
      <img
        src="/close.png"
        alt="Close"
        className={styles.closeIcon}
        onClick={onClose}
      />
    </header>
  );
}

function InputField({ label, id, value, onChange }) {
  return (
    <>
      <label htmlFor={id} className={styles.nameLabel}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={styles.nameInput}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

function TextareaField({ label, id, value, onChange }) {
  return (
    <>
      <label htmlFor={id} className={styles.transcriptLabel}>
        {label}
      </label>
      <textarea
        id={id}
        className={styles.transcriptTextarea}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

function UploadButton() {
  return (
    <button type="submit" className={styles.uploadButton}>
      Upload
    </button>
  );
}

function PodcastPopUp({ onClose }) {
  const { id: projectId } = useParams(); // projectId from URL

  const [formData, setFormData] = useState({
    name: "",
    transcript: "",
  });

  useEffect(() => {
    setFormData({ name: "", transcript: "" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/createpodcast", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          transcript: formData.transcript,
          project: projectId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create podcast: ${response.status}`);
      }

      const data = await response.json();
      console.log("Podcast created:", data);

      onClose(); // Close modal after successful upload
    } catch (error) {
      console.error("Error creating podcast:", error);
    }
  };

  return (
    <section className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <UploadHeader onClose={onClose} />
        <InputField
          label="Name"
          id="name-input"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <TextareaField
          label="Transcript"
          id="transcript-input"
          value={formData.transcript}
          onChange={(e) =>
            setFormData({ ...formData, transcript: e.target.value })
          }
        />
        <UploadButton />
      </form>
    </section>
  );
}

export default PodcastPopUp;
