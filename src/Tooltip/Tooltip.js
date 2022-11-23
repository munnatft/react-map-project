import React from "react";
import styles from "./Tooltip.module.css";
const Tooltip = ({ index, text = "", imageSource, alternativeText = "" }) => {
  return (
    <div key={index} className={styles.icon}>
      <img src={imageSource} alt={alternativeText} />
      <span className={styles.iconToolTip}>{text}</span>
    </div>
  );
};
export default Tooltip;
