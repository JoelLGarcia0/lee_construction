import Link from "next/link";
import { button } from "@/lib/styles";

// Closing strip shown above the footer on inner pages.
const CallToAction = () => {
  return (
    <section className="bg-greybg border-t border-gray-200 py-12 md:py-14 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
            Ready to Start Your Project?
          </h2>
          <p className="mt-3 text-gray-700 max-w-xl">
            Let&apos;s discuss how we can bring your vision to life with our
            expertise and dedication.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <Link href="/#contact" className={button.accent}>
            Get a Quote
          </Link>
          <a href="tel:+13052167558" className={button.outlineDark}>
            Call (305) 216-7558
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
