"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";
import StarRate from "@/app/components/StarRate/StarRate";

type singleProductType = {
  id: string;
  title: string;
  rating: number;
  images: string[];
  price: number;
  discountPercentage: number;
  description: string;
  tags: string[];
};

function page() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState<singleProductType | null>(
    null,
  );
  const [activeImage, setActiveImage] = useState<number>(2);
  const fetchSingleProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const result: singleProductType = await res.json();
    setSingleProduct(result);
  };
  useEffect(() => {
    fetchSingleProduct();
  }, []);
  if (!singleProduct) return <p>Loading...</p>;
  return (
    <main>
      <section className={`${styles.productGallery} ${layout.container}`}>
        <div className={`${styles.productDetails} ${layout.innerContainer}`}>
          <div className={styles.productImages}>
            {singleProduct.images.length === 1 ? (
              <Image
                className={styles.productPreview}
                src={singleProduct.images[0]}
                width={358}
                height={290}
                alt="image"
              />
            ) : (
              <Image
                className={styles.productPreview}
                src={singleProduct.images[activeImage]}
                width={358}
                height={290}
                alt="image"
              />
            )}
            <div className={styles.productThumbnails}>
              {singleProduct.images.length === 1
                ? null
                : singleProduct.images.map((item, index) => (
                    <Image
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`${activeImage === index ? styles.activeImage : styles.productThumbnail}`}
                      src={item}
                      width={111}
                      height={106}
                      alt="image"
                    />
                  ))}
            </div>
          </div>
          <div className={styles.productInfo}>
            <h1>{singleProduct.title}</h1>
            <StarRate rating={singleProduct.rating} className={styles.star} />
            <div className={styles.priceContainer}>
              <span className={styles.dicountedPrice}>
                $
                {(
                  singleProduct.price -
                  (singleProduct.price * singleProduct.discountPercentage) / 100
                ).toFixed(2)}
              </span>
              <span className={styles.originalPrice}>
                ${singleProduct.price}
              </span>
              <span className={styles.discountPercentage}>
                {singleProduct.discountPercentage}%
              </span>
            </div>
            <p className={styles.description}>{singleProduct.description}</p>
            <hr />
            <h4>tags</h4>
            {singleProduct.tags.map((tag, index) => (
              <div key={index}>{tag}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
