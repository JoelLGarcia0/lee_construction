"use client";

import Image from "next/image";
import { icons } from "../../../public";

const Commitment = () => {
  return (
    <section
      id="ourcommitment"
      className="py-10 px-8 bg-greybg text-center overflow-hidden"
    >
      {/* Title Section */}

      <h1 className="text-3xl font-bold text-darkblue">
        A Commitment to <span className="text-rust">Excellence</span>
      </h1>

      <div className="mt-6 max-w-3xl mx-auto text-left">
        <p className="text-gray-800 leading-relaxed">
          At <strong>LEE Construction Group, Inc.</strong>, we don&apos;t just
          build structures—we build trust and lasting relationships. Our
          experienced team delivers projects with precision, transparency, and
          efficiency. Whether it&apos;s a complex industrial project or a
          government contract, we guarantee:
        </p>
      </div>

      {/* Grid with Icons & Text */}
      <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 - Ruler (On-time Delivery) */}

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

        {/* Card 2 - Hardhat (Innovation) */}

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

        {/* Card 3 - Screwdrivers (Stress-free Process) */}

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
      </div>
    </section>
  );
};

export default Commitment;
