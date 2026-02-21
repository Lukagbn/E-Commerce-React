import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import layout from "@/app/layout.module.scss";
import Link from "next/link";
function Footer() {
  type FooterSection = {
    title: string;
    paragraphs: string[];
    link?: string;
  };
  type PaymentSection = {
    img: string;
    alt: string;
  };
  type SocialLink = {
    img: string;
    alt: string;
    className: string;
  };
  const socialLiks: SocialLink[] = [
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
      <div className={`${styles.footerTop} ${layout.innerContainer}`}>
        <form className={styles.newsletterForm}>
          <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
          <div className={styles.newsletterControls}>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Enter your email address" />
              <img
                src="/emailIcon.svg"
                alt="email icon"
                className={styles.inputIcon}
              />
            </div>
            <button type="submit">Subscribe to Newsletter</button>
          </div>
        </form>
      </div>
      <div className={`${styles.footerMain} ${layout.innerContainer}`}>
        <div className={styles.footerBrand}>
          <h2 className={styles.logo}>SHOP.CO</h2>
          <p>
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className={styles.socialLinks}>
            {socialLiks.map((item) => (
              <div
                className={`${styles.socialBox} ${item.className}`}
                key={item.className}
              >
                <Image src={item.img} width={13} height={13} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerNav}>
          {footerSection.map((item) => (
            <div className={styles.footerColumn} key={item.title}>
              <h4>{item.title}</h4>
              {item.paragraphs.map((i) => (
                <Link href={"#"} key={i}>
                  {i}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <hr />
          <p className={styles.rights}>
            Shop.co © 2000-{currentYear}, All Rights Reserved
          </p>
          <div className={styles.paymentMethods}>
            {paymentSection.map((item, index) => (
              <div className={styles.paymentItem} key={index}>
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
