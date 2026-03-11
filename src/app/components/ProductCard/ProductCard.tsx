import React from "react";
import styles from "./ProductCard.module.scss";
import layout from "@/app/layout.module.scss";
import Card from "../Card/Card";
import { CardProps } from "../Card/Card";
import Link from "next/link";

type productCard = {
  className?: string;
  title: string;
  cards: CardProps[] | null;
};

function ProductCard({ className, title, cards }: productCard) {
  return (
    <section className={`${styles.newArrivals} ${className}`}>
      <h2>{title}</h2>
      <div className={styles.newArrivalsWrapper}>
        <div className={styles.newArrivalsContainer}>
          {cards?.map((item) => (
            <Card
              id={item.id}
              title={item.title}
              price={item.price}
              images={item.images}
              rating={item.rating}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <Link
        className={`${layout.innerContainer} ${styles.viewAll}`}
        href={"/products/categories"}
      >
        View All
      </Link>
    </section>
  );
}

export default ProductCard;
