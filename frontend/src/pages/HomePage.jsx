"use client";
import React from "react";
import styles from "./HomePage.module.css";
import ActionButton from "../components/Projects/ActionButton";


// Header component with logo and icons
const Header = () => {
  return (
    <header className={styles.header}>
      <img src="quesLogo2.png" alt="Company Logo" className={styles.logo} />
      <div className={styles.iconsContainer}>
        <img src="setting_icon.png" alt="Icon" className={styles.iconSmall} />
        <img src="notifications.png" alt="Icon" className={styles.iconLarge} />
      </div>
    </header>
  );
};

// Project Creation Section with title, image and description
const ProjectCreationSection = () => {
  return (
    <>
      <h1 className={styles.title}>Create a New Project</h1>
      <img
        src="Group16.png"
        alt="Project_Creation_Illustration"
        className={styles.illustration}
      />
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in
      </p>
    </>
  );
};



// Main component that combines all sections
function HomePage() {

  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        <Header />
        <div className={styles.container1}>
        <ProjectCreationSection />
        <ActionButton />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
