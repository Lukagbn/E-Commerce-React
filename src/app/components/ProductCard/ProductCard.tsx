import styles from "./ProductCard.module.scss";
import layout from "@/app/layout.module.scss";
import Card from "../Card/Card";
import { CardProps } from "../Card/Card";
import Link from "next/link";
import CardLoader from "../Skeletons/CardLoader/CardLoader";

type productCard = {
  className?: string;
  title: string;
  cards: CardProps[] | null;
  error?: boolean;
};

function ProductCard({ className, title, cards, error = false }: productCard) {
  return (
    <section className={`${styles.newArrivals} ${className}`}>
      <h2>{title}</h2>
      <div className={styles.newArrivalsWrapper}>
        {error ? (
          <p className={styles.feedbackMessage}>
            Something went wrong, Please try again!
          </p>
        ) : cards === null ? (
          <div className={styles.newArrivalsContainer}>
            {Array.from({ length: 4 }).map((_, index) => (
              <CardLoader key={index} />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <p className={styles.feedbackMessage}>No products found</p>
        ) : (
          <div className={styles.newArrivalsContainer}>
            {cards.map((item) => (
              <Card
                _id={item._id}
                title={item.title}
                price={item.price}
                images={item.images}
                rating={item.rating}
                key={item._id}
              />
            ))}
          </div>
        )}
      </div>
      <Link
        className={`${layout.innerContainer} ${styles.viewAll}`}
        href={"/products/category"}
      >
        View All
      </Link>
    </section>
  );
}

export default ProductCard;
