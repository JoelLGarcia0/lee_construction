"use client";

import React from "react";
import { images } from "../../../public";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import SlideIn from "../animations/SlideIn";

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
          <SlideIn direction="left">
            <p className="mt-4 text-lg">
              We specialize in commercial construction with a strong focus on
              healthcare, educational, federal, and local municipality projects.
              Our expertise ensures high-quality, code-compliant facilities that
              serve communities efficiently.
            </p>
          </SlideIn>
          <SlideIn direction="left">
            <motion.a
              href="/services"
              className="mt-10 inline-flex items-center shadow-lg text-white bg-blue px-6 py-3 rounded-lg text-md font-bold transition-all"
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
          </SlideIn>
        </div>

        {/* Card Container */}

        <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <SlideIn direction="right">
            <Card className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg bg-transparent border-none">
              {/* Background Image */}
              <Image
                src={images.memorial}
                alt="Healthcare Construction"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "left",
                }}
                className="rounded-md"
              />
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-darkblue/30"></div>
              {/* Title */}
              <div className="absolute top-0 w-full text-center bg-blue text-white px-4 py-4">
                Healthcare
              </div>
            </Card>
          </SlideIn>

          {/* Card 2 */}
          <SlideIn direction="right">
            <Card className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg bg-transparent border-none">
              {/* Background Image */}
              <Image
                src={images.school}
                alt="Healthcare Construction"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "20% bottom",
                }}
                className="rounded-md"
              />
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-darkblue/30"></div>
              {/* Title */}
              <div className="absolute top-0 w-full text-center bg-blue text-white px-4 py-4">
                Education
              </div>
            </Card>
          </SlideIn>

          {/* Card 3 */}
          <SlideIn direction="right">
            <Card className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg bg-transparent border-none">
              {/* Background Image */}
              <Image
                src={images.governmentCardBg}
                alt="Healthcare Construction"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                className="rounded-md"
              />
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-darkblue/30"></div>
              {/* Title */}
              <div className="absolute top-0 w-full text-center bg-blue text-white px-4 py-4">
                Government
              </div>
            </Card>
          </SlideIn>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
