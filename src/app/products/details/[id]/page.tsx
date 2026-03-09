"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";
import StarRate from "@/app/components/StarRate/StarRate";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { CardProps } from "@/app/components/Card/Card";

interface reviewsType {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
interface singleProductType extends reviewsType {
  id: string;
  title: string;
  rating: number;
  images: string[];
  price: number;
  discountPercentage: number;
  description: string;
  tags: string[];
  reviews: reviewsType[];
}

function page() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState<singleProductType | null>(
    null,
  );
  const [cardProducts, setcardProducts] = useState<CardProps[] | null>(null);
  const [activeImage, setActiveImage] = useState<number>(2);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const buttons = ["Product Details", "Rating & Reviews", "FAQs"];
  const fetchSingleProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const result: singleProductType = await res.json();
    setSingleProduct(result);
  };
  const fetchProductCards = async () => {
    const res = await fetch(
      "https://dummyjson.com/products?limit=4&skip=5&select=id,title,price,rating,images",
    );
    const result = await res.json();
    setcardProducts(result.products);
  };
  function changeActivePanel(index: number) {
    setActiveIndex(index);
  }
  useEffect(() => {
    fetchSingleProduct();
    fetchProductCards();
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
            <StarRate
              ratingNumber={true}
              rating={singleProduct.rating}
              className={styles.star}
            />
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
            <div className={styles.tagContainer}>
              <p>Tags</p>
              <div className={styles.tagContent}>
                {singleProduct.tags.map((tag, index) => (
                  <div className={styles.tagBox} key={index}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className={styles.addToCart}>
              <div className={styles.cartQuantity}>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <button className={styles.addToCartBtn}>Add to Cart</button>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.productTabs} ${layout.innerContainer}`}>
        <div className={styles.taButtons}>
          {buttons.map((item, index) => (
            <button
              key={index}
              onClick={() => changeActivePanel(index)}
              className={`${activeIndex === index ? styles.taButtonActive : styles.taButton}`}
            >
              {item}
            </button>
          ))}
        </div>
        <hr />
        <div className={styles.tabContent}>
          {activeIndex === 0 && (
            <div className={styles.tabPanel}>
              <h3>details</h3>
            </div>
          )}
          {activeIndex === 1 && (
            <div className={styles.tabPanel}>
              <h3>
                all reviews<span>({singleProduct.reviews.length})</span>
              </h3>
              <div className={styles.reviewContainer}>
                {singleProduct.reviews.map((review, index) => (
                  <div key={index} className={styles.reviewCard}>
                    <StarRate ratingNumber={false} rating={review.rating} />
                    <h4>{review.reviewerName}</h4>
                    <p>{review.comment}</p>
                    <span className={styles.postDate}>
                      Posted on {review.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeIndex === 2 && (
            <div className={styles.tabPanel}>
              <h3>fAQs</h3>
            </div>
          )}
        </div>
      </section>
      <ProductCard title="top selling" cards={cardProducts} />
    </main>
  );
}

export default page;
