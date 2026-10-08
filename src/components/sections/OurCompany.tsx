import Image from "next/image";
import Link from "next/link";
import { images } from "../../../public";
import { YEARS_IN_BUSINESS } from "@/lib/company";
import { button, buttonArrow } from "@/lib/styles";

// "Over N years of Experience": full years since the 2006 founding (20 in 2026).
const yearsOfExperience = YEARS_IN_BUSINESS;

const OurCompany = () => {
  return (
    <section
      id="our-company"
      className="relative py-12 md:py-16 px-8 bg-white scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left: Company Info */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
              Our Company
            </h2>
            <p className="mt-2 text-rust font-semibold">
              Building Excellence since 2006
            </p>

            <p className="mt-6 text-gray-800 leading-relaxed">
              <strong>LEE Construction Group, Inc.</strong> is a licensed
              general contractor and construction management firm with its
              headquarters in Miami, Florida. Established in 2006, we have built
              a reputation for excellence in commercial and industrial
              construction, providing high-quality solutions for both private
              and government sectors.
            </p>

            <Link href="/about" className={`mt-8 ${button.primary}`}>
              Learn More
              <span aria-hidden="true" className={buttonArrow}>
              →
            </span>
            </Link>
          </div>

          {/* Right: photo with experience badge */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={images.historicRestoration}
                alt="LEE Construction crew working from a lift on the facade of a historic courthouse"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[62%_center]"
              />
            </div>
            <p className="absolute -bottom-4 left-3 md:-bottom-6 md:-left-6 bg-darkblue text-white px-3 py-2 md:px-6 md:py-5 border-b-2 border-rust">
              <span className="block text-[9px] md:text-xs uppercase tracking-[0.2em] text-white/70">
                Over
              </span>
              <span className="block font-title text-3xl md:text-6xl leading-none tracking-wide">
                {yearsOfExperience}
              </span>
              <span className="mt-0.5 md:mt-1 block font-title text-[10px] md:text-sm uppercase tracking-[0.15em]">
                years of Experience
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurCompany;
