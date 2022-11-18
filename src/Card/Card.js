import React from "react";
import styles from "./Card.module.css";
import { Remainder, Comment } from "../assets/index";
const Card = ({ title, city, fullText }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {title?.length > 20 ? (
          <span className={styles.title}>{title.slice(0, 20)}...</span>
        ) : (
          <span className={styles.title}>{title}</span>
        )}
        <span className={styles.city}>{city}</span>
        {fullText?.length > 30 ? (
          <span className={styles.fullText}>{fullText.slice(0, 30)}...</span>
        ) : (
          <span className={styles.fullText}>{fullText}</span>
        )}
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
