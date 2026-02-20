import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import layout from "@/app/layout.module.scss";

async function Navbar() {
  return (
    <header>
      <div className={styles.signUp}>
        <p>
          Sign up and get 20% off to your first order.{" "}
          <Link href={`#`}>Sign Up Now</Link>
        </p>
      </div>
      <div className={`${styles.navHeader}  ${layout.innerContainer}`}>
        <div className={styles.logoContainer}>
          <Image
            src={"/burgerIcon.svg"}
            width={24}
            height={24}
            alt="burdger icon"
          />
          <Link href={"#"}>
            <span className={styles.navLogo}>SHOP.CO</span>
          </Link>
        </div>
        <nav className={`${styles.navigation}`}>
          <ul className={styles.navigationList}>
            <li>
              Shop
              <Image
                src={"/dropDown.png"}
                width={16}
                height={16}
                alt="drop down"
              />
            </li>
            <li>
              <Link href={"#"}>On Sale</Link>
            </li>
            <li>
              <Link href={"#"}>New Arrivals</Link>
            </li>
            <li>
              <Link href={"#"}>Bands</Link>
            </li>
          </ul>
          <input type="search" placeholder="search" />
          <div className={styles.iconContainer}>
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
            <Link href={"#"}>
              <Image
                src={"/profile.svg"}
                width={24}
                height={24}
                alt="profile icon"
              ></Image>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
