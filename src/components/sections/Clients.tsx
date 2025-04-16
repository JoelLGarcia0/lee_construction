"use client";

import Image from "next/image";
import { logos } from "../../../public";
import Marquee from "react-fast-marquee";

const clientLogos = [
  { src: logos.baptist, width: 140, height: 80 },
  { src: logos.browardCounty, width: 140, height: 80 },
  { src: logos.browardHealth, width: 110, height: 65 },
  { src: logos.clevelandClinic, width: 150, height: 85 },
  { src: logos.gsa, width: 80, height: 60 },
  { src: logos.jackson, width: 130, height: 75 },
  { src: logos.memorial, width: 140, height: 80 },
  { src: logos.miamiDadeCounty, width: 135, height: 75 },
  { src: logos.miamiDadeSchools, width: 80, height: 80 },
  { src: logos.nationalParkServices, width: 80, height: 106 },
];

const Clients = () => {
  return (
    <section className="py-16 px-8 bg-white text-center overflow-hidden">
      <h1 className="text-3xl font-bold text-darkblue mb-8">Our Clients</h1>

      {/* Scrolling Logo Carousel */}
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        <div className="flex items-center space-x-20">
          {clientLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={`Client ${index + 1}`}
                width={logo.width}
                height={logo.height}
                className="object-contain"
              />
            </div>
          ))}
          <div></div>
        </div>
      </Marquee>
    </section>
  );
};

export default Clients;
