import React from "react";
import styles from "./CategoryGroup.module.scss";
import CategoryBtn from "../CategoryButton/CategoryButton";

function CategoryGroup() {
  const CATEGORIES_BTN = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];
  return (
    <div className={styles.categoriesWrapper}>
      {CATEGORIES_BTN.map((btn) => (
        <CategoryBtn key={btn} route={btn} />
      ))}
    </div>
  );
}

export default CategoryGroup;
