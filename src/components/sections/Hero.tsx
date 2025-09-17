"use client";

import Image from "next/image";
import { images } from "../../../public";
import { FaPhoneAlt, FaRegArrowAltCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Commercial construction project background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right" }}
          quality={100}
          priority
        />
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 text-white mt-6">
        <span className="inline-block rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs md:text-sm tracking-wide uppercase">
          Licensed & Insured • Since 2006
        </span>

        <h1 className="mt-3 text-5xl md:text-6xl font-extrabold leading-tight uppercase">
          Commercial Contractors
        </h1>

        <p className="mt-3 text-base md:text-xl max-w-2xl">
          Specializing in Healthcare , Education , Federal , and Municipal
          Projects.
        </p>

        <p className="mt-2 text-sm md:text-lg font-thin text-white">
          Linking people, places, projects, and passion.
        </p>

        {/* CTAs */}
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <a
            href="tel:+13052167558"
            aria-label="Call Lee Construction Group at 305-216-7558"
            className="inline-flex items-center gap-2 uppercase bg-rust/90 px-3 py-3 rounded text-white text-sm font-semibold transition-transform duration-300 shadow-lg hover:translate-y-0.5"
          >
            <FaPhoneAlt className="text-white text-xl" />
            Call 305-216-7558
          </a>

          <a
            href="#contact"
            className="inline-flex items-center uppercase px-3 py-3 rounded border border-white/40 text-white/90 text-sm font-semibold hover:bg-white/10 transition"
          >
            Request a Proposal
          </a>
        </motion.div>

        {/* Scroll*/}
        <motion.div
          className="mt-12 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="pb-3 text-sm md:text-base text-white/90">
            Explore Our Company
          </p>
          <a href="#our-company" aria-label="Scroll to Our Company section">
            <FaRegArrowAltCircleDown className="text-white text-4xl cursor-pointer hover:scale-110 hover:translate-y-1 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
