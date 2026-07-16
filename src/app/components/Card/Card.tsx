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
  className?: string;
};

function Card({ id, title, price, rating, images, className }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      <Link href={`/products/details/${id}`}>
        <Image
          src={images[0]}
          alt="product"
          width={295}
          height={298}
          sizes="(min-width: 1400px) 295px, 200px"
        />
      </Link>
      <p>{title}</p>
      <StarRate ratingNumber={true} rating={rating} />
      <h3>${price}</h3>
    </div>
  );
}

export default Card;
