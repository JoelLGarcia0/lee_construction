"use client";

import Image from "next/image";
import { images } from "../../../public";
import { FaPhoneAlt, FaRegArrowAltCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Construction Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "right",
          }}
          quality={100}
          priority
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl text-center px-12 mt-10 text-white">
        <h1 className="text-4xl  font-bold uppercase mb-2  underline md:py-2">
          Commercial contractors
        </h1>
        <h1 className="text-xl md:text-2xl">
          Specializing in Healthcare, Education, Federal, and Municipal
          Projects.
        </h1>
        <p className="mt-4 text-sm md:text-lg">
          Linking people, places, projects, and passion
        </p>

        {/* CTA Button */}
        <motion.div
          className="mt-6 flex justify-center "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <a
            href="tel:+3052167558"
            className="inline-flex items-center gap-2 uppercase bg-rust/80 px-6 py-3 rounded-lg text-white text-md font-semibold transition-transform duration-300 shadow-lg hover:translate-y-1"
          >
            <FaPhoneAlt className="text-white text-xl" />
            Call Now
          </a>
        </motion.div>

        {/* Discover More + Scroll Arrow */}
        <motion.div
          className="mt-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-white pb-2 text-md">Discover More</p>
          <a href="#our-company">
            <FaRegArrowAltCircleDown className="text-white text-4xl cursor-pointer hover:scale-110 hover:translate-y-2 transition-all duration-300 mt-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
