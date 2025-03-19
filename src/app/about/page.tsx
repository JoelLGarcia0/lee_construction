"use client";

import AboutUs from "@/components/sections/AboutUs";
import Title from "@/components/sections/Title";
import { images } from "../../../public";

const AboutPage = () => {
  return (
    <main>
      <Title title="About Us" image={images.aboutTitlePic} />
      <AboutUs />
    </main>
  );
};

export default AboutPage;
