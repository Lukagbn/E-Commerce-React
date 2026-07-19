"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";
import StarRate from "@/app/components/StarRate/StarRate";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { CardProps } from "@/app/components/Card/Card";
import { useAppDispatch } from "@/lib/hook";
import { addToCart } from "@/lib/slices/cartSlice";
import Loader from "@/app/components/Loader/Loader";

interface reviewsType {
  rating: number;
  comment: string;
  date: string;
  userName: string;
}
interface singleProductType extends reviewsType {
  _id: string;
  title: string;
  rating: number;
  images: string[];
  price: number;
  discountPercentage: number;
  description: string;
  tags: string[];
  brand: string;
  width: number;
  height: number;
  depth: number;
  barcode: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  createdAt?: Date;
  reviews: reviewsType[];
}
function page() {
  const { _id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [singleProduct, setSingleProduct] = useState<singleProductType | null>(
    null,
  );
  const [cardProducts, setcardProducts] = useState<CardProps[] | null>(null);
  const [activeImage, setActiveImage] = useState<number>(2);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [reviews, setReviews] = useState<reviewsType[]>([]);
  const buttons = ["Product Details", "Rating & Reviews", "FAQs"];
  const details = [
    { label: "Brand", value: singleProduct?.brand },
    { label: "Barcode", value: singleProduct?.barcode },
    { label: "Depth", value: singleProduct?.depth },
    { label: "Height", value: singleProduct?.height },
    { label: "Width", value: singleProduct?.width },
    {
      label: "Warranty Information",
      value: singleProduct?.warrantyInformation,
    },
    {
      label: "Shipping Information",
      value: singleProduct?.shippingInformation,
    },
    { label: "Availability Status", value: singleProduct?.availabilityStatus },
  ];
  const fetchSingleProduct = async () => {
    const res = await fetch(
      `https://e-commerce-react-db.onrender.com/products/${_id}`,
    );
    const result = await res.json();
    setSingleProduct(result.product);
  };
  const fetchProductCards = async () => {
    const res = await fetch(
      "https://e-commerce-react-db.onrender.com/products?page=1&limit=4",
    );
    const result = await res.json();
    setcardProducts(result.products);
  };
  const fetchReview = async () => {
    const res = await fetch(
      `https://e-commerce-react-db.onrender.com/reviews/${_id}`,
    );
    const response = await res.json();
    setReviews(response.reviews);
  };
  function changeActivePanel(index: number) {
    setActiveIndex(index);
  }
  function handleAddToCart(item: singleProductType) {
    dispatch(
      addToCart({
        _id: item._id,
        title: item.title,
        price: item.price,
        images: item.images,
        rating: item.rating,
        discountPercentage: item.discountPercentage,
        quantity: quantity, // ← ლოკალურად არჩეული რაოდენობა
      }),
    );
    setQuantity(1);
  }

  useEffect(() => {
    fetchSingleProduct();
    fetchProductCards();
    fetchReview();
  }, []);
  if (!singleProduct) return <Loader />;
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
                : singleProduct.images
                    .slice(0, 3)
                    .map((item, index) => (
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
                  <div
                    className={styles.tagBox}
                    key={index}
                    onClick={() => router.replace(`/products/category/${tag}`)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className={styles.addToCart}>
              <div className={styles.cartQuantity}>
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => Math.min(prev + 1, 10))}
                >
                  +
                </button>
              </div>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(singleProduct)}
              >
                Add to Cart
              </button>
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
              <div className={styles.detailsContainer}>
                {details.map((item, index) => (
                  <div key={index} className={styles.detailsBox}>
                    <h4>{item.label}</h4>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeIndex === 1 && (
            <div className={styles.tabPanel}>
              <h3>
                {reviews.length === 0
                  ? "There are no reviews yet"
                  : "all reviews"}
                {reviews.length !== 0 ? <span>({reviews.length})</span> : null}
              </h3>
              <div className={styles.reviewContainer}>
                {reviews.map((review, index) => (
                  <div key={index} className={styles.reviewCard}>
                    <StarRate ratingNumber={false} rating={review.rating} />
                    <h4>{review.userName}</h4>
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
