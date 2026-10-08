"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import { SECTORS } from "@/lib/sectors";
import { YEARS_IN_BUSINESS } from "@/lib/company";
import { button } from "@/lib/styles";

export interface ProjectImage {
  id: string;
  src: string;
  category: string;
}

// One large photo plus four smaller ones fills the opening block exactly.
const FEATURED_COUNT = 5;

// Grid spans for the opening block, so it stays a full rectangle even when a
// sector has fewer than five photos. Photos after the block are plain tiles.
function tileSpan(index: number, total: number) {
  if (index >= FEATURED_COUNT) return "";
  // Phones use 2 columns, desktop uses 4. Spans are chosen so both stay even:
  // e.g. 3 photos = one large + two side by side on phones, and 4 photos =
  // a plain 2×2 grid on phones.
  if (total === 1) return "col-span-2 row-span-2 md:col-span-4";
  if (total === 2) return "col-span-2 row-span-2";
  if (total === 4) {
    if (index === 0) return "md:col-span-2 md:row-span-2";
    if (index === 3) return "md:col-span-2";
    return "";
  }
  // 3 photos: three equal tiles on desktop (that grid uses 3 columns).
  if (total === 3) {
    return index === 0
      ? "col-span-2 row-span-2 md:col-span-1"
      : "md:row-span-2";
  }
  if (index === 0) return "col-span-2 row-span-2";
  return "";
}

const Projects = ({ images }: { images: ProjectImage[] }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [viewer, setViewer] = useState<{
    sector: string;
    index: number;
  } | null>(null);

  const sectors = SECTORS.map((sector) => ({
    ...sector,
    images: images
      .filter((img) => img.category === sector.key)
      .map((img, i) => ({
        ...img,
        alt: `${sector.title} construction project by LEE Construction, photo ${i + 1}`,
      })),
  })).filter((sector) => sector.images.length > 0);

  const viewerSector = viewer && sectors.find((s) => s.key === viewer.sector);

  return (
    <div>
      {/* Intro */}
      <section className="px-8 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
            Our <span className="text-rust">Experience</span> At A Glance
          </h2>
          <p className="mt-4 max-w-4xl text-gray-800 leading-relaxed">
            With {YEARS_IN_BUSINESS} years of experience and a promising future
            ahead, LEE Construction Group, Inc. continues to serve major clients
            such as Jackson Health Systems, the National Park Service, GSA, and
            the U.S. Navy. Backed by a skilled team, we have the manpower and
            capability to perform work throughout Florida and beyond...
          </p>
        </div>
      </section>

      {/* Sector jump bar */}
      <nav
        aria-label="Project sectors"
        className="sticky top-20 z-40 mt-8 bg-white/95 backdrop-blur border-y border-gray-200 px-8"
      >
        <ul className="max-w-6xl mx-auto flex gap-6 md:gap-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sectors.map((sector) => (
            <li key={sector.key} className="shrink-0">
              <a
                href={`#${sector.key}`}
                className="inline-flex items-baseline gap-2 py-4 font-title uppercase tracking-wide text-darkblue border-b-2 border-transparent hover:border-blue hover:text-blue transition-colors"
              >
                {sector.title}
                <span className="font-body text-sm text-gray-500 tracking-normal">
                  {sector.images.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Galleries */}
      <div className="px-8 py-12 md:py-16 space-y-16 md:space-y-20">
        {images.length === 0 && (
          <p className="max-w-6xl mx-auto text-gray-600">
            Project photos are on their way. Check back soon.
          </p>
        )}

        {sectors.map((sector) => {
          const isExpanded = expanded[sector.key];
          const featured = sector.images.slice(0, FEATURED_COUNT);
          const rest = sector.images.slice(FEATURED_COUNT);

          const tile = (img: (typeof sector.images)[number], index: number) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setViewer({ sector: sector.key, index })}
              aria-label={`View ${sector.title} photo ${index + 1} of ${sector.images.length}`}
              className={`group relative overflow-hidden bg-greybg focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue ${tileSpan(
                index,
                sector.images.length
              )}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={
                  tileSpan(index, sector.images.length).includes("col-span-2")
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          );

          return (
            <section
              key={sector.key}
              id={sector.key}
              className="max-w-6xl mx-auto scroll-mt-40"
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-8 mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-darkblue">
                    {sector.title} Projects
                  </h2>
                  <p className="mt-2 max-w-2xl text-gray-700">
                    {sector.description}
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-2 ${
                  sector.images.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
                } auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px] gap-2 md:gap-3`}
              >
                {featured.map((img, i) => tile(img, i))}
                {isExpanded &&
                  rest.map((img, i) => tile(img, i + FEATURED_COUNT))}
              </div>

              {rest.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [sector.key]: !prev[sector.key],
                    }))
                  }
                  aria-expanded={!!isExpanded}
                  className={`mt-6 ${button.outlineDark}`}
                >
                  {isExpanded
                    ? "Show Less"
                    : `View All ${sector.images.length} Images`}
                </button>
              )}
            </section>
          );
        })}
      </div>

      {viewer && viewerSector && (
        <Lightbox
          images={viewerSector.images}
          index={viewer.index}
          label={viewerSector.title}
          onIndexChange={(index) => setViewer({ ...viewer, index })}
          onClose={() => setViewer(null)}
        />
      )}
    </div>
  );
};

export default Projects;
