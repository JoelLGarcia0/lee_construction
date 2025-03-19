"use client";

import Title from "@/components/sections/Title";
import { images } from "../../../public";
import Careers from "@/components/sections/Careers";

const CareersPage = () => {
  return (
    <main>
      <Title
        title="Careers"
        image={images.workplace}
        objectPosition="center 70%"
      />
      <Careers />
    </main>
  );
};

export default CareersPage;
