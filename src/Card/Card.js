import React from "react";
import styles from "./Card.module.css";
import { Remainder, Comment } from "../assets/index";
const Card = ({ title, city, fullText }) => {

  const shortTitles = title?.length > 20 ? `${title.slice(0, 20)}...` : title;
  const shortFullText = fullText?.length > 30 ? `${fullText.slice(0, 30)}...` : fullText;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <span className={styles.title}>{shortTitles}</span>
        <span className={styles.city}>{city}</span>
        <span className={styles.fullText}>{shortFullText}</span>
      </div>
      <div className={styles.actions}>
        <div className={styles.remainder}>
          <img src={Remainder} alt="addRemainder" />
        </div>
        <div className={styles.addComment}>
          <img src={Comment} alt="addComment" />
        </div>
      </div>
    </div>
  );
};

export default Card;
