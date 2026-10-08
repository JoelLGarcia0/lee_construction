import type { Metadata } from "next";
import Title from "@/components/sections/Title";
import Careers from "@/components/sections/Careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join LEE Construction Group in Miami. Call our office for a list of current open positions.",
};

const CareersPage = () => {
  return (
    <main>
      <Title title="Careers" />
      <Careers />
    </main>
  );
};

export default CareersPage;
