import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import { CalendarClock, CircleDollarSign, Gauge } from "lucide-react";
import { images } from "../../../public";
import DeliveryChart from "./DeliveryChart";

const services = [
  {
    id: "pre-construction",
    title: "Pre-Construction",
    image: images.preConstructionBg,
    alt: "Reviewing construction drawings during pre-construction",
    paragraphs: [
      "Pre-Construction is a critical first phase of any project. During Pre-Construction, our goal is not limited to simply defining project parameters such as cost and schedule. While this is an important step for every project, of even greater importance is our ability to help identify and actively plan for construction issues that may place the budget and schedule objectives at risk. Therefore, we believe it is important that we establish ourselves as an integral part of your team very early in the process.",
      "To ensure the utmost client satisfaction, we partner with owners, architects and engineers to review the scope of the project, analyzing materials, equipment, techniques and schedules and the overall impact on project costs, quality and timing. Drawings are reviewed at each stage of development for constructibility and completeness and bids are awarded to pre-qualified trade contractors to ensure that they have the proven financial strength and manpower to meet the project schedule.",
    ],
  },
  {
    id: "general-contracting",
    title: "General Contracting",
    image: null, // previous stock photo removed
    alt: "",
    // Phrases taken from the paragraph below, shown in place of a photo.
    checklist: [
      "Day-to-day oversight of the construction site",
      "Management of vendors and trades",
      "Communication of information to involved parties",
    ],
    paragraphs: [
      "We have extensive experience in the traditional General Contracting segment. As general contractors, we first create the highest level of trust and integrity with our clients. We value our role in the success of your project, and take all the steps needed to ensure the end product is one that meets your needs and makes us proud. Selecting us as your general contractor means you leave the details to us. From day-to-day oversight of the construction site and management of vendors and trades to the communication of information to involved parties throughout the course of the project.",
      "Diverse expertise across the entire construction spectrum have fortified our core competencies and greatly enhanced the company's general contracting capabilities. Additionally, we have developed and maintained successful relationships with subcontractors, vendors and suppliers that provide for efficiency, reliability, and delivery on both price and performance.",
    ],
  },
  {
    id: "construction-management",
    title: "Construction Management",
    image: null, // no image originally
    alt: "",
    // "...control over all critical aspects of construction - scheduling,
    // costs, performance" — shown in place of a photo.
    aspects: [
      { label: "Scheduling", icon: CalendarClock },
      { label: "Costs", icon: CircleDollarSign },
      { label: "Performance", icon: Gauge },
    ],
    paragraphs: [
      "Our Construction Management Team ensures that clients maintain control over all critical aspects of construction - scheduling, costs, performance, etc. Whether building for the first time or expanding existing facilities, we provide an effective management program that is focused on providing clients with a worry-free experience and the utmost satisfaction. Drawing upon the support of our scheduling, purchasing, estimating, safety and design review staff, our seasoned group of on-site field personnel serve as the “right arm” of the Owner, representing its interests in the project. Our team works solely to provide the Owner with the best quality product delivered within budget and on schedule.",
    ],
  },
  {
    id: "design-build",
    title: "Design-Build",
    image: images.plansBg,
    alt: "Architectural floor plans",
    paragraphs: [
      "Design Build is a method of building in which both the design and construction are contracted and controlled from one source, the Design-Builder. Design-Build services pertain to one company taking sole responsibility for planning, design, engineering and construction phases through a single contract with the owner. This method allows for more organization because there's one single point of accountability. Because of this, the client has more say in the project.",
      "LEE Construction's Design-Build projects deliver a total design and construction solution. Leveraging in-house experience and expertise, LEE is able to focus on the client's operational, environmental and functional requirements to drive all design control, engineering, estimating, value-engineering, risk management, scheduling and construction. We believe that understanding our client's needs makes all the difference. It's how we listen, evaluate, and execute that distinguishes us from our competition. We demonstrate nothing less than the industry's best craftsmanship and building expertise.",
    ],
  },
];

const ServicesSection = () => {
  return (
    <div id="services">
      {/* Introduction */}
      <section className="px-8 py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-darkblue font-bold">
            We are <span className="text-rust">Experts</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-gray-800 leading-relaxed">
            <p>
              LEE Construction&apos;s highly trained team of professionals
              provides a variety of construction services including
              Pre-Construction, General Contracting, Construction Management,
              and Design-Build. Supported by the latest technology, our staff
              offers innovative, cost-saving solutions that streamline the
              construction process, with ideas customized to the specific
              necessity and essentials that a particular project requires.
            </p>
            <p>
              We provide full construction management services with the
              experience and track record for evaluating and analyzing the site
              and specific construction market conditions against the actual
              construction cost of a specific project and analyzing that to the
              owner&apos;s budget.
            </p>
          </div>

          {/* Jump links to each service */}
          <nav aria-label="Services" className="mt-12">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-300">
              {services.map((service) => (
                <li key={service.id} className="border-r border-b border-gray-300">
                  <a
                    href={`#${service.id}`}
                    className="group flex h-full items-center justify-between gap-3 px-5 py-5 font-title uppercase tracking-wide text-darkblue hover:bg-darkblue hover:text-white transition-colors"
                  >
                    {service.title}
                    <span
                      aria-hidden="true"
                      className="text-rust group-hover:text-white transition-colors"
                    >
                      ↓
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Services — same layout for each, alternating sides */}
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`px-8 py-12 md:py-16 scroll-mt-20 ${
            i % 2 === 0 ? "bg-greybg" : "bg-white"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              {service.image && (
                <div
                  className={`relative min-h-[260px] md:min-h-[360px] overflow-hidden ${
                    i % 2 === 1 ? "order-last" : "order-last md:order-first"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              {/* No photo: show the section's key phrases as a panel instead */}
              {"checklist" in service && service.checklist && (
                <div
                  className={`bg-darkblue text-white p-8 md:p-10 self-center ${
                    i % 2 === 1 ? "order-last" : "order-last md:order-first"
                  }`}
                >
                  <ul className="divide-y divide-white/15">
                    {service.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-4 py-5 first:pt-0 last:pb-0 font-title text-lg uppercase tracking-wide leading-snug"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-rust text-white text-sm"
                        >
                          <FiCheck strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {"aspects" in service && service.aspects && (
                <ul
                  className={`grid grid-cols-3 self-center bg-white border border-gray-300 ${
                    i % 2 === 1 ? "order-last" : "order-last md:order-first"
                  }`}
                >
                  {service.aspects.map(({ label, icon: Icon }, j) => (
                    <li
                      key={label}
                      className={`flex flex-col items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4 py-6 sm:py-10 text-darkblue ${
                        j > 0 ? "border-l border-gray-300" : ""
                      }`}
                    >
                      <Icon strokeWidth={1.25} className="h-7 w-7 sm:h-9 sm:w-9 text-rust" aria-hidden="true" />
                      <span className="font-title text-sm sm:text-lg uppercase tracking-wide">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="self-center">
                <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
                  {service.title}
                </h2>
                <div className="mt-6 space-y-5 text-gray-800 leading-relaxed">
                  {service.paragraphs.map((text) => (
                    <p key={text.slice(0, 24)}>{text}</p>
                  ))}
                </div>
              </div>
            </div>

            {service.id === "design-build" && <DeliveryChart />}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ServicesSection;
