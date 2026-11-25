"use client";
import Image from "next/image";
import layout from "./layout.module.scss";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import { CardProps } from "./components/Card/Card";
import Reviews from "./components/Reviews/Reviews";

function Page() {
  const [arrivals, setArrivals] = useState<CardProps[] | null>(null);
  const [topSelling, settopSelling] = useState<CardProps[] | null>(null);
  const [arrivalsError, setArrivalsError] = useState(false);
  const [topSellingError, setTopSellingError] = useState(false);

  async function topSellingFetch() {
    try {
      const res = await fetch(
        `https://e-commerce-react-db.onrender.com/products?page=2&limit=4`,
      );
      if (!res.ok) {
        throw new Error(`Top-selling request failed with status ${res.status}`);
      }

      const response = await res.json();
      if (!Array.isArray(response.products)) {
        throw new Error("Top-selling response did not contain a products list");
      }

      settopSelling(response.products);
    } catch (error) {
      console.error("Failed to load top-selling products:", error);
      setTopSellingError(true);
    }
  }
  async function arrivalfetch() {
    try {
      const res = await fetch(
        `https://e-commerce-react-db.onrender.com/products?page=1&limit=4`,
      );
      if (!res.ok) {
        throw new Error(`New-arrivals request failed with status ${res.status}`);
      }

      const response = await res.json();
      if (!Array.isArray(response.products)) {
        throw new Error("New-arrivals response did not contain a products list");
      }

      setArrivals(response.products);
    } catch (error) {
      console.error("Failed to load new-arrivals products:", error);
      setArrivalsError(true);
    }
  }

  useEffect(() => {
    arrivalfetch();
    topSellingFetch();
  }, []);
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
      <ProductCard
        title="new arrivals"
        cards={arrivals}
        error={arrivalsError}
      />
      <section className={`${styles.horizontalLine} ${layout.innerContainer}`}>
        <hr />
      </section>
      <ProductCard
        title="top selling"
        cards={topSelling}
        error={topSellingError}
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
      <Reviews />
    </main>
  );
}

export default Page;
