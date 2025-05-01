import React from "react";
import styles from "./Header.module.css";

function Header({ projectTitle = "Sample Project", activeSection = "Add your podcast" }) {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <img src="/home.png" alt="Home icon" className={styles.breadcrumbIcon} />
        <div className={styles.breadcrumbText}>
          <span className={styles.boldText}>Home Page / {projectTitle} / </span>
          <span className={styles.highlightedText}>{activeSection}</span>
        </div>
      </div>

      <div className={styles.profileIcons}>
        <img src="/bell.png" alt="Profile icon" className={styles.profileIcon} />
        <img src="/logout.png" alt="Settings icon" className={styles.profileIcon} />
      </div>
    </header>
  );
}

export default Header;
