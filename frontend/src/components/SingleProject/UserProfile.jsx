import React from "react";
import styles from "./UserProfile.module.css";

function UserProfile({ user ,onSectionChange}) {
  return (
    <aside className={styles.userProfileContainer}>
      {/* Top-right icon */}
      <div className={styles.helpIconContainer}>
        <img src="/left_icon.png" alt="Left icon" className={styles.helpButtonIcon} />
      </div>

      {/* Help row */}
      <div className={styles.helpRow} onClick={()=>onSectionChange("Help")}>
        <img src="/cog.png" alt="Cog icon" className={styles.helpInfoIcon} />
        <h2 className={styles.helpText}>Help</h2>
      </div>

      <hr className={styles.profileDivider} />

      {/* Profile row */}
      <div className={styles.profileRow} onClick={()=>onSectionChange("User Profile")}>
        <img src="/user.png" alt="User avatar" className={styles.userAvatar} />
        <div className={styles.profileDetails}>
          <h3 className={styles.username}>{user?.name || "Username"}</h3>
          <p className={styles.userEmail}>{user?.email || "user@example.com"}</p>
        </div>
      </div>
    </aside>
  );
}

export default UserProfile;
