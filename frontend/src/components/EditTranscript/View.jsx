"use client";
import React, { useState, useEffect } from "react";
import styles from "./View.module.css";
import ViewHeader from "./ViewHeader";
import EditHeader from "./EditHeader";
import ViewContent from "./ViewContent";

function View({ file ,setShowView}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    transcript: "",
    id: "",
  });

  // Initialize editedData when file changes
  useEffect(() => {
    if (file) {
      setEditedData({
        name: file.name || "",
        transcript: file.transcript || "",
        id: file._id || "", // Ensure you have file._id for backend identification
      });
    }
  }, [file]);

  // Update edited data from child
  const handleContentChange = (updated) => {
    setEditedData((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return (
    <div className={styles.viewsContainer}>
      {isEditMode ? (
        <EditHeader
          setIsEditMode={setIsEditMode}
          editedData={editedData}
        />
      ) : (
        <ViewHeader setIsEditMode={setIsEditMode} setShowView={setShowView}/>
      )}
      <ViewContent
        isEditMode={isEditMode}
        file={editedData} // Passing all edited data to ViewContent
        onContentChange={handleContentChange} // This will update the content as it's edited
      />
    </div>
  );
}

export default View;
