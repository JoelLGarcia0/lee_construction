import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-darkblue py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        {/* Footer Text */}
        <p className="text-white text-sm">
          © {new Date().getFullYear()} Lee Construction Inc. All Rights
          Reserved. This website was created by{" "}
          <a className="font-semibold" href="https://restweb.dev">
            RESTWeb.dev
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
