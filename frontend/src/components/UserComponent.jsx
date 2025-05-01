import React from "react";
import styles from "./UserComponent.module.css";

function UserComponent({ user }) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.container1}>
           <div className={styles.titleContainer}>
             <img
               src="/ep_back.png"
               alt="account"
               className={styles.icon}
             />
             <h1 className={styles.title}>Account Settings</h1>
           </div>
         </header>

      {/* User Info Section */}
      <div className={styles.userInfo}>
        <img src="/user.png" alt="User Icon" className={styles.userIcon} />
        <div className={styles.user}>
        <h2 className={styles.userName}>{user?.name || "User Name"}</h2>
        <p className={styles.userEmail}>{user?.email || "user@example.com"}</p>
        </div>
      </div>

      {/* Subscription Section */}
      <div className={styles.subscription}>
        <h3 className={styles.subscriptionTitle}>Subscription</h3>
        <p className={styles.noPlanText}>Oops! You don’t have any active plan.</p>
        <button className={styles.upgradeBtn}>Upgrade Now</button>
      </div>
    </div>
  );
}

export default UserComponent;
