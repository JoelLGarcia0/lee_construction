import type { Metadata } from "next";
import Title from "@/components/sections/Title";
import CallToAction from "@/components/sections/CallToAction";
import ServicesSection from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Pre-construction, general contracting, construction management, and design-build services for commercial projects across Florida.",
};

const ServicesPage = () => {
  return (
    <main>
      <Title title="Services" />
      <ServicesSection />
      <CallToAction />
    </main>
  );
};

export default ServicesPage;
