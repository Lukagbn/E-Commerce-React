"use client";
import React, { useEffect, useState } from "react";
import Card, { CardProps } from "@/app/components/Card/Card";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";

function page() {
  const [categoryProducts, setCategoryProducts] = useState<CardProps[] | null>(
    null,
  );
  const [price, setPrice] = useState<number>(1000);
  const [starRate, setStarRate] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [aside, setAside] = useState(false);
  const [appliedPrice, setAppliedPrice] = useState<number>(1000);
  const [appliedStarRate, setAppliedStarRate] = useState<number>(0);
  const [appliedTitle, setAppliedTitle] = useState<string>("");
  const [loadProducts, setLoadProducts] = useState(20);
  const fetchCategoryProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${loadProducts}`,
    );
    const result = await res.json();
    setCategoryProducts(result.products);
  };
  useEffect(() => {
    fetchCategoryProducts();
  }, [loadProducts]);
  useEffect(() => {
    if (aside) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [aside]);
  if (!categoryProducts) return <div>loading...</div>;
  return (
    <>
      <div className={`${aside ? styles.overlay : ""}`}></div>
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
                max={1000}
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
              <button onClick={() => setAside(true)}>filter</button>
            </div>
            <div className={styles.cardContainer}>
              {categoryProducts
                ?.filter((product) => product.price <= appliedPrice)
                .filter((product) => product.rating >= appliedStarRate)
                .filter((product) =>
                  appliedTitle === ""
                    ? true
                    : product.title
                        .toLowerCase()
                        .includes(appliedTitle.toLowerCase()),
                )
                .map((card, index) => (
                  <Card
                    key={index}
                    id={card.id}
                    title={card.title}
                    price={card.price}
                    rating={card.rating}
                    images={card.images}
                  />
                ))}
            </div>
            <button
              className={styles.loadMoreBtn}
              onClick={() => setLoadProducts(loadProducts + 20)}
            >
              Load More
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default page;
