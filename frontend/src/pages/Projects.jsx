"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import this
import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ for navigation

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User might not be logged in.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/projects", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className={styles.css3}>
      <div className={styles.div}>
        <Header />
        <ProjectsHeader />
        <div className={styles.cards}>
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className={styles.cardGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              fileCount={project.fileCount}
              createdAt={project.createdAt}
              onClick={() => navigate(`/project/${project._id}`)} // ✅ navigate on click
            />
          ))}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className={styles.div2}>
      <img src="quesLogo2.png" alt="Logo" className={styles.img} />
      <nav className={styles.div3}>
        <img src="setting_icon.png" alt="Navigation icon" className={styles.img2} />
        <img src="notifications.png" alt="User profile" className={styles.img3} />
      </nav>
    </header>
  );
}

function ProjectsHeader() {
  return (
    <div className={styles.div4}>
      <h1 className={styles.projects}>Projects</h1>
      <button className={styles.div5}>
        <img src="plus_icon.png" alt="Add icon" className={styles.img4} />
        <span className={styles.createNewProject}>Create New Project</span>
      </button>
      {/* <ActionButton /> */}
    </div>
  );
}

function ProjectCard({ title, fileCount, createdAt, onClick }) {
  return (
    <article className={styles.div6} onClick={onClick} style={{ cursor: "pointer" }}>
      <div className={styles.div7}>
        <div className={styles.column}>
          <div className={styles.sp}>{title?.slice(0,2).toUpperCase()}</div>
        </div>
        <div className={styles.column2}>
          <div className={styles.div8}>
            <h2 className={styles.sampleProject}>{title}</h2>
            <p className={styles.files}>
              {fileCount} {fileCount === 1 ? "File" : "Files"}
            </p>
            <time className={styles.lasteditedaweekago}>
              Created at {new Date(createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Projects;
