"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import layout from "@/app/layout.module.scss";
import { usePathname } from "next/navigation";

function Navbar() {
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
  const [active, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  const checkUser = () => {
    if (typeof window === "undefined") return;
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    setIsLoggedIn(!(localUser || sessionUser));
  };
  useEffect(() => {
    checkUser();
  }, [pathname]);
  return (
    <header>
      {isLoggedIn ? (
        <div className={styles.promoBar}>
          <p>
            Sign up and get 20% off to your first order.{" "}
            <Link href={`/register`}>Sign Up Now</Link>
          </p>
        </div>
      ) : null}
      <div className={`${styles.navbar}  ${layout.innerContainer}`}>
        <div className={styles.brand}>
          <button
            className={`${active ? styles.burgerBtnActive : styles.burgerBtn}`}
            onClick={() => setActive(!active)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12ZM3.75 7.125H20.25C20.5484 7.125 20.8345 7.00647 21.0455 6.7955C21.2565 6.58452 21.375 6.29837 21.375 6C21.375 5.70163 21.2565 5.41548 21.0455 5.2045C20.8345 4.99353 20.5484 4.875 20.25 4.875H3.75C3.45163 4.875 3.16548 4.99353 2.9545 5.2045C2.74353 5.41548 2.625 5.70163 2.625 6C2.625 6.29837 2.74353 6.58452 2.9545 6.7955C3.16548 7.00647 3.45163 7.125 3.75 7.125ZM20.25 16.875H3.75C3.45163 16.875 3.16548 16.9935 2.9545 17.2045C2.74353 17.4155 2.625 17.7016 2.625 18C2.625 18.2984 2.74353 18.5845 2.9545 18.7955C3.16548 19.0065 3.45163 19.125 3.75 19.125H20.25C20.5484 19.125 20.8345 19.0065 21.0455 18.7955C21.2565 18.5845 21.375 18.2984 21.375 18C21.375 17.7016 21.2565 17.4155 21.0455 17.2045C20.8345 16.9935 20.5484 16.875 20.25 16.875Z"
                fill="black"
              />
            </svg>
          </button>
          <Link href={"/products"}>
            <span className={styles.logo}>SHOP.CO</span>
          </Link>
        </div>
        <nav className={`${active ? styles.navACtive : styles.nav}`}>
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
          <Link href={"/cart"}>
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
      <hr className={styles.hr} />
    </header>
  );
}

export default Navbar;
