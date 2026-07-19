"use client";
import Image from "next/image";
import layout from "./layout.module.scss";
import styles from "./page.module.scss";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StarRate from "./components/StarRate/StarRate";
import ProductCard from "./components/ProductCard/ProductCard";
import { CardProps } from "./components/Card/Card";
import Loader from "./components/Loader/Loader";
import LeftArrow from "./components/Arrows/LeftArrow";
import RightArrow from "./components/Arrows/RightArrow";

type reviewsType = {
  id: number;
  reviews: string[];
};
type Review = {
  reviewerName: string;
  comment: string;
  userName: string;
  rating: number;
};
function page() {
  const [arrivals, setArrivals] = useState<CardProps[] | null>(null);
  const [topSelling, settopSelling] = useState<CardProps[] | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leftArrowHover, setLeftArrowHover] = useState<boolean>(false);
  const [rightArrowHover, setRightArrowHover] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrivalfetch = async () => {
    const arrivalsResponse = await fetch(
      `https://e-commerce-react-db.onrender.com/products?page=1&limit=4`,
    );
    const arrivalsData = await arrivalsResponse.json();
    const topSellingResponse = await fetch(
      `https://e-commerce-react-db.onrender.com/products?page=2&limit=4`,
    );
    const topSellingData = await topSellingResponse.json();
    const reviewResponse = await fetch(
      "https://e-commerce-react-db.onrender.com/reviews/top",
    );
    const reviewData = await reviewResponse.json();

    setReviews(reviewData.allReviews);
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
  if (!arrivals) {
    return <Loader />;
  }
  return (
    <main className={layout.container}>
      <link
        rel="preload"
        href="/mainImage.webp"
        as="image"
        fetchPriority="high"
      />
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
            <Link href={"/products/category"} className={styles.shopNow}>
              Shop Now
            </Link>
            <div className={styles.overviewContainer}>
              <div className={styles.overviewBox}>
                <h2>200+</h2>
                <p>International Brands</p>
              </div>
              <Image
                src={"/separateLine.png"}
                alt="line"
                width={1}
                height={52}
              ></Image>
              <div className={styles.overviewBox}>
                <h2>2,000+</h2>
                <p>High-Quality Products</p>
              </div>
              <div className={styles.overviewBox}>
                <h2>30,000+</h2>
                <p>Happy Customers</p>
              </div>
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
        className={styles.topSelling}
      />
      <section
        className={`${styles.browseCategories} ${layout.innerContainer}`}
      >
        <div className={styles.categoriesContainer}>
          <h2>
            BROWSE BY <span>Category</span>
          </h2>
          <div className={styles.categoriesWrapper}>
            <div className={styles.categoriesBox}>
              <Link href={"/products/category/beauty"}>
                <Image
                  quality={95}
                  src={"/beauty.webp"}
                  width={310}
                  height={190}
                  alt="categories casual"
                />
              </Link>
              <span>beauty</span>
            </div>
            <div className={styles.categoriesBox}>
              <Link href={"/products/category/smartphones"}>
                <Image
                  quality={95}
                  src={"/smartphones.webp"}
                  width={310}
                  height={190}
                  alt="categories formal"
                />
              </Link>
              <span>smartphones</span>
            </div>
            <div className={styles.categoriesBox}>
              <Link href={"/products/category/fragrances"}>
                <Image
                  quality={95}
                  src={"/fragrances.webp"}
                  width={310}
                  height={190}
                  alt="categories party"
                />
              </Link>
              <span>fragrances</span>
            </div>
            <div className={styles.categoriesBox}>
              <Link href={"/products/category/sunglasses"}>
                <Image
                  quality={95}
                  src={"/sunglasses.webp"}
                  width={310}
                  height={190}
                  alt="categories gym"
                />
              </Link>
              <span>sunglasses</span>
            </div>
          </div>
        </div>
      </section>
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
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <StarRate ratingNumber={false} rating={review.rating} />
                <h3>{review.userName} </h3>
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
