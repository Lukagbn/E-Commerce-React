"use client";
import Image from "next/image";
import layout from "../layout.module.scss";
import styles from "./page.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Card from "../components/Card/Card";
import StarRate from "../components/StarRate/StarRate";
import ProductCard from "../components/ProductCard/ProductCard";
import { CardProps } from "../components/Card/Card";

type reviewsType = {
  id: number;
  reviews: string[];
};
type Review = {
  reviewerName: string;
  comment: string;
  rating: number;
};
function page() {
  const [arrivals, setArrivals] = useState<CardProps[] | null>(null);
  const [topSelling, settopSelling] = useState<CardProps[] | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrivalfetch = async () => {
    const arrivalsResponse = await fetch(
      "https://dummyjson.com/products?limit=4&skip=4&select=title,images,price,rating",
    );
    const arrivalsData = await arrivalsResponse.json();
    const topSellingResponse = await fetch(
      "https://dummyjson.com/products?limit=4&skip=10&select=title,images,price,rating",
    );
    const topSellingData = await topSellingResponse.json();
    const reviewResponse = await fetch(
      "https://dummyjson.com/products?limit=3",
    );
    const reviewData = await reviewResponse.json();
    const allReviews = reviewData.products.flatMap(
      (product: reviewsType) => product.reviews,
    );
    setReviews(allReviews);
    setArrivals(arrivalsData.products);
    settopSelling(topSellingData.products);
  };
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
    arrivalfetch();
  }, []);
  // useEffect(() => {
  //   console.log(reviews.filter((review) => review.rating > 3));
  // }, [reviews]);
  if (!arrivals) {
    return <div>Loading...</div>;
  }
  return (
    <main className={layout.container}>
      <section className={styles.mainHeadingContainer}>
        <div
          className={`${styles.mainHeadingContainerWrapper} ${layout.innerContainer}`}
        >
          <div className={styles.headingWrapper}>
            <h1 className={styles.mainHeader}>
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <button>Shop Now</button>
            <div className={styles.overviewContainer}>
              <div className={styles.overviewBox}>
                <h3>200+</h3>
                <p>International Brands</p>
              </div>
              <Image
                src={"/separateLine.png"}
                alt="line"
                width={1}
                height={52}
              ></Image>
              <div className={styles.overviewBox}>
                <h3>2,000+</h3>
                <p>High-Quality Products</p>
              </div>
              <div className={styles.overviewBox}>
                <h3>30,000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <div className={styles.imgWrapper}>
              <Image
                className={styles.mainImage}
                src={"/mainImage.svg"}
                width={390}
                height={448}
                alt="main image"
              ></Image>
              <Image
                src={"/mainStar.svg"}
                className={styles.rightStar}
                width={76}
                height={76}
                alt="star"
              ></Image>
              <Image
                src={"/mainStar.svg"}
                className={styles.leftStar}
                width={44}
                height={44}
                alt="star"
              ></Image>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.brandContainer}>
        <Image
          src={"/versace.webp"}
          width={116.74}
          height={23.25}
          alt="versace"
        ></Image>
        <Image
          src={"/zara.webp"}
          width={63.83}
          height={26.65}
          alt="zara"
        ></Image>
        <Image
          src={"/gucci.webp"}
          width={109.39}
          height={25.24}
          alt="gucci"
        ></Image>
        <Image src={"/prada.webp"} width={127} height={21} alt="prada"></Image>
        <Image
          src={"/calvinKlein.webp"}
          width={134.84}
          height={21.75}
          alt="calvin klein"
        ></Image>
      </section>
      <ProductCard title="new arrivals" cards={arrivals} />
      <section className={`${styles.horizontalLine} ${layout.innerContainer}`}>
        <hr />
      </section>
      <ProductCard
        title="top selling"
        cards={topSelling}
        className="topSelling"
      />
      <section
        className={`${styles.browseCategories} ${layout.innerContainer}`}
      >
        <div className={styles.categoriesContainer}>
          <h2>
            BROWSE BY <span>dress STYLE</span>
          </h2>
          <div className={styles.categoriesWrapper}>
            <div className={styles.categoriesBox}>
              <Link href={"/products/categories/beauty"}>
                <Image
                  src={"/casual.webp"}
                  width={310}
                  height={190}
                  alt="categories casual"
                />
              </Link>
            </div>
            <div className={styles.categoriesBox}>
              <Link href={"#"}>
                <Image
                  src={"/formal.webp"}
                  width={310}
                  height={190}
                  alt="categories formal"
                />
              </Link>
            </div>
            <div className={styles.categoriesBox}>
              <Link href={"#"}>
                <Image
                  src={"/party.webp"}
                  width={310}
                  height={190}
                  alt="categories party"
                />
              </Link>
            </div>
            <div className={styles.categoriesBox}>
              <Link href={"#"}>
                <Image
                  src={"/gym.webp"}
                  width={310}
                  height={190}
                  alt="categories gym"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.feedBack} ${layout.innerContainer}`}>
        <div className={styles.feedBackContainer}>
          <div className={styles.feedBackHeaderWrapper}>
            <h2>
              OUR HAPPY <span>CUSTOMERS</span>
            </h2>
            <div className={styles.feedBackBtnContainer}>
              <button className={styles.arrowBtn} onClick={() => scrollLeft()}>
                <Image
                  src={"/arrowLeft.svg"}
                  width={24}
                  height={24}
                  alt="arrow left"
                />
              </button>
              <button className={styles.arrowBtn} onClick={() => scrollRight()}>
                <Image
                  src={"/arrowRight.svg"}
                  width={24}
                  height={24}
                  alt="arrow right"
                />
              </button>
            </div>
          </div>
          <div className={styles.reviewsWrapper} ref={containerRef}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <StarRate ratingNumber={false} rating={review.rating} />
                <h4>
                  {review.reviewerName}{" "}
                  <Image
                    src={"/check.png"}
                    width={19}
                    height={19}
                    alt="check mark"
                  />
                </h4>
                <p>"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
