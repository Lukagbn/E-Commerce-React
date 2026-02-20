import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import layout from "@/app/layout.module.scss";

async function Navbar() {
  return (
    <header>
      <div className={styles.promoBar}>
        <p>
          Sign up and get 20% off to your first order.{" "}
          <Link href={`#`}>Sign Up Now</Link>
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
          <Link href={"#"}>
            <span className={styles.logo}>SHOP.CO</span>
          </Link>
        </div>
        <nav className={`${styles.nav}`}>
          <ul className={styles.navList}>
            <li className={styles.dropDown}>
              <button className={styles.dropdownTrigger}>
                Shop
                <Image
                  src="/dropDown.png"
                  width={16}
                  height={16}
                  alt="drop down"
                />
              </button>
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
          <Link href={"#"}>
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
