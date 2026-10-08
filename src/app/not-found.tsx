import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { icons } from "../../public";
import { button, buttonArrow } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-white px-8 py-20">
      {/* Large faded logo behind the content */}
      <Image
        src={icons.leeLogoFull}
        alt=""
        width={2592}
        height={1988}
        unoptimized
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(560px,90vw)] h-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
      />

      <div className="relative text-center">
        <p className="font-title text-8xl md:text-9xl font-bold leading-none tracking-wide text-darkblue">
          404
        </p>
        <div className="mx-auto mt-5 h-0.5 w-16 bg-rust" aria-hidden="true"></div>
        <h1 className="mt-5 text-xl md:text-2xl font-bold text-darkblue">
          Page Not Found
        </h1>
        <Link href="/" className={`mt-8 ${button.primary}`}>
          Back to Home
          <span aria-hidden="true" className={buttonArrow}>
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
