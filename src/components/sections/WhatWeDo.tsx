"use client";

import React from "react";
import { images } from "../../../public";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const WhatWeDo = () => {
  return (
    <section id="whatwedo" className="relative w-full py-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={images.whatWeDoBg}
          alt="Construction workers background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          quality={100}
          priority
        />
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-darkblue/90"></div>
      </div>

      {/* Cotent Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center text-white px-8 md:px-16">
        {/* Title and Text */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-center"> What We Do</h1>

          <div className="w-20 h-1 bg-blue mt-4 mx-auto "></div>

          <p className="mt-4 text-lg">
            We specialize in commercial construction with a strong focus on
            healthcare, educational, federal, and local municipality projects.
            Our expertise ensures high-quality, code-compliant facilities that
            serve communities efficiently.
          </p>

          <motion.a
            href="/services"
            className="mt-10 inline-flex items-center shadow-lg text-white bg-blue px-6 py-3 rounded text-md font-bold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            Our Services
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.a>
        </div>

        {/* Card Container */}

        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}

          <Link href="/projects#healthcare" className="group">
            <Card className="relative h-60 w-full overflow-hidden rounded-md shadow-lg bg-transparent border-none transition-transform group-hover:scale-[1.01]">
              {/* Background Image */}
              <Image
                src={images.baptist}
                alt="Healthcare Construction"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="rounded-md"
              />
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-darkblue/30 transition-colors group-hover:bg-darkblue/40"></div>
              {/* Title */}
              <div className="absolute top-0 w-full text-center font-semibold  bg-blue text-white px-4 py-3">
                Healthcare
              </div>
            </Card>
          </Link>

          {/* Card 2 */}

          <Link href="/projects#education" className="group">
            <Card className="relative w-full h-60 overflow-hidden rounded-md shadow-lg bg-transparent border-none transition-transform group-hover:scale-[1.01]">
              {/* Background Image */}
              <Image
                src={images.ftschool}
                alt="Education Construction"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: " 75% center",
                }}
                className="rounded-md"
              />
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-darkblue/30 transition-colors group-hover:bg-darkblue/40"></div>
              {/* Title */}
              <div className="absolute top-0 w-full text-center font-semibold bg-[#40AD53] text-white px-4 py-3">
                Education
              </div>
            </Card>
          </Link>

          {/* Card 4 */}

          <Link href="/projects#government" className="group">
            <Card className="relative w-full h-60 overflow-hidden rounded-md shadow-lg bg-transparent border-none transition-transform group-hover:scale-[1.01]">
              {/* Background Image */}
              <Image
                src={images.county}
                alt="Government Construction"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center 20%",
                }}
                className="rounded-md"
              />

              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-darkblue/30 transition-colors group-hover:bg-darkblue/40"></div>
              {/* Title */}
              <div className="absolute top-0 w-full text-center font-semibold  bg-[#C2B234] text-white px-4 py-3">
                Government
              </div>
            </Card>
          </Link>

          <Link href="/projects#private" className="group">
            <Card className="relative w-full h-60 overflow-hidden rounded-md shadow-lg bg-transparent border-none transition-transform group-hover:scale-[1.01]">
              {/* Background Image */}
              <Image
                src={images.private2}
                alt="Private Construction"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center 30%",
                }}
                className="rounded-md"
              />

              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-darkblue/30 transition-colors group-hover:bg-darkblue/40"></div>
              {/* Title */}
              <div className="absolute top-0 w-full font-semibold text-center bg-rust text-white px-4 py-3">
                Private
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
