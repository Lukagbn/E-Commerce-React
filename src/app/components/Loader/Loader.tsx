import React from "react";
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loading}>
      <div className={styles.dotContainer}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
}

export default Loader;
