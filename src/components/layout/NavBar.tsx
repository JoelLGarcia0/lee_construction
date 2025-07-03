"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { icons } from "../../../public";
import { Button } from "@/components/ui/button";
import { MdOutlineClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-[15vh] min-h-[100px] sticky top-0 z-50 px-4 transition-all duration-300 ${
        isScrolled ? "bg-white/50 backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="max-w-container h-full mx-auto py-4 font-body flex items-center justify-between">
        {/* Logo */}
        <Image
          width={100}
          height={80}
          src={icons.leelogoPng}
          alt="LEE Construction Logo"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:inline-flex items-center gap-7">
          <ul className="flex text-md justify-center items-center gap-7">
            <li className="relative group">
              <Link
                href="/"
                className="text-black cursor-pointer nav-underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className=" text-black cursor-pointer nav-underline"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className=" text-black cursor-pointer nav-underline"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className=" text-black cursor-pointer nav-underline"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className=" text-black cursor-pointer nav-underline"
              >
                Careers
              </Link>
            </li>
            <li>
              <Button
                asChild
                onClick={handleContactClick}
                className="px-6 py-5 bg-blue text-md text-white font-bold hover:bg-darkblue"
              >
                <Link href="#contact">Contact Us</Link>
              </Button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden text-black"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <MdOutlineClose /> : <RxHamburgerMenu />}
        </Button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -50 }} // Start off-screen slightly above
              animate={{ opacity: 1, y: 0 }} // Slide into place
              exit={{ opacity: 0, y: -50 }} // Slide back up when closing
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full border-t-3 border-darkblue bg-white flex flex-col items-center py-4 shadow-lg md:hidden"
            >
              <ul className="text-md flex flex-col justify-center items-center gap-4">
                <li>
                  <Link
                    href="/"
                    className="nav-link nav-underline"
                    onClick={() => setShowMenu(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="nav-link nav-underline"
                    onClick={() => setShowMenu(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="nav-link nav-underline"
                    onClick={() => setShowMenu(false)}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="nav-link nav-underline"
                    onClick={() => setShowMenu(false)}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="nav-link nav-underline"
                    onClick={() => setShowMenu(false)}
                  >
                    Careers
                  </Link>
                </li>
                <li className="flex justify-center">
                  <Button
                    asChild
                    onClick={handleContactClick}
                    className="text-sm px-4 py-2 bg-blue text-white font-bold rounded hover:bg-darkblue"
                  >
                    <Link href="#contact" onClick={() => setShowMenu(false)}>
                      Contact Us
                    </Link>
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavBar;
