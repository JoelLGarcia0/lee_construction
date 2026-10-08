"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";

interface LightboxProps {
  images: { src: string; alt: string }[];
  index: number;
  label: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const Lightbox = ({
  images,
  index,
  label,
  onIndexChange,
  onClose,
}: LightboxProps) => {
  const closeButton = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = images.length;
  const prev = () => onIndexChange((index - 1 + count) % count);
  const next = () => onIndexChange((index + 1) % count);

  // Keyboard controls, scroll lock, and focus handling while open.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
      if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, count, onClose, onIndexChange]);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  const image = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${label} photos`}
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 text-white"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-8 h-16 shrink-0">
        <p className="font-title uppercase tracking-wide">
          {label}
          <span className="ml-3 text-white/60 font-body normal-case tracking-normal">
            {index + 1} / {count}
          </span>
        </p>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="p-2 text-3xl hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <MdClose />
        </button>
      </div>

      {/* Photo */}
      <div className="relative flex-1 mx-4 md:mx-20 mb-4">
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 text-4xl bg-black/40 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <MdChevronLeft />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 text-4xl bg-black/40 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <MdChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Lightbox;
