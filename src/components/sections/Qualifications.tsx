import Link from "next/link";
import { FOUNDED_YEAR, YEARS_IN_BUSINESS } from "@/lib/company";
import { button, buttonArrow } from "@/lib/styles";

// Laid out like the title block on a construction drawing: labeled cells in a
// ruled grid. Add rows here as the client supplies them (e.g. license number,
// certifications, SAM UEI / CAGE code, NAICS codes).
const qualifications = [
  { label: "Single project bonding", value: "$50 million" },
  { label: "Aggregate bonding", value: "$100 million" },
  { label: "Established", value: `${FOUNDED_YEAR} · ${YEARS_IN_BUSINESS} years` },
  { label: "Headquarters", value: "Miami, Florida" },
  {
    label: "Delivery methods",
    value:
      "Pre-construction, general contracting, construction management, design-build",
  },
  {
    label: "Sectors",
    value: "Healthcare, education, federal, municipal, private",
  },
  { label: "Status", value: "Licensed & insured" },
  {
    label: "Service area",
    value: "Throughout Florida and beyond",
  },
];

const Qualifications = () => {
  return (
    <section id="qualifications" className="py-12 md:py-16 px-8 bg-greybg">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-14">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
            Qualifications
          </h2>
          <p className="mt-6 text-gray-800 leading-relaxed">
            Bonding capacity, experience, and delivery methods for owners,
            facility managers, and contracting officers evaluating LEE
            Construction Group for their next project.
          </p>
          <Link
            href="/#contact"
            className={`mt-8 ${button.outlineDark}`}
          >
            Request a Proposal
            <span aria-hidden="true" className={buttonArrow}>
              →
            </span>
          </Link>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 bg-white border border-darkblue">
          {qualifications.map((item) => (
            <div
              key={item.label}
              className="px-5 py-4 border-darkblue/25 border-b sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2):nth-child(odd)]:border-b-0 last:border-b-0"
            >
              <dt className="font-title text-xs uppercase tracking-widest text-gray-500">
                {item.label}
              </dt>
              <dd className="mt-1 font-bold text-darkblue leading-snug">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Qualifications;
