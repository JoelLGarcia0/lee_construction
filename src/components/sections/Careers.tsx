"use client";

import Image from "next/image";
import { images } from "../../../public";
import { FiPhoneCall } from "react-icons/fi";
import SlideIn from "../animations/SlideIn";

const Careers = () => {
  return (
    <section id="careers" className="w-full overflow-hidden">
      {/* Top Section - Careers Overview */}
      <div className="py-16 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Text Content */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-darkblue">
            A <span className="text-rust">Great</span> Place To Work
          </h1>

          <p className="text-gray-800 leading-relaxed">
            At LEE Construction Group, Inc. we take pride in building a team
            driven by collaboration, integrity, and innovation. With a strong
            focus on professional growth and career development, we provide
            employees with the resources and opportunities needed to excel. If
            you&apos;re looking for a dynamic work environment where your
            expertise is valued, your ideas are heard, and your contributions
            make a real impact, we invite you to join our team and help shape
            the future of construction.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <Image
            src={images.careerPic}
            alt="Construction Team"
            width={600}
            height={400}
            className="shadow-lg"
          />
        </div>
      </div>

      {/* Bottom Section - Contact Info */}
      <div className="relative py-16 px-8 text-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={images.whatWeDoBg}
            alt="Construction Background"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={100}
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-darkblue/90"></div>
        </div>

        {/* Contact Info */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            Please contact our office for a list of all current open positions
          </h2>

          {/* Phone Icon & Clickable Number */}
          <div className="mt-6 flex flex-col items-center">
            <FiPhoneCall className="text-6xl text-white mt-4 mb-4" />
            <a
              href="tel:+13052167558"
              className="mt-2 text-xl md:text-2xl font-bold hover:underline"
            >
              (305)-216-7558
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
