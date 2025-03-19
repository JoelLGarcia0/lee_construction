"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../animations/ScrollReveal";

const Projects = () => {
  const [expanded, setExpanded] = useState(false);

  // Array of project images (replace with actual image URLs)
  const images = [
    "/images/project1.png",
    "/images/project1.png",
    "/images/project1.png",
    "/images/project1.png",
    "/images/project1.png",
    "/images/project1.png",
    "/images/project1.png",
    "/images/project1.png",
    "/images/project1.png",
  ];

  return (
    <section className="max-w-5xl mx-auto px-8 py-12 text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8 text-darkblue">
        Our <span className="text-rust">Experience</span> At A Glance
      </h1>

      {/* Paragraph */}
      <ScrollReveal>
        <p className="mt-4 text-lg text-gray-700">
          With 18 years of experience and a promising future ahead, LEE
          Construction Group, Inc. continues to serve major clients such as
          Jackson Health Systems, the National Park Service, GSA, and the U.S.
          Navy. Backed by a skilled team, we have the manpower and capability to
          perform work throughout Florida and beyond. Our commitment to quality,
          efficiency, and value engineering ensures that we deliver the best
          results at competitive prices. From leadership to staff, our
          collective construction expertise is indispensable, driving us to take
          on new challenges and expand our reach while maintaining the highest
          standards of customer satisfaction
        </p>
      </ScrollReveal>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {/* Always visible images */}
        {images.slice(0, 3).map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-square bg-gray-600 rounded-lg overflow-hidden"
          >
            <Image
              src={src}
              alt={`Project ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}

        {/* Animate Presence for the expanding images */}
        <AnimatePresence>
          {expanded &&
            images.slice(3).map((src, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="relative w-full aspect-square bg-gray-600 rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Project ${index + 3}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Expand/Collapse Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex justify-center items-center w-12 h-12 rounded-full border border-darkblue text-darkblue hover:bg-darkblue hover:text-white  cursor-pointer transition-all"
        >
          {expanded ? (
            <MdOutlineKeyboardDoubleArrowUp size={24} />
          ) : (
            <MdOutlineKeyboardDoubleArrowDown size={24} />
          )}
        </button>
      </div>
    </section>
  );
};

export default Projects;
