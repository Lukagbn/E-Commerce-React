import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import layout from "@/app/layout.module.scss";
import { title } from "process";
async function Navbar() {
  const NAV_LIST = [
    {
      title: "Shop",
      href: "/products/categories",
      className: "dropDown",
    },
    {
      title: "On Sale",
      href: "/products/categories",
      className: "",
    },
    {
      title: "New Arrivals",
      href: "/products/categories",
      className: "",
    },
    {
      title: "Bands",
      href: "/products/categories",
      className: "",
    },
  ];
  return (
    <header>
      <div className={styles.promoBar}>
        <p>
          Sign up and get 20% off to your first order.{" "}
          <Link href={`/register`}>Sign Up Now</Link>
        </p>
      </div>
      <div className={`${styles.navbar}  ${layout.innerContainer}`}>
        <div className={styles.brand}>
          <button className={styles.burgerBtn} aria-label="Open menu">
            <Image
              src="/burgerIcon.svg"
              width={24}
              height={24}
              alt="burger icon"
            />
          </button>
          <Link href={"/products"}>
            <span className={styles.logo}>SHOP.CO</span>
          </Link>
        </div>
        <nav className={`${styles.nav}`}>
          <ul className={styles.navList}>
            {NAV_LIST.map((list) => (
              <li key={list.title}>
                <Link href={list.href}>{list.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.actions}>
          <input
            type="search"
            placeholder="search"
            className={styles.searchInput}
          />
          <Link href={"#"}>
            <Image
              className={styles.searchIcon}
              src={"/search.svg"}
              width={24}
              height={24}
              alt="search icon"
            ></Image>
          </Link>
          <Link href={"#"}>
            <Image
              src={"/cart.svg"}
              width={24}
              height={24}
              alt="cart icon"
            ></Image>
          </Link>
          <Link href={"/profile"}>
            <Image
              src={"/profile.svg"}
              width={24}
              height={24}
              alt="profile icon"
            ></Image>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
