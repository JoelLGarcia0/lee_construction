import Clients from "@/components/sections/Clients";
import Commitment from "@/components/sections/Commitment";
import ContactUs from "@/components/sections/ContactUs";
import Hero from "@/components/sections/Hero";
import OurCompany from "@/components/sections/OurCompany";
import OurOffice from "@/components/sections/OurOffice";
import WhatWeDo from "@/components/sections/WhatWeDo";

export default function Home() {
  return (
    <main>
      <Hero />
      <OurCompany />
      <WhatWeDo />
      <Commitment />
      <Clients />
      <OurOffice />
      <ContactUs />
    </main>
  );
}
