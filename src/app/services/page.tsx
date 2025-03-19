"use client";

import Title from "@/components/sections/Title";
import { images } from "../../../public";
import ServicesSection from "@/components/sections/ServicesSection";

const ServicesPage = () => {
  return (
    <main>
      <Title title="Services" image={images.servicePhoto} />
      <ServicesSection />
    </main>
  );
};

export default ServicesPage;
