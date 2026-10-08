import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import { images } from "../../../public";

// The story is chronological, so it's laid out as a timeline. Only the first
// marker is labeled — "2006" comes from the paragraph itself.
const story = [
  {
    label: "2006",
    text: "Founded in 2006, LEE Construction Group, Inc. began as a licensed general contractor and construction management firm in Miami, Florida. From the start, our mission has been to provide high-quality commercial and industrial construction services, delivering projects with precision, efficiency, and trust.",
  },
  {
    text: "Over the years, our expertise has expanded to include healthcare, education, federal, and municipal projects, allowing us to successfully manage increasingly complex developments across both the private and government sectors.",
  },
  {
    text: "As we grew, our unwavering dedication to excellence and innovation earned us industry-leading certifications, solidifying our reputation as a trusted partner in the construction sector. These credentials reflect our commitment to upholding the highest standards of quality, safety, and efficiency in every project we undertake.",
  },
];

const strengths = [
  "Quality workmanship",
  "Value engineering",
  "Seamless project execution",
];

const AboutUs = () => {
  return (
    <div id="about">
      {/* Our Story */}
      <section className="py-12 md:py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
              Our Story
            </h2>
            <p className="mt-2 text-rust font-semibold">
              The History of LEE Construction Group, Inc.
            </p>
            <div className="relative mt-8 flex-1 min-h-[320px] overflow-hidden hidden lg:block">
              <Image
                src={images.aboutStory}
                alt="Mid-rise building under construction with a tower crane and palm trees"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                // Anchor to the top so the crane is never cropped; any excess
                // height is trimmed from the street at the bottom instead.
                className="object-cover object-top"
              />
            </div>
          </div>

          <ol className="relative self-start ml-2 lg:mt-14">
            {story.map((item, i) => (
              <li
                key={i}
                // Each item draws the line from its marker's center down to the
                // next marker's center, so it starts and ends exactly on markers.
                className={`relative pl-8 md:pl-10 ${
                  i < story.length - 1
                    ? "pb-12 md:pb-16 before:absolute before:left-0 before:top-[13px] before:h-full before:w-px before:bg-gray-300"
                    : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[6.5px] top-1.5 h-3.5 w-3.5 bg-rust"
                ></span>
                {item.label && (
                  <p className="font-title text-2xl tracking-wide text-darkblue leading-none mb-3">
                    {item.label}
                  </p>
                )}
                <p className="text-gray-800 leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bonding capacity */}
      <section className="on-dark py-12 md:py-14 px-8 bg-darkblue text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <dl className="grid grid-cols-2 border-t border-white/25">
            <div className="pt-5 pr-6">
              <dt className="sr-only">Aggregate bonding capacity</dt>
              <dd className="font-title text-3xl sm:text-4xl md:text-5xl tracking-wide whitespace-nowrap">
                $100 Million
              </dd>
              <dd className="mt-2 text-sm uppercase tracking-[0.15em] text-white/70">
                Aggregate
              </dd>
            </div>
            <div className="pt-5 pl-6 border-l border-white/25">
              <dt className="sr-only">Single project bonding capacity</dt>
              <dd className="font-title text-3xl sm:text-4xl md:text-5xl tracking-wide whitespace-nowrap">
                $50 Million
              </dd>
              <dd className="mt-2 text-sm uppercase tracking-[0.15em] text-white/70">
                per Single Project
              </dd>
            </div>
          </dl>
          <p className="leading-relaxed text-white/90">
            With a bonding capacity of $100 million Aggregate and $50 million per
            Single Project, we continue to expand our portfolio, successfully
            completing projects for major clients, including government
            agencies, healthcare facilities, and large-scale infrastructure
            developments.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-center">
          {/* The three strengths named in the paragraph, pulled out as a list */}
          <ul className="border-y border-gray-200">
            {strengths.map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-4 py-5 font-title text-xl uppercase tracking-wide text-darkblue ${
                  i > 0 ? "border-t border-gray-200" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center bg-rust text-white text-sm"
                >
                  <FiCheck strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-800 leading-relaxed">
            At LEE Construction Group, we take pride in our deep industry
            knowledge, supported by a team of professionals ranging from former
            general contractors to retired government officials with extensive
            experience in government contracting and private sector projects.
            From design-build projects to complex public and private sector
            initiatives, we have built a reputation for delivering quality
            workmanship, value engineering, and seamless project
            execution—ensuring that every project meets and exceeds our clients
            expectations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
