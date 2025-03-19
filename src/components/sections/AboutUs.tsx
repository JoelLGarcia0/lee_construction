"use client";

import Image from "next/image";
import { icons, images } from "../../../public";
import { TbArrowNarrowDownDashed } from "react-icons/tb";
import SlideIn from "../animations/SlideIn";
import ScrollReveal from "../animations/ScrollReveal";

const AboutUs = () => {
  return (
    <section id="about" className="relative w-full py-10 bg-white">
      {/* Background Image - Blueprint Effect */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src={images.blueprintBg}
          alt="Blueprint Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={100}
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 text-center">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-darkblue">Our Story</h1>
        <h2 className="text-lg md:text-2xl text-rust font-semibold mt-4">
          The History of LEE Construction Group, Inc.
        </h2>

        {/* Timeline Layout (Column on Small Screens, Grid on Medium+) */}
        <div className="mt-10 flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
          {/* Top Left: Content */}
          <div className="text-left space-y-4">
            <SlideIn direction="left">
              <p className="text-gray-800 leading-relaxed">
                Founded in 2006, LEE Construction Group, Inc. began as a
                licensed general contractor and construction management firm in
                Miami, Florida. From the start, our mission has been to provide
                high-quality commercial and industrial construction services,
                delivering projects with precision, efficiency, and trust.
              </p>
            </SlideIn>
          </div>

          {/* Top Right: Dashed Line (Hidden on Small Screens) */}
          <div className="relative hidden mt-6 md:block">
            <Image
              src={icons.line1}
              width={150}
              height={150}
              alt="Blueprint Background"
              quality={100}
              priority
            />
          </div>

          {/* Arrow for Small Screens */}
          <div className="md:hidden flex justify-center my-4">
            <TbArrowNarrowDownDashed className="text-darkblue text-4xl" />
          </div>

          {/* Middle Left: Dashed Line (Hidden on Small Screens) */}
          <div className="relative hidden px-6 py-6 md:block ml-auto">
            <Image
              src={icons.line2}
              width={200}
              height={200}
              alt="Blueprint Background"
              quality={100}
              priority
            />
          </div>

          {/* Middle Right: Content */}
          <div className="text-left space-y-4">
            <SlideIn direction="right">
              <p className="text-gray-800 leading-relaxed">
                Over the years, our expertise has expanded to include
                healthcare, education, federal, and municipal projects, allowing
                us to successfully manage increasingly complex developments
                across both the private and government sectors.
              </p>
            </SlideIn>
          </div>

          {/* Arrow for Small Screens */}
          <div className="md:hidden flex justify-center my-4">
            <TbArrowNarrowDownDashed className="text-darkblue text-4xl" />
          </div>

          {/* Bottom Left: Content */}
          <div className="text-left space-y-4">
            <SlideIn direction="left">
              <p className="text-gray-800 leading-relaxed">
                As we grew, our unwavering dedication to excellence and
                innovation earned us industry-leading certifications,
                solidifying our reputation as a trusted partner in the
                construction sector. These credentials reflect our commitment to
                upholding the highest standards of quality, safety, and
                efficiency in every project we undertake.
              </p>
            </SlideIn>
          </div>

          {/* Bottom Right: Dashed Line (Hidden on Small Screens) */}
          <div className="relative hidden mt-6  md:block">
            <Image
              src={icons.line1}
              width={150}
              height={150}
              alt="Blueprint Background"
              quality={100}
              priority
            />
          </div>

          {/* Arrow for Small Screens */}
          <div className="md:hidden flex justify-center my-4">
            <TbArrowNarrowDownDashed className="text-darkblue text-4xl" />
          </div>
        </div>

        {/* Bottom Section - Bonding Capacity */}
        <div className="mt-12 text-left">
          <ScrollReveal>
            <p className="text-gray-800 leading-relaxed">
              With a bonding capacity of $100 million Aggregate and $50 million
              per Single Project, we continue to expand our portfolio,
              successfully completing projects for major clients, including
              government agencies, healthcare facilities, and large-scale
              infrastructure developments.
            </p>
            <p className="text-gray-800 leading-relaxed mt-4">
              At LEE Construction Group, we take pride in our deep industry
              knowledge, supported by a team of professionals ranging from
              former general contractors to retired government officials with
              extensive experience in government contracting and private sector
              projects. From design-build projects to complex public and private
              sector initiatives, we have built a reputation for delivering
              quality workmanship, value engineering, and seamless project
              execution—ensuring that every project meets and exceeds our
              clients expectations.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
