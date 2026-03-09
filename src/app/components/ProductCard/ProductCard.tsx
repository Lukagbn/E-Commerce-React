import React from "react";
import styles from "./ProductCard.module.scss";
import layout from "@/app/layout.module.scss";
import Card from "../Card/Card";
import { CardProps } from "../Card/Card";

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
      <button className={layout.innerContainer}>View All</button>
    </section>
  );
}

export default ProductCard;
