import React, { useEffect, useRef } from "react";
import styles from "./Card.module.css";
import { Remainder, Comment } from "../assets/index";
const Card = ({ title, city, fullText, callback }) => {

  const cardRef = useRef(null);

  const shortTitles = title?.length > 20 ? `${title.slice(0, 20)}...` : title;
  const shortFullText = fullText?.length > 30 ? `${fullText.slice(0, 30)}...` : fullText;

  useEffect(() => {
    const cardElement = cardRef.current;
    const handleMouseMove = (event) => { 
      console.log(event)
      // const {clientX, clientY} = event;
      // // console.log("x - ", event.clientX )
      // // console.log("y - ", event.clientY )
      // const {top,left,right,bottom} = cardRef.current.getBoundingClientRect();
      // if((clientX >= left && clientX <= right) && (clientY >= top && clientY <= bottom)) {
      //   console.log("true")
      // } else {
        // callback()
      //   console.log("false")
      // }
      callback()
    };

    cardElement.addEventListener('mouseleave', handleMouseMove);

    return () => {
      cardElement.removeEventListener(
        'mouseleave',
        handleMouseMove
      );
    };
  }, [callback]);

  return (
    <div className={styles.card} ref={cardRef}>
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
