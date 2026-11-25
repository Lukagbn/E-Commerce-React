import React, { useEffect, useRef, useState } from "react";
import styles from "./Reviews.module.scss";
import layout from "@/app/layout.module.scss";
import LeftArrow from "../Arrows/LeftArrow";
import RightArrow from "../Arrows/RightArrow";
import StarRate from "../StarRate/StarRate";

interface Review {
  reviewerName: string;
  comment: string;
  userName: string;
  rating: number;
}

interface ReviewApiResponse {
  allReviews: Review[];
}

function Reviews() {
  const [leftArrowHover, setLeftArrowHover] = useState<boolean>(false);
  const [rightArrowHover, setRightArrowHover] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  async function fetchReviews() {
    try {
      const res = await fetch(
        "https://e-commerce-react-db.onrender.com/reviews/top",
      );
      const response: ReviewApiResponse = await res.json();
      setReviews(response.allReviews);
    } catch (error) {
      console.log("error:", error);
    }
  }

  function scrollLeft() {
    if (!containerRef.current) return;
    const isAtStart = containerRef.current.scrollLeft === 0;
    if (isAtStart) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    } else {
      containerRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  }
  function scrollRight() {
    if (!containerRef.current) return;
    const isAtEnd =
      containerRef.current.scrollLeft + containerRef.current?.offsetWidth >=
      containerRef.current.scrollWidth;
    if (isAtEnd) {
      containerRef.current.scrollTo({
        left: -containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    } else {
      containerRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section className={`${styles.feedBack} ${layout.innerContainer}`}>
      <div className={styles.feedBackContainer}>
        <div className={styles.feedBackHeaderWrapper}>
          <h3>
            OUR HAPPY <span>CUSTOMERS</span>
          </h3>
          <div className={styles.feedBackBtnContainer}>
            <button
              className={styles.arrowBtn}
              onClick={() => scrollLeft()}
              onMouseEnter={() => setLeftArrowHover(true)}
              onMouseLeave={() => setLeftArrowHover(false)}
              aria-label="left arrow button"
            >
              <LeftArrow hovered={leftArrowHover} />
            </button>
            <button
              className={styles.arrowBtn}
              onClick={() => scrollRight()}
              onMouseEnter={() => setRightArrowHover(true)}
              onMouseLeave={() => setRightArrowHover(false)}
              aria-label="right arrow button"
            >
              <RightArrow hovered={rightArrowHover} />
            </button>
          </div>
        </div>

        <div className={styles.reviewsWrapper} ref={containerRef}>
          {reviews.length > 0
            ? reviews.map((review, index) => (
                <div key={index} className={styles.reviewCard}>
                  <StarRate ratingNumber={false} rating={review.rating} />
                  <h3>{review.userName} </h3>
                  <p>"{review.comment}"</p>
                </div>
              ))
            : Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.reviewCardLoader}>
                  <StarRate ratingNumber={false} rating={5} />
                  <h3 className={styles.title}></h3>
                  <p className={styles.comment}></p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
