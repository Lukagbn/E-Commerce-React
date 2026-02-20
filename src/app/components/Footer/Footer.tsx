import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import layout from "@/app/layout.module.scss";
import Link from "next/link";
function Footer() {
  const socialList = [
    {
      img: "/twitter.svg",
      alt: "twitter icon",
      className: "twitter",
    },
    {
      img: "/facebook.svg",
      alt: "facebook icon",
      className: "facebook",
    },
    {
      img: "/instagram.svg",
      alt: "instagram icon",
      className: "instagram",
    },
    {
      img: "/github.svg",
      alt: "github icon",
      className: "github",
    },
  ];
  type FooterSection = {
    title: string;
    paragraphs: string[];
    link?: string;
  };
  type PaymentSection = {
    img: string;
    alt: string;
  };
  const footerSection: FooterSection[] = [
    {
      title: "COMPANY",
      paragraphs: ["About", "Features", "Works", "Career"],
    },
    {
      title: "HELP",
      paragraphs: [
        "Custumer Support",
        "Delivery Details",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
    {
      title: "FAQ",
      paragraphs: ["Account", "Manage Deliveries", "Orders", "Payment"],
    },
    {
      title: "RESOURCES",
      paragraphs: [
        "Free eBook",
        "Development Tutorial",
        "How to - Blog",
        "Youtube Playlist",
      ],
    },
  ];
  const paymentSection: PaymentSection[] = [
    {
      img: "/visa.png",
      alt: "visa",
    },
    {
      img: "/mastercard.png",
      alt: "mastercard",
    },
    {
      img: "/paypal.png",
      alt: "paypal",
    },
    {
      img: "/applePay.png",
      alt: "applePay",
    },
    {
      img: "/gPay.png",
      alt: "gPay",
    },
  ];
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerForm} ${layout.innerContainer}`}>
        <form>
          <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
          <div className={styles.contentContainer}>
            <div className={styles.formGroup}>
              <input type="email" placeholder="Enter your email address" />
              <img
                src="/emailIcon.svg"
                alt="email icon"
                className={styles.emailIcon}
              />
            </div>
            <button type="submit">Subscribe to Newsletter</button>
          </div>
        </form>
      </div>
      <div className={`${styles.footerWrapper} ${layout.innerContainer}`}>
        <div className={styles.logoBox}>
          <h2 className={styles.footerLogo}>SHOP.CO</h2>
          <p>
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className={styles.socialContainer}>
            {socialList.map((item, index) => (
              <div
                className={`${styles.socialBox} ${item.className}`}
                key={index}
              >
                <Image src={item.img} width={13} height={13} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerSection}>
          {footerSection.map((item, index) => (
            <div className={styles.footerColumn} key={index}>
              <h4>{item.title}</h4>
              {item.paragraphs.map((i, index) => (
                <Link href={"#"} key={index}>
                  {i}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.rightsContainer}>
          <hr />
          <p className={styles.rights}>
            Shop.co © 2000-{currentYear}, All Rights Reserved
          </p>
          <div className={styles.paymentContainer}>
            {paymentSection.map((item, index) => (
              <div className={styles.paymentBox} key={index}>
                <Image src={item.img} width={27} height={10} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
