"use client";
import React from "react";
import styles from "./FileList.module.css";
import FileListHeader from "./FileListHeader";
import FileListItem from "./FileListItem";

function FileList({ files, onView }) {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" }); // Oct
    const year = date.getFullYear().toString().slice(-2); // last 2 digits
    const hours = date.getHours().toString().padStart(2, "0"); // 09
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 04
  
    return `${day} ${month} ${year} | ${hours}:${minutes}`;
  };
  
  const fileData = [
    {
      id: 1,
      name: "THE SIDEPOD S2 EPISODE 15",
      dateTime: "25 Oct 23 | 09:04",
    },
    {
      id: 2,
      name: "THE SIDEPOD S2 EPISODE 17",
      dateTime: "27 Oct 23 | 11:08",
    },
    {
      id: 3,
      name: "THE SIDEPOD S2 EPISODE 20",
      dateTime: "31 Oct 23 | 20:28",
    },
  ];

  return (
    <section className={styles.container}>
      <article className={styles.fileListCard}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Your Files</h1>
          <FileListHeader />
          {files.map((file, index) => (
            <FileListItem
              key={file._id}
              file={file}
              number={index + 1} // give sequential numbers like 1,2,3
              fileName={file.name || file.title} // depending on your backend schema
              dateTime={formatDate(file.createdAt)} // format createdAt
              onView={()=>onView(file)}
              isLast={index === files.length - 1}
            />
          ))}

        </div>
      </article>
    </section>
  );
}

export default FileList;
