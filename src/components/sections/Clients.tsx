import Image from "next/image";
import { logos } from "../../../public";

const clientLogos = [
  { src: logos.jackson, name: "Jackson Health System", width: 130, height: 75 },
  { src: logos.clevelandClinic, name: "Cleveland Clinic", width: 150, height: 85 },
  { src: logos.baptist, name: "Baptist Health", width: 140, height: 80 },
  { src: logos.memorial, name: "Memorial Healthcare System", width: 140, height: 80 },
  { src: logos.browardHealth, name: "Broward Health", width: 110, height: 65 },
  { src: logos.gsa, name: "U.S. General Services Administration", width: 80, height: 60 },
  { src: logos.nationalParkServices, name: "National Park Service", width: 80, height: 106 },
  { src: logos.miamiDadeCounty, name: "Miami-Dade County", width: 135, height: 75 },
  { src: logos.browardCounty, name: "Broward County", width: 140, height: 80 },
  { src: logos.miamiDadeSchools, name: "Miami-Dade County Public Schools", width: 80, height: 80 },
];

const Clients = () => {
  return (
    <section className="py-12 md:py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
          Our Clients
        </h2>

        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-t border-l border-gray-200">
          {clientLogos.map((logo) => (
            <li
              key={logo.name}
              className="flex items-center justify-center h-32 p-4 border-r border-b border-gray-200"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                width={logo.width}
                height={logo.height}
                className="object-contain max-h-20 w-auto grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
