import React, { useRef } from "react";
import styles from "./ReviewsLoader.module.scss";
import StarRate from "@/app/components/StarRate/StarRate";

function ReviewsLoader() {
  const containerRef = useRef<HTMLDivElement>(null);

  return <div className={styles.reviewsWrapper} ref={containerRef}></div>;
}

export default ReviewsLoader;
