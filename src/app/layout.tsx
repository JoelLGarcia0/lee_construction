import type { Metadata } from "next";
import { Lato, Oswald } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Head from "next/head";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Select the weights you need
  variable: "--font-lato", // Define CSS variable
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "LEE Construction Group | Commercial Contractors",
  description:
    "Providing high-quality construction services in healthcare, education, and government sectors.",
  icons: {
    icon: "/icons/leelogo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body className={`${lato.variable} ${oswald.variable} antialiased`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
