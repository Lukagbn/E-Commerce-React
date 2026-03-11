"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";
import {
  addToCart,
  cartTotalDiscount,
  cartTotalPrice,
} from "@/lib/slices/cartSlice";
import { decreaseQuantity } from "@/lib/slices/cartSlice";
import { deleteFromCart } from "@/lib/slices/cartSlice";
import Link from "next/link";

type cart = {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  quantity: number;
  discountPercentage: number;
};

function page() {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const totalPrice = useAppSelector(cartTotalPrice);
  const totalDiscount = useAppSelector(cartTotalDiscount);
  function handleIncrease(card: cart) {
    dispatch(addToCart(card));
  }
  function handleDecrease(card: cart) {
    dispatch(decreaseQuantity(card));
  }
  function handleDelete(itemId: number) {
    dispatch(deleteFromCart(itemId));
  }
  const checkUser = () => {
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (!(localUser || sessionUser)) {
      localStorage.clear();
      sessionStorage.clear();
      return false;
    } else {
      return true;
    }
  };
  console.log(checkUser());
  useEffect(() => {
    checkUser();
  }, []);
  if (cartProducts.length === 0) {
    return (
      <div className={styles.emptyCart}>
        {checkUser() ? (
          <p>Your cart is empty</p>
        ) : (
          <p>you must log in to use cart</p>
        )}
        {checkUser() ? (
          <Link href={"/products/categories"}>Browse products</Link>
        ) : (
          <Link href={"/login"}>Log In</Link>
        )}
      </div>
    );
  }
  return (
    <main>
      <div className={layout.innerContainer}>
        <h1 className={styles.cartTitle}>Your cart</h1>
        <div className={styles.cartContainer}>
          <div className={styles.cardContainer}>
            {cartProducts.map((card) => (
              <div key={card.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <Link href={`/products/details/${card.id}`}>
                    <Image
                      src={card.images[0]}
                      width={99}
                      height={99}
                      alt="product image"
                    />
                  </Link>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.titleWrapper}>
                    <h4>{card.title}</h4>
                    <span onClick={() => handleDelete(card.id)}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                          stroke="#000000"
                          strokeWidth="2" // ← camelCase
                          strokeLinecap="round" // ← camelCase
                          strokeLinejoin="round" // ← camelCase
                        />
                      </svg>
                    </span>
                  </div>
                  <div className={styles.cardItemControls}>
                    <p className={styles.cardPrice}>
                      $
                      {(
                        card.price -
                        (card.price * card.discountPercentage) / 100
                      ).toFixed(2)}
                    </p>
                    <div className={styles.cardItemQuantity}>
                      <button onClick={() => handleDecrease(card)}>-</button>
                      <p className={styles.cardQuantity}>{card.quantity}</p>
                      <button onClick={() => handleIncrease(card)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.totalContainer}>
            <h4>Order Summary</h4>
            <div className={styles.totalWrapper}>
              <p>Total</p>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={styles.totalWrapper}>
              <p>Discount({totalDiscount.toFixed(2)}%)</p>
              <span className={styles.totalDiscount}>
                -${(totalPrice - (totalPrice - totalDiscount)).toFixed(2)}
              </span>
            </div>
            <div className={styles.totalWrapper}>
              <p>Delivery Fee</p>
              <span>$15</span>
            </div>
            <hr />
            <div className={styles.totalWrapper}>
              <p>Total</p>
              <span>${(totalPrice - totalDiscount).toFixed(2)}</span>
            </div>
            <button>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
