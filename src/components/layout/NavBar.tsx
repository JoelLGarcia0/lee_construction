"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { icons } from "../../../public";
import { MdOutlineClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPhoneAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { button } from "@/lib/styles";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
];

const PHONE_HREF = "tel:+13052167558";
const PHONE_LABEL = "(305)-216-7558";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setShowMenu(false), [pathname]);

  // On the homepage, scroll to the form ourselves: the open mobile menu locks
  // page scrolling, so the browser's own jump to #contact would be blocked.
  const handleContactClick = (e: React.MouseEvent) => {
    setShowMenu(false);
    if (pathname !== "/") return; // other pages: navigate to /#contact normally
    e.preventDefault();
    document.body.style.overflow = "";
    requestAnimationFrame(() =>
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    );
    history.replaceState(null, "", "/#contact");
  };

  // Keep the page behind the open mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  return (
    <>
      {/* Top bar (desktop): scrolls away; the main bar below stays sticky */}
      <div className="on-dark hidden md:block bg-darkblue text-white/80 text-xs px-4">
        <div className="max-w-6xl h-8 mx-auto flex items-center justify-between">
          <p className="tracking-wide">
            9771 South Dixie Hwy, Pinecrest, Florida 33156
          </p>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 font-bold tracking-wider hover:text-white"
          >
            <FaPhoneAlt aria-hidden="true" className="text-[10px]" />
            {PHONE_LABEL}
          </a>
        </div>
      </div>

      <header
        className={`w-full h-20 sticky top-0 z-50 px-4 transition-colors duration-300 ${
          showMenu
            ? "bg-white border-b border-black/5"
            : isScrolled
              ? "bg-white/90 backdrop-blur-md border-b border-black/5"
              : "bg-white border-b border-transparent"
        }`}
      >
        <nav className="max-w-6xl h-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="LEE Construction home">
            <Image
              width={96}
              height={66}
              src={icons.leeLogo}
              alt="LEE Construction Group"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-underline font-title text-[15px] uppercase tracking-[0.08em] transition-colors ${
                      active
                        ? "text-darkblue nav-underline-active"
                        : "text-darkblue hover:text-blue"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/#contact"
                onClick={handleContactClick}
                className={button.primaryCompact}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Mobile: call + menu buttons */}
          <div className="md:hidden flex items-center gap-1">
            {/* Hidden while the menu is open; the menu has its own Call button */}
            {!showMenu && (
              <a
                href={PHONE_HREF}
                aria-label={`Call ${PHONE_LABEL}`}
                className="flex h-10 w-10 items-center justify-center text-rust"
              >
                <FaPhoneAlt />
              </a>
            )}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-2xl text-darkblue"
              onClick={() => setShowMenu(!showMenu)}
              aria-label={showMenu ? "Close menu" : "Open menu"}
              aria-expanded={showMenu}
              aria-controls="mobile-menu"
            >
              {showMenu ? <MdOutlineClose /> : <RxHamburgerMenu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="md:hidden absolute top-full left-0 w-full h-[calc(100dvh-5rem)] overflow-y-auto bg-white border-t border-gray-200 px-6 pt-2 pb-8 flex flex-col"
              >
                <ul className="divide-y divide-gray-200">
                  {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setShowMenu(false)}
                          className={`flex items-center justify-between py-4 pl-3 border-l-[3px] font-title text-2xl uppercase tracking-wide ${
                            active
                              ? "border-rust text-darkblue"
                              : "border-transparent text-darkblue/80"
                          }`}
                        >
                          {link.label}
                          <span aria-hidden="true" className="text-rust text-lg">
                            →
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto pt-8 grid gap-3">
                  <a href={PHONE_HREF} className={button.accent}>
                    <FaPhoneAlt aria-hidden="true" />
                    Call {PHONE_LABEL}
                  </a>
                  <Link
                    href="/#contact"
                    onClick={handleContactClick}
                    className={button.primary}
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
