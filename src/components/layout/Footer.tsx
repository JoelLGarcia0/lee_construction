import Image from "next/image";
import Link from "next/link";
import { icons } from "../../../public";

const pages = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/#contact", label: "Contact" },
];

const Footer = () => {
  return (
    <footer className="on-dark w-full bg-darkblue text-white text-sm border-t-2 border-rust px-8">
      {/* Logo + page links */}
      <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* The logo file is dark on transparent, so render it white here */}
        <Link href="/" aria-label="LEE Construction home" className="shrink-0">
          <Image
            src={icons.leeLogo}
            alt="LEE Construction Group"
            width={88}
            height={60}
            unoptimized
            className="brightness-0 invert"
          />
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {pages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-white/85 hover:text-white hover:underline"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Address, phone, copyright */}
      <div className="max-w-6xl mx-auto py-5 border-t border-white/15 flex flex-col lg:flex-row lg:justify-between gap-2 text-xs text-white/60">
        <p>
          <span className="whitespace-nowrap">9771 South Dixie Hwy,</span>{" "}
          <span className="whitespace-nowrap">Pinecrest, Florida 33156</span>
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <a
            href="tel:+13052167558"
            className="whitespace-nowrap hover:text-white hover:underline"
          >
            (305)-216-7558
          </a>
        </p>
        <p>
          © {new Date().getFullYear()} Lee Construction Inc. All Rights
          Reserved. This website was created by{" "}
          <a
            className="font-semibold underline hover:text-white"
            href="https://restweb.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            RESTWeb.dev
          </a>
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <Link href="/login" className="hover:text-white hover:underline">
            Admin Login
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
