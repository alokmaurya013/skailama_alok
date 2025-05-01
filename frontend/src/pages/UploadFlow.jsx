import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UploadFlow.module.css";
import UserComponent from "../components/UserComponent";

import Sidebar from "../components/SingleProject/Sidebar";
import Header from "../components/SingleProject/Header";
import PodcastOptions from "../components/SingleProject/PodcastOptions";
import FileUploader from "../components/SingleProject/FileUploader";
import PodcastPopUp from "../components/SingleProject/PodcastPopUp";
import FileList from "../components/SingleProject/FileList";
import View from "../components/EditTranscript/View";
import EmptyState from "../components/EmptyState"; // ✅ Import EmptyState

function UploadFlow() {
  const { id: projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [showView, setShowView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const [projectTitle, setProjectTitle] = useState("Sample Project");
  const [activeSection, setActiveSection] = useState("Add your podcast");

  // Fetch user & project data
  useEffect(() => {
    const fetchUserAndProject = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user
        const userRes = await fetch("http://localhost:5000/api/auth/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData);

        // Fetch project
        const projectRes = await fetch(`http://localhost:5000/api/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const projectData = await projectRes.json();
        console.log(projectData)
        setProjectTitle(projectData?.title || "Sample Project");
      } catch (err) {
        console.error("Error fetching user/project:", err);
      }
    };

    fetchUserAndProject();
  }, [projectId]);

  // Fetch podcast list for this user and project
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/podcasts/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setFileList(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
        setLoading(false);
      }
    };

    if (activeSection === "Add your podcast") {
      fetchPodcasts();
    }
  }, [projectId, activeSection, showModal]); // re-fetch after modal closes

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const handleModalSubmit = () => {
    setShowModal(false);
    // Podcast fetch will auto-run due to `showModal` in dependency array
  };

  const handleViewClick = (file) => {
    setSelectedFile(file);
    setShowView(true);
  };

  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
    if (sectionName !== "Add your podcast") {
      setShowView(false);
      setFileList([]);
    }
  };

  return (
    <main className={styles.mainContainer}>
      <Sidebar user={user} onSectionChange={handleSectionChange} />

      <section className={styles.contentContainer}>
        <Header projectTitle={projectTitle} activeSection={activeSection} />

        {activeSection === "Add your podcast" && !showView ? (
          <>
            <h1 className={styles.pageTitle}>Add Podcast</h1>
            <PodcastOptions onOpenModal={openModal} />
            {loading ? (
              <p>Loading...</p>
            ) : fileList.length === 0 ? (
              <FileUploader />
            ) : (
              <FileList files={fileList} onView={handleViewClick} />
            )}
          </>
        ) : activeSection === "Add your podcast" && showView ? (
          <View file={selectedFile} setShowView={setShowView} />
        ) : activeSection === "User Profile" ? (
                 <UserComponent user={user} />
        ):(
          <EmptyState message="This section is under construction or empty" />
        )}
      </section>

      {showModal && (
        <PodcastPopUp onClose={closeModal} onSubmit={handleModalSubmit} />
      )}
    </main>
  );
}

export default UploadFlow;

