import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { images } from "../../../public";
import { button } from "@/lib/styles";

// "...a team driven by collaboration, integrity, and innovation" — taken from
// the paragraph below and shown as a list.
const values = ["Collaboration", "Integrity", "Innovation"];

const Careers = () => {
  return (
    <div id="careers">
      {/* Careers Overview */}
      <section className="py-12 md:py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
              A <span className="text-rust">Great</span> Place To Work
            </h2>

            <p className="mt-6 text-gray-800 leading-relaxed">
              At LEE Construction Group, Inc. we take pride in building a team
              driven by collaboration, integrity, and innovation. With a strong
              focus on professional growth and career development, we provide
              employees with the resources and opportunities needed to excel.
              If you&apos;re looking for a dynamic work environment where your
              expertise is valued, your ideas are heard, and your contributions
              make a real impact, we invite you to join our team and help shape
              the future of construction.
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 border-y border-gray-200">
              {values.map((value, i) => (
                <li
                  key={value}
                  className={`flex items-center gap-3 py-4 sm:px-4 font-title text-lg uppercase tracking-wide text-darkblue ${
                    i > 0
                      ? "border-t sm:border-t-0 sm:border-l border-gray-200"
                      : "sm:pl-0"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center bg-rust text-white text-sm"
                  >
                    <FiCheck strokeWidth={3} />
                  </span>
                  {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[260px] overflow-hidden">
            <Image
              src={images.careersTeam}
              alt="Construction Team"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[center_70%]"
            />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="on-dark relative py-12 md:py-14 px-8 text-white">
        <div className="absolute inset-0">
          <Image
            src={images.whatWeDoBg}
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-darkblue/90"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <p className="max-w-xl font-title text-2xl md:text-3xl uppercase tracking-wide leading-tight">
            Please contact our office for a list of all current open positions
          </p>
          <a
            href="tel:+13052167558"
            className={`${button.accent} shrink-0 self-start md:self-auto`}
          >
            <FaPhoneAlt aria-hidden="true" />
            (305)-216-7558
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;
