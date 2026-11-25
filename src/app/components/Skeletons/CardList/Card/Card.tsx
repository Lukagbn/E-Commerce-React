import React from "react";
import styles from "./Card.module.scss";

function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.body}>
        <div className={styles.title}></div>
        <div className={styles.stars}>★★★★★</div>
        <div className={styles.price}></div>
      </div>
    </div>
  );
}

export default Card;
