import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import Header from "../components/header/index";
import Footer from "../components/footer/index";

import "./globals.css";

const elite = Special_Elite({ weight: ["400"], preload: false });

export const metadata: Metadata = {
  title: "Criminal Databases",
  description: "Criminal Databases",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={elite.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );

}
