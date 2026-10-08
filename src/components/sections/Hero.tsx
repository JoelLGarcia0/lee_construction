import { getImageProps } from "next/image";
import { images } from "../../../public";
import { FaPhoneAlt } from "react-icons/fa";
import { FOUNDED_YEAR } from "@/lib/company";
import { button } from "@/lib/styles";

// Two crops of the same (mirrored) photo: a wide one for desktop and a tall
// one centered on the crane for phones, so neither gets stretched.
// The desktop hero is never narrower than ~1700px of rendered image (it's
// cropped to cover a tall-ish box), so request at least that much.
const {
  props: { srcSet: desktopSrcSet },
} = getImageProps({
  src: images.hero,
  alt: "",
  width: 4000,
  height: 1818,
  sizes: "(min-width: 1700px) 100vw, 1700px",
  priority: true,
});
const {
  props: { srcSet: mobileSrcSet, ...mobileProps },
} = getImageProps({
  src: images.heroMobile,
  alt: "",
  width: 1403,
  height: 2300,
  sizes: "100vw",
  priority: true,
});

const Hero = () => {
  return (
    <section data-no-reveal className="on-dark relative w-full min-h-[560px] h-[75vh] max-h-[760px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={desktopSrcSet}
            sizes="(min-width: 1700px) 100vw, 1700px"
          />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" is in mobileProps */}
          <img
            {...mobileProps}
            srcSet={mobileSrcSet}
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
        </picture>
        {/* Darker on the left where the text sits, so more of the photo shows */}
        <div className="absolute inset-0 bg-gradient-to-r from-darkblue/95 via-darkblue/75 to-darkblue/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 text-white">
        <p className="hero-in text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/80">
          Licensed &amp; Insured <span aria-hidden="true">•</span> Since{" "}
          {FOUNDED_YEAR}
        </p>

        <h1
          className="hero-in mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]"
          style={{ animationDelay: "80ms" }}
        >
          Commercial Contractors
        </h1>

        <div
          className="hero-in mt-6 h-px w-24 bg-rust"
          style={{ animationDelay: "160ms" }}
          aria-hidden="true"
        ></div>

        <p
          className="hero-in mt-6 max-w-2xl text-base md:text-lg"
          style={{ animationDelay: "240ms" }}
        >
          Specializing in Healthcare, Education, Federal, and Municipal
          Projects.
        </p>

        <p
          className="hero-in mt-2 text-sm md:text-base font-light text-white/80"
          style={{ animationDelay: "300ms" }}
        >
          Linking people, places, projects, and passion.
        </p>

        <div
          className="hero-in mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "380ms" }}
        >
          <a
            href="tel:+13052167558"
            aria-label="Call Lee Construction Group at 305-216-7558"
            className={button.accent}
          >
            <FaPhoneAlt aria-hidden="true" />
            Call 305-216-7558
          </a>
          <a href="#contact" className={button.outlineLight}>
            Request a Proposal
          </a>
        </div>
      </div>

      {/* Scroll */}
      <a
        href="#our-company"
        aria-label="Scroll to Our Company section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
      >
        Explore Our Company
        <span aria-hidden="true" className="h-8 w-px bg-white/50"></span>
      </a>
    </section>
  );
};

export default Hero;
