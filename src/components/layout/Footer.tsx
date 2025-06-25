import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-darkblue py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-2">
        <p className="text-white text-sm">
          © {new Date().getFullYear()} Lee Construction Inc. All Rights
          Reserved. This website was created by{" "}
          <a
            className="font-semibold underline"
            href="https://restweb.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            RESTWeb.dev
          </a>
        </p>

        {/* Discreet Admin Login Link */}
        <Link
          href="/login"
          className="text-xs text-gray-300 hover:text-white font-semibold"
        >
          Admin Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
