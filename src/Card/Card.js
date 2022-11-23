import React from "react";
import styles from "./Card.module.css";
import { Remainder, Comment } from "../assets/index";
import Tooltip from "../Tooltip/Tooltip";
const Card = ({ title, city, fullText }) => {
  const shortTitles = title?.length > 20 ? `${title.slice(0, 20)}...` : title;
  const shortFullText =
    fullText?.length > 30 ? `${fullText.slice(0, 30)}...` : fullText;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <span className={styles.title}>{shortTitles}</span>
        <span className={styles.city}>{city}</span>
        <span className={styles.fullText}>{shortFullText}</span>
      </div>
      <div className={styles.actions}>
        {/* <div className={styles.remainder}>
            <img src={Remainder} alt="addRemainder" />
          </div> */}
        {/* <div className={styles.remainder}> */}
          <Tooltip
            text="Add Reminder"
            imageSource={Remainder}
            alternativeText="addRemainder"
          />
        {/* </div> */}
        {/* <div className={styles.addComment}>
            <img src={Comment} alt="addComment" />
          </div> */}
        {/* <div className={styles.addComment}> */}
          <Tooltip
            text="Add Comment"
            imageSource={Comment}
            alternativeText="addComment"
          />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Card;
