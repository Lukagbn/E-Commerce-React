"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import Image from "next/image";
import React from "react";
import styles from "./page.module.scss";

function page() {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  console.log(cartProducts);
  return (
    <main>
      <h1>Your cart</h1>
      {cartProducts.map((card) => (
        <div className={styles.cartCard}>
          <Image
            src={card.images[0]}
            width={99}
            height={99}
            alt="product image"
          />
          <h4>{card.title}</h4>
          <p>{card.quantity}</p>
          <p>{card.price}</p>
        </div>
      ))}
    </main>
  );
}

export default page;
