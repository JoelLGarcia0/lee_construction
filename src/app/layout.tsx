import type { Metadata } from "next";
import { Lato, Oswald } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import ScrollReveal from "@/components/animations/ScrollReveal";

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
  title: {
    default: "LEE Construction Group | Commercial Contractors",
    template: "%s | LEE Construction Group",
  },
  formatDetection: { telephone: false },
  description:
    "Experienced commercial contractors specializing in healthcare, education, federal, and municipal projects.",
  icons: {
    icon: "/icons/leelogo.ico",
  },
  metadataBase: new URL("https://www.leecgi.com"),
  keywords: [
    "commercial construction",
    "healthcare contractors",
    "education construction",
    "municipal construction",
    "federal building contractors",
  ],
  openGraph: {
    title: "LEE Construction Group | Commercial Contractors",
    description:
      "Specializing in high-quality construction projects for healthcare, education, federal, and municipal sectors.",
    url: "https://www.leecgi.com/",
    siteName: "LEE Construction Group Inc",
    images: [
      {
        url: "https://www.leecgi.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Construction site with cranes and building structures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEE Construction Group | Commercial Contractors",
    description:
      "Providing professional construction services across healthcare, education, and government sectors.",
    images: ["https://www.leecgi.com/images/og-image.png"],
  },
  verification: {
    google: "sRGc2hlbfzMvcgmPk0ytyZpqAeDctHnhjmejz2su3JE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${lato.variable} ${oswald.variable} antialiased`}>
        <NavBar />
        {children}
        <Toaster position="bottom-right" />
        <ScrollReveal />
        <Footer />
      </body>
    </html>
  );
}
