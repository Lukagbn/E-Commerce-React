import React from "react";
import Image from "next/image";
import styles from "./Card.module.scss";
import Link from "next/link";
import StarRate from "../StarRate/StarRate";

export type CardProps = {
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
      <StarRate ratingNumber={true} rating={rating} />
      <h3>${price}</h3>
    </div>
  );
}

export default Card;
