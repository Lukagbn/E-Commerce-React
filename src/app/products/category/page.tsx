"use client";
import { useEffect, useState } from "react";
import Card, { CardProps } from "@/app/components/Card/Card";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";
import CategoriesGroup from "@/app/components/CategoryGroup/CategoryGroup";
import CardLoader from "@/app/components/Skeletons/CardLoader/CardLoader";

function Page() {
  const [categoryProducts, setCategoryProducts] = useState<CardProps[] | null>(
    null,
  );
  const [price, setPrice] = useState<number>(1000);
  const [starRate, setStarRate] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [aside, setAside] = useState(false);
  const [appliedPrice, setAppliedPrice] = useState<number>(10000);
  const [appliedStarRate, setAppliedStarRate] = useState<number>(0);
  const [appliedTitle, setAppliedTitle] = useState<string>("");
  const [serverError, setServerError] = useState<boolean>(false);
  const [loadProducts, setLoadProducts] = useState(9);

  const filteredProducts = (categoryProducts ?? [])
    .filter((product) => product.price <= appliedPrice)
    .filter((product) => product.rating >= appliedStarRate)
    .filter((product) =>
      appliedTitle === ""
        ? true
        : product.title.toLowerCase().includes(appliedTitle.toLowerCase()),
    );

  useEffect(() => {
    let cancelled = false;
    setServerError(false);

    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-react-db.onrender.com/products/?page=1&limit=${loadProducts}`,
        );

        if (!res.ok) {
          throw new Error(`Products request failed with status ${res.status}`);
        }

        const result = await res.json();
        if (!Array.isArray(result.products)) {
          throw new Error("Products response did not contain a products list");
        }

        if (!cancelled) {
          setCategoryProducts(result.products);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        if (!cancelled) {
          setServerError(true);
        }
      }
    };

    fetchCategoryProducts();
    return () => {
      cancelled = true;
    };
  }, [loadProducts]);
  useEffect(() => {
    if (aside) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [aside]);

  return (
    <>
      <div
        onClick={() => {
          setAside(false);
        }}
        className={`${aside ? styles.overlay : ""}`}
      ></div>
      <main>
        <div className={`${styles.categoriesWrapper} ${layout.innerContainer}`}>
          <aside className={`${aside ? styles.asideActive : styles.aside}`}>
            <div className={styles.filterHeader}>
              <h3>Filters</h3>
              <div
                className={styles.filterCloseBtn}
                onClick={() => {
                  setAside(false);
                }}
              >
                X
              </div>
            </div>
            <hr />
            <div className={styles.filterProperty}>
              <h4>Price</h4>
              <input
                type="range"
                name="range"
                id="range"
                min={0}
                max={10000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <span>${price}</span>
            </div>
            <hr />
            <div className={styles.filterProperty}>
              <h4>Star Rating</h4>
              <input
                type="number"
                name="starRate"
                id="starRate"
                value={starRate}
                min={0}
                max={5}
                onChange={(e) => setStarRate(Number(e.target.value))}
              />
            </div>
            <hr />
            <div className={styles.filterProperty}>
              <h4>Search By Title</h4>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(String(e.target.value))}
              />
            </div>
            <hr />
            <CategoriesGroup />
            <hr />
            <button
              className={styles.filterApplyBtn}
              onClick={() => {
                setAppliedPrice(price);
                setAppliedStarRate(starRate);
                setAppliedTitle(title);
              }}
            >
              Apply Filter
            </button>
          </aside>
          <div className={styles.categoryContainer}>
            <div className={styles.categoryHeader}>
              <h2>All</h2>
              <button
                className={styles.filterBtn}
                onClick={() => setAside(true)}
              >
                <svg
                  fill="#000000"
                  width="24"
                  height="24"
                  viewBox="-2 -4 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                  className="jam jam-settings-alt"
                >
                  <path d="M9 12V1a1 1 0 1 1 2 0v11h1a1 1 0 0 1 0 2h-1v1a1 1 0 0 1-2 0v-1H8a1 1 0 0 1 0-2h1zm7-10V1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1v11a1 1 0 0 1-2 0V4h-1a1 1 0 0 1 0-2h1zM4 5h1a1 1 0 1 1 0 2H4v8a1 1 0 0 1-2 0V7H1a1 1 0 1 1 0-2h1V1a1 1 0 1 1 2 0v4z" />
                </svg>
              </button>
            </div>
            <div className={styles.cardContainer}>
              {serverError ? (
                <p className={styles.feedbackMessage}>
                  Something went wrong, Please try again!
                </p>
              ) : categoryProducts === null ? (
                Array.from({ length: 9 }).map((_, index) => (
                  <CardLoader key={index} />
                ))
              ) : filteredProducts.length === 0 ? (
                <p className={styles.feedbackMessage}>No products found</p>
              ) : (
                filteredProducts.map((card) => (
                  <Card
                    key={card._id}
                    _id={card._id}
                    title={card.title}
                    price={card.price}
                    rating={card.rating}
                    images={card.images}
                    className={styles.categoryCard}
                  />
                ))
              )}
            </div>
            {!serverError &&
              categoryProducts !== null &&
              categoryProducts.length >= loadProducts && (
                <button
                  className={styles.loadMoreBtn}
                  onClick={() => setLoadProducts((prev) => prev + 9)}
                >
                  Load More
                </button>
              )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Page;
