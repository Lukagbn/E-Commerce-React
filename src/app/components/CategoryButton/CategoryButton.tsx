import Link from "next/link";
import React from "react";
import styles from "./CategoryButton.module.scss";

type categoryBtn = {
  route: string;
};

function CategoryButton({ route }: categoryBtn) {
  return (
    <button className={styles.btn}>
      <Link href={`/products/categories/${route}`}>{route}</Link>
    </button>
  );
}

export default CategoryButton;
