import { images } from "../../../public";
import Image from "next/image";
import Link from "next/link";
import { button, buttonArrow } from "@/lib/styles";

const sectors = [
  {
    key: "healthcare",
    title: "Healthcare",
    image: images.baptist,
    objectPosition: "center",
  },
  {
    key: "education",
    title: "Education",
    image: images.ftschool,
    objectPosition: "75% center",
  },
  {
    key: "government",
    title: "Government",
    image: images.county,
    objectPosition: "center 20%",
  },
  {
    key: "private",
    title: "Private",
    image: images.private2,
    objectPosition: "center 30%",
  },
];

const WhatWeDo = () => {
  return (
    <section id="whatwedo" className="on-dark relative w-full py-12 md:py-16">
      <div className="absolute inset-0">
        <Image
          src={images.whatWeDoBg}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-darkblue/90"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center text-white px-8">
        {/* Title and Text */}
        <div className="w-full md:w-5/12">
          <h2 className="text-2xl md:text-3xl font-bold">What We Do</h2>

          <p className="mt-6 leading-relaxed text-white/90">
            We specialize in commercial construction with a strong focus on
            healthcare, educational, federal, and local municipality projects.
            Our expertise ensures high-quality, code-compliant facilities that
            serve communities efficiently.
          </p>

          <Link
            href="/services"
            className={`mt-8 ${button.primaryOnDark}`}
          >
            Our Services
            <span aria-hidden="true" className={buttonArrow}>
              →
            </span>
          </Link>
        </div>

        {/* Sector tiles */}
        <div className="w-full md:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sectors.map((sector) => (
            <Link
              key={sector.key}
              href={`/projects#${sector.key}`}
              className="group relative h-56 overflow-hidden"
            >
              <Image
                src={sector.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
                style={{
                  objectFit: "cover",
                  objectPosition: sector.objectPosition,
                }}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-title text-lg uppercase tracking-wide">
                {sector.title}
                <span
                  aria-hidden="true"
                  className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
