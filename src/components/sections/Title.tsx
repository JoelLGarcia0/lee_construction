// Page header for inner pages: a navy band with a faint blueprint grid drawn
// in CSS (minor lines every 32px, major every 160px), so no photo is needed.
const grid = [
  "linear-gradient(rgba(255,255,255,0.13) 1px, transparent 1px)",
  "linear-gradient(90deg, rgba(255,255,255,0.13) 1px, transparent 1px)",
  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
  "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
].join(", ");

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <section data-no-reveal className="on-dark relative w-full overflow-hidden bg-gradient-to-r from-darkblue via-darkblue to-[#1d4fa8] px-8 py-8 md:py-9">
      {/* Blueprint grid, fading out toward the right */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: grid,
          backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
          backgroundPosition: "-1px -1px",
          maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 40%, transparent 100%)",
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto text-white">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <div className="mt-3 h-0.5 w-16 bg-rust" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default Title;
