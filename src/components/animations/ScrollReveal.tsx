"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "main section:not([data-no-reveal]):not(.is-visible)";

// Fades each <main> section in once as it scrolls into view. The styles live in
// globals.css; this only toggles classes, and does nothing when the visitor
// prefers reduced motion. Sections can opt out with data-no-reveal.
const ScrollReveal = () => {
  const pathname = usePathname();

  useEffect(() => {
    // No reveal on the admin panel: content should just be there.
    const skip =
      pathname.startsWith("/admin") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.toggle("reveal-ready", !skip);
    if (skip) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.05 }
    );

    const observeAll = () =>
      document
        .querySelectorAll<HTMLElement>(SELECTOR)
        .forEach((section) => observer.observe(section));

    // Sections rendered later (e.g. after data loads) must be picked up too,
    // or the hiding style would apply to them with nothing to reveal them.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    observeAll();

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
};

export default ScrollReveal;
