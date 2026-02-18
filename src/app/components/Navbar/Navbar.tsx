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
      <div className={styles.navHeader}>
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
        <div className={styles.navigation}>
          <span>
            <Link href={"#"}>
              <Image
                src={"/search.svg"}
                width={24}
                height={24}
                alt="search icon"
              ></Image>
            </Link>
          </span>
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
