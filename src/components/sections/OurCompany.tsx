"use client";

import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const OurCompany = () => {
  return (
    <section
      id="our-company"
      className=" relative py-10 px-8 overflow-hidden bg-white text-center scroll-mt-26 md:scroll-mt-[15vh]"
    >
      {/* Title Section */}

      <h1 className="text-3xl font-bold text-darkblue">Our Company</h1>

      <h2 className="text-lg text-black mt-2">
        Building Excellence since 2006
      </h2>

      {/* Content Section*/}
      <div className="mt-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {/* Left: Company Info */}
        <div>
          <p className="text-gray-800 leading-relaxed">
            <strong>LEE Construction Group, Inc.</strong> is a licensed general
            contractor and construction management firm with its headquarters in
            Miami, Florida. Established in 2006, we have built a reputation for
            excellence in commercial and industrial construction, providing
            high-quality solutions for both private and government sectors.
          </p>
        </div>

        {/* Right: Checkmarks */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-blue text-2xl" />

            <span className="font-medium">Over 19 years of Experience</span>
          </div>

          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-blue text-2xl" />

            <span className="font-medium">
              $50 Million Single Project Bonding Limit
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-blue text-2xl" />

            <span className="font-medium">
              $100 Million Aggregate Bonding Capacity
            </span>
          </div>
        </div>
      </div>

      {/* Learn More Button*/}

      <motion.a
        href="/about"
        className="mt-10 inline-flex shadow-lg items-center text-white bg-blue px-6 py-3 rounded text-md font-bold transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Learn More
        <motion.span
          className="ml-2"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </motion.a>
    </section>
  );
};

export default OurCompany;
