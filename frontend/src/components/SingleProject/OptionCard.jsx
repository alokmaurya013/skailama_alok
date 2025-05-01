import React from "react";

import styles from "./OptionCard.module.css";


function OptionCard({ title, description, iconSrc, onClick }) {
  return (
    <article className={styles.optionCard} onClick={onClick}>
      <div className={styles.cardContent}>
        <div className={styles.cardTextContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>
            {description.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < description.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
        <div className={styles.cardIconContainer}>
          <img
            src={iconSrc}
            alt={`${title} icon`}
            className={styles.cardIcon}
          />
        </div>
      </div>
    </article>
  );
}

export default OptionCard;
