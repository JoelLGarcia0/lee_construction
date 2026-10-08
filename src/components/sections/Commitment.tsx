import Image from "next/image";
import { icons } from "../../../public";

const commitments = [
  { icon: icons.ruler, text: "On-time delivery & budget efficiency" },
  { icon: icons.hardhat, text: "Innovative engineering solutions" },
  { icon: icons.screwdrivers, text: "A seamless, stress-free construction process" },
];

const Commitment = () => {
  return (
    <section id="ourcommitment" className="py-12 md:py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
          A Commitment to <span className="text-rust">Excellence</span>
        </h2>

        <p className="mt-6 max-w-3xl text-gray-800 leading-relaxed">
          At <strong>LEE Construction Group, Inc.</strong>, we don&apos;t just
          build structures—we build trust and lasting relationships. Our
          experienced team delivers projects with precision, transparency, and
          efficiency. Whether it&apos;s a complex industrial project or a
          government contract, we guarantee:
        </p>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 border-t border-gray-300">
          {commitments.map((item) => (
            <li
              key={item.text}
              className="flex items-center gap-4 py-6 md:pr-6 border-b md:border-b-0 border-gray-300 font-bold text-darkblue"
            >
              <Image src={item.icon} alt="" width={40} height={40} className="h-10 w-10" />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Commitment;
