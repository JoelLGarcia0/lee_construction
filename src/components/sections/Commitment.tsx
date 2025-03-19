"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { icons } from "../../../public";
import ScrollReveal from "../animations/ScrollReveal";

const Commitment = () => {
  return (
    <section id="ourcommitment" className="py-10 px-8 bg-greybg text-center">
      {/* Title Section */}

      <h1 className="text-3xl font-bold text-darkblue">
        A Commitment to <span className="text-rust">Excellence</span>
      </h1>

      <div className="mt-6 max-w-3xl mx-auto text-left">
        <ScrollReveal>
          <p className="text-gray-800 leading-relaxed">
            At <strong>LEE Construction Group, Inc.</strong>, we don’t just
            build structures—we build trust and lasting relationships. Our
            experienced team delivers projects with precision, transparency, and
            efficiency. Whether it's a complex industrial project or a
            government contract, we guarantee:
          </p>
        </ScrollReveal>
      </div>

      {/* Grid with Icons & Text */}
      <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 - Ruler (On-time Delivery) */}
        <ScrollReveal>
          <div className="text-center p-4 font-bold text-darkblue flex flex-col items-center">
            <Image
              src={icons.ruler}
              alt="On-time Delivery"
              width={50}
              height={50}
              className="mb-3"
            />
            <p>On-time delivery & budget efficiency</p>
          </div>
        </ScrollReveal>

        {/* Card 2 - Hardhat (Innovation) */}
        <ScrollReveal>
          <div className="text-center p-4 font-bold text-darkblue flex flex-col items-center">
            <Image
              src={icons.hardhat}
              alt="Innovative Engineering"
              width={50}
              height={50}
              className="mb-3"
            />
            <p>Innovative engineering solutions</p>
          </div>
        </ScrollReveal>

        {/* Card 3 - Screwdrivers (Stress-free Process) */}
        <ScrollReveal>
          <div className="text-center p-4 font-bold text-darkblue flex flex-col items-center">
            <Image
              src={icons.screwdrivers}
              alt="Seamless Construction"
              width={50}
              height={50}
              className="mb-3"
            />
            <p>A seamless, stress-free construction process</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Commitment;
