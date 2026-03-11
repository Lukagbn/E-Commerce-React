import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/app/components/Navbar/Navbar";
import "./globals.scss";
import Footer from "@/app/components/Footer/Footer";
import StoreProvider from "./StoreProvider";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});
const integralCF = localFont({
  src: [
    {
      path: "./fonts/IntegralCFRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IntegralCFMediumRegular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IntegralCFBoldRegular.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-integral",
});

export const metadata: Metadata = {
  title: "Shop.co — Find Clothes That Match Your Style",
  description:
    "Discover a diverse range of high-quality clothing for every style. Browse new arrivals, top selling items, and shop by category with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${integralCF.variable}`}>
      <head>
        <link rel="preload" href="/mainImage.svg" as="image" />
      </head>
      <body className="antialiased">
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
