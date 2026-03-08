import React from "react";
import styles from "./StarRate.module.scss";

type starType = {
  rating: number;
  className?: string;
};

function StarRate({ rating, className }: starType) {
  return (
    <div className={`${styles.starContainer} ${className}`}>
      <div className={styles.star}>
        <span
          className={styles.starInner}
          style={{ width: `${(rating / 5) * 100}%` }}
        >
          ★★★★★
        </span>
        <span className={styles.starOuter}>★★★★★</span>
      </div>
      <span className={styles.starRate}>{rating}</span>
    </div>
  );
}

export default StarRate;
