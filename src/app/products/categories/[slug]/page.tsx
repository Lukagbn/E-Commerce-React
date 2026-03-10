"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card, { CardProps } from "@/app/components/Card/Card";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";

function page() {
  const { slug } = useParams();
  const [categoryProducts, setCategoryProducts] = useState<CardProps[] | null>(
    null,
  );
  const [price, setPrice] = useState<number>(1000);
  const [starRate, setStarRate] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [aside, setAside] = useState(false);
  const fetchCategoryProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products/category/${slug}`);
    const result = await res.json();
    setCategoryProducts(result.products);
  };
  useEffect(() => {
    fetchCategoryProducts();
  }, []);
  useEffect(() => {
    console.log(categoryProducts);
  }, [categoryProducts]);
  if (!categoryProducts) return <div>loading...</div>;
  return (
    <>
      <main>
        <aside className={`${aside ? styles.asideActive : styles.aside}`}>
          <div className={styles.filterHeader}>
            <h3>Filters</h3>
            <div
              className={styles.filterCloseBtn}
              onClick={() => setAside(!aside)}
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
            <span>{price}</span>
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
        </aside>
        <div className={`${styles.categoryHeader} ${layout.innerContainer}`}>
          <h2>{slug}</h2>
          <button onClick={() => setAside(!aside)}>filter</button>
        </div>
        <div className={`${styles.cardContainer} ${layout.innerContainer}`}>
          {categoryProducts
            ?.filter((product) => product.price <= price)
            .filter((product) => product.rating >= starRate)
            .filter((product) =>
              title === ""
                ? true
                : product.title.toLowerCase().includes(title.toLowerCase()),
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
      </main>
    </>
  );
}

export default page;
