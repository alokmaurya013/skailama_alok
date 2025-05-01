import React from "react";
import styles from "./PodcastOptions.module.css";
import OptionCard from "./OptionCard";

function PodcastOptions({ onOpenModal }) {
  const options = [
    {
      title: "RSS Feed",
      description: "Lorem ipsum dolor sit.\nDolor lorem sit.",
      iconSrc: "/image1.png",
    },
    {
      title: "Youtube Video",
      description: "Lorem ipsum dolor sit.\nDolor lorem sit.",
      iconSrc: "/image2.png",
    },
    {
      title: "Upload Files",
      description: "Lorem ipsum dolor sit.\nDolor lorem sit.",
      iconSrc: "/image3.png",
    },
  ];

  return (
    <section className={styles.optionsContainer}>
      <div className={styles.optionsGrid}>
        {options.map((option, index) => (
          <OptionCard
            key={index}
            title={option.title}
            description={option.description}
            iconSrc={option.iconSrc}
            onClick={() => onOpenModal(option)}
          />
        ))}
      </div>
    </section>
  );
}

export default PodcastOptions;
