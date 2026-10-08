import type { Metadata } from "next";
import AboutUs from "@/components/sections/AboutUs";
import Title from "@/components/sections/Title";
import CallToAction from "@/components/sections/CallToAction";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2006 in Miami, LEE Construction Group is a licensed general contractor and construction manager for healthcare, education, federal, and municipal projects.",
};

const AboutPage = () => {
  return (
    <main>
      <Title title="About Us" />
      <AboutUs />
      <CallToAction />
    </main>
  );
};

export default AboutPage;
