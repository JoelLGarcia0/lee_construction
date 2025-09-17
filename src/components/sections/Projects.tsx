"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";

interface ImageData {
  id: string;
  src: string;
  alt: string;
  order: number;
  category: string;
}

const Projects = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [images, setImages] = useState<ImageData[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const categories = [
    {
      key: "healthcare",
      title: "Healthcare",
      pill: "bg-[#e8f1fb] text-[#005bc3] ring-1 ring-[#cfe0f7]",
      accent: "bg-[#005bc3]",
      button:
        "bg-white text-[#005bc3] ring-1 ring-[#cfe0f7] hover:bg-[#e8f1fb]",
    },
    {
      key: "education",
      title: "Education",
      pill: "bg-[#B6E0BA] text-[#316938] ring-1 ring-[#cfd6ee]",
      accent: "bg-[#40AD53]",
      button:
        "bg-white text-[#122a71] ring-1 ring-[#cfd6ee] hover:bg-[#e9ecf7]",
    },
    {
      key: "government",
      title: "Government",
      pill: "bg-[#DED683] text-[#6B611F] ring-1 ring-[#efcdbf]",
      accent: "bg-[#C2B234]",
      button:
        "bg-white text-[#b7410e] ring-1 ring-[#efcdbf] hover:bg-[#f6e8e2]",
    },
    {
      key: "private",
      title: "Private",
      pill: "bg-[#f6e8e2] text-[#b7410e] ring-1 ring-[#d9deeb]",
      accent: "bg-[#b7410e]",
      button:
        "bg-white text-[#122a71] ring-1 ring-[#d9deeb] hover:bg-[#eff1f6]",
    },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/admin/images");
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Failed to load project images", err);
      }
    };

    fetchImages();
  }, []);

  // Handle hash navigation after images are loaded and component is rendered
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && images.length > 0) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const offset = 120; // Adjust based on navbar height
            const elementPosition =
              element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - offset,
              behavior: "smooth",
            });
          }
        }, 300); // Wait for content to render
      }
    };

    // Run immediately if hash exists
    handleHashNavigation();

    // Also listen for hash changes
    window.addEventListener("hashchange", handleHashNavigation);

    return () => {
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, [images.length]); // Re-run when images are loaded

  const toggleCategory = (category: string) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getImagesByCategory = (category: string) => {
    return images
      .filter((img) => img.category === category)
      .sort((a, b) => a.order - b.order);
  };

  const getVisibleImages = (category: string) => {
    const categoryImages = getImagesByCategory(category);
    return expanded[category] ? categoryImages : categoryImages.slice(0, 3);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");

    if (pathname === "/") {
      if (contactSection) {
        const offset = 120; // Adjust based on navbar height
        const elementPosition =
          contactSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      }
    } else {
      router.push("/#contact"); // Navigate to Home and scroll
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          const offset = 105; // Adjust based on navbar height
          const elementPosition =
            contactSection.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 500); // Delay scrolling after navigation
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-10">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Our <span className="text-rust">Experience</span> At A Glance
          </h1>
          <p className="text-lg max-w-4xl mx-auto leading-relaxed">
            With 18 years of experience and a promising future ahead, LEE
            Construction Group, Inc. continues to serve major clients such as
            Jackson Health Systems, the National Park Service, GSA, and the U.S.
            Navy. Backed by a skilled team, we have the manpower and capability
            to perform work throughout Florida and beyond...
          </p>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="bg-white py-8 shadow-sm top-0 z-40">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const categoryImages = getImagesByCategory(category.key);
              if (categoryImages.length === 0) return null;

              return (
                <a
                  key={category.key}
                  href={`#${category.key}`}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-sm ${category.pill}`}
                >
                  <div className="w-3 h-3 rounded-full bg-white" />
                  {category.title}
                  <span className="text-sm opacity-80">
                    ({categoryImages.length})
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mt-10">
        <div className="max-w-7xl mx-auto px-8">
          {categories.map((category) => {
            const categoryImages = getImagesByCategory(category.key);
            const visibleImages = getVisibleImages(category.key);

            if (categoryImages.length === 0) return null;

            return (
              <div
                key={category.key}
                id={category.key}
                className="mb-20 scroll-mt-36"
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div
                      className={`w-8 h-1 rounded-full ${category.accent}`}
                    ></div>
                    <h1 className="text-3xl font-bold text-darkblue">
                      {category.title} Projects
                    </h1>
                    <div
                      className={`w-8 h-1 rounded-full ${category.accent}`}
                    ></div>
                  </div>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {category.key === "healthcare" &&
                      "State-of-the-art healthcare facilities designed for patient care and operational efficiency."}
                    {category.key === "education" &&
                      "Modern educational institutions that foster learning and community growth."}
                    {category.key === "government" &&
                      "Public infrastructure projects serving communities and government operations."}
                    {category.key === "private" &&
                      "Custom commercial and private construction solutions tailored to client needs."}
                  </p>
                </div>

                {/* Images Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleImages.map((img, index) => (
                    <div
                      key={`${category.key}-${img.id || img.src}-${
                        img.order ?? index
                      }`}
                      className="relative overflow-hidden rounded-2xl shadow-lg bg-white"
                    >
                      <div className="relative aspect-[4/3] bg-[#f3f3f3]">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          // Eager-load the first row to reduce pop-in:
                          priority={index < 3 && !expanded[category.key]}
                          loading={
                            index < 3 && !expanded[category.key]
                              ? "eager"
                              : "lazy"
                          }
                        />
                      </div>

                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${category.accent} shadow-lg`}
                      >
                        {category.title}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expand/Collapse Button */}
                {categoryImages.length > 3 && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={() => toggleCategory(category.key)}
                      className={`group flex items-center gap-3 px-8 py-4 rounded-md  font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg ${category.accent}`}
                    >
                      {expanded[category.key] ? (
                        <>
                          <span>Show Less</span>
                          <MdOutlineKeyboardDoubleArrowUp
                            size={20}
                            className="group-hover:translate-y-1 transition-transform"
                          />
                        </>
                      ) : (
                        <>
                          <span>View All {categoryImages.length} Images</span>
                          <MdOutlineKeyboardDoubleArrowDown
                            size={20}
                            className="group-hover:translate-y-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-darkblue text-white py-12">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Let&apos;s discuss how we can bring your vision to life with our
            expertise and dedication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContactClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-rust text-white font-semibold rounded-lg hover:bg-rust/90 transition-colors duration-300 shadow-lg"
            >
              Get a Quote
            </button>
            <a
              href="tel:+13052167558"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-darkblue transition-colors duration-300"
            >
              Call (305) 216-7558
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
