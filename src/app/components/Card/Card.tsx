import React from "react";
import Image from "next/image";
import styles from "./Card.module.scss";
import Link from "next/link";

type CardProps = {
  id: number;
  title: string;
  price: number;
  rating: number;
  images: string[];
};

function Card({ title, price, rating, images, id }: CardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/products/details/${id}`}>
        <Image src={`${images[0]}`} width={198} height={200} alt="product" />
      </Link>
      <p>{title}</p>
      <div className={styles.starContainer}>
        <span className={styles.star}>★★★★★</span>
        <span className={styles.starRate}> {rating} </span>
      </div>
      <h3>${price}</h3>
    </div>
  );
}

export default Card;
