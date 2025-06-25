"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../animations/ScrollReveal";

interface ImageData {
  id: string;
  src: string;
  alt: string;
  order: number;
}

const Projects = () => {
  const [expanded, setExpanded] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/admin/images");
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Failed to load project images", err);
      }
    };

    fetchImages();
  }, []);

  const visible = expanded ? images : images.slice(0, 6);

  return (
    <section className="max-w-5xl mx-auto px-8 py-12 text-center overflow-hidden">
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
          perform work throughout Florida and beyond...
        </p>
      </ScrollReveal>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        <AnimatePresence>
          {visible
            .sort((a, b) => a.order - b.order)
            .map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                className="relative w-full aspect-square bg-gray-600 rounded-lg overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Expand/Collapse Button */}
      {images.length > 6 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex justify-center items-center w-12 h-12 rounded-full border border-darkblue text-darkblue hover:bg-darkblue hover:text-white transition-all"
          >
            {expanded ? (
              <MdOutlineKeyboardDoubleArrowUp size={24} />
            ) : (
              <MdOutlineKeyboardDoubleArrowDown size={24} />
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
