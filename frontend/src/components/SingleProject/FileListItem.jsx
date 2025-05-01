import React from "react";
import styles from "./FileListItem.module.css";
import ActionButtons from "./ActionButtons";

function FileListItem({ number, file,fileName, dateTime ,onView,isLast}) {
  return (
    <>
      <div className={styles.fileItemContainer}>
        <span className={styles.itemNumber}>{number}</span>
        <span className={styles.fileName}>{fileName}</span>
        <span className={styles.dateTime}>{dateTime}</span>
        <ActionButtons onView={() => onView(file)} />
      </div>
      {!isLast && <div className={styles.divider} />}
    </>
  );
}

export default FileListItem;
