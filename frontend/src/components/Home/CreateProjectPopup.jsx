"use client";
import React, { useState } from "react";
import styles from "./CreateProjectPopup.module.css";
import { useNavigate } from "react-router-dom";

// Header component
function CreateProjectHeader() {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.title}>Create Project</h1>
    </header>
  );
}

// Input field component
function ProjectNameInput({ value, onChange }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="project-name" className={styles.label}>
        Enter Project Name:
      </label>
      <input
        id="project-name"
        type="text"
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder="Type here"
      />
    </div>
  );
}

// Footer with Cancel and Create buttons
function ActionButtons({ onCancel, onCreate, loading }) {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.cancelButton} onClick={onCancel} disabled={loading}>
        Cancel
      </button>
      <button className={styles.createButton} onClick={onCreate} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}

// Main CreateProjectPopup component
function CreateProjectPopup({ onClose }) {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (projectName.trim() === "") {
      alert("Please enter a project name!");
      return;
    }
  
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // or however you store the JWT
  
      const response = await fetch("http://localhost:5000/api/createproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // attach token here
        },
        body: JSON.stringify({ title: projectName }), // fix: must be 'title' not 'name'
      });
  
      if (!response.ok) {
        throw new Error("Failed to create project");
      }
  
      const result = await response.json();
      console.log("Project Created:", result);
      onClose(); // optional
      navigate("/projects");
    } catch (error) {
      console.error(error);
      alert("Error creating project. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <CreateProjectHeader />
        <ProjectNameInput
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <ActionButtons
          onCancel={onClose}
          onCreate={handleCreate}
          loading={loading}
        />
      </div>
    </section>
  );
}

export default CreateProjectPopup;
