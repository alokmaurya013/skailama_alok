// Sidebar.js
import React from "react";
import styles from "./Sidebar.module.css";
import UserProfile from "./UserProfile";

function Sidebar({ user, onSectionChange }) {
  return (
    <nav className={styles.sidebar}>
      <img src="/quesLogo2.png" alt="Logo" className={styles.logo} />

      <div
        className={styles.navItem}
        onClick={() => onSectionChange("Add your podcast")}
      >
        <img src="/add_icon.png" alt="Podcast icon" className={styles.navIcon} />
        <span className={styles.navText}>Add your Podcast(s)</span>
      </div>

      <div className={styles.contentContainer}>
        <div
          className={styles.menuItem}
          onClick={() => onSectionChange("Create & Repurpose")}
        >
          <img src="/icon1.png" alt="Create icon" className={styles.menuIcon} />
          <h2 className={styles.menuText}>Create & Repurpose</h2>
        </div>

        <div
          className={styles.menuItem}
          onClick={() => onSectionChange("Podcast Widget")}
        >
          <img src="/icon2.png" alt="Widget icon" className={styles.menuIcon2} />
          <h2 className={styles.menuText}>Podcast Widget</h2>
        </div>

        <div
          className={styles.menuItem}
          onClick={() => onSectionChange("Upgrade")}
        >
          <img src="/icon3.jpeg" alt="Upgrade icon" className={styles.upgradeIcon} />
          <h2 className={styles.menuText}>Upgrade</h2>
        </div>

        <hr className={styles.divider} />
      </div>

      <div className={styles.bottomSection}>
        <UserProfile user={user} onSectionChange={onSectionChange}/>
      </div>
    </nav>
  );
}

export default Sidebar;
