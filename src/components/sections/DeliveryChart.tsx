import {
  ArrowUp,
  DraftingCompass,
  HandCoins,
  HardHat,
  MoveHorizontal,
  PencilRuler,
  type LucideIcon,
} from "lucide-react";

// Compares design-build with traditional design-bid-build: same labels as the
// old chart image, rebuilt in HTML so it's sharp, on-brand, and responsive.

type Step = { label: string; icon: LucideIcon; color: string };

const PRELIMINARY: Step = {
  label: "Preliminary Drawings",
  icon: DraftingCompass,
  color: "bg-darkblue",
};
const DETAIL: Step = {
  label: "Detail Drawings",
  icon: PencilRuler,
  color: "bg-[#1d4189]",
};
const BID: Step = { label: "Bid", icon: HandCoins, color: "bg-[#2a5bb0]" };
const CONSTRUCTION: Step = {
  label: "Construction",
  icon: HardHat,
  color: "bg-blue",
};

const methods = [
  {
    title: "Design Build Method",
    steps: [PRELIMINARY, DETAIL, CONSTRUCTION],
    costAfter: 0, // cost is established after preliminary drawings
    savings: true,
  },
  {
    title: "Traditional Design + Bid Build Method",
    steps: [PRELIMINARY, DETAIL, BID, CONSTRUCTION],
    costAfter: 2, // cost is established only after bidding
    savings: false,
  },
];

// Chevron shapes. Every step after the first is notched on its left and
// overlaps the previous one, leaving an even gap along the slanted edges.
const TIP = "18px";
const firstShape = `polygon(0 0, calc(100% - ${TIP}) 0, 100% 50%, calc(100% - ${TIP}) 100%, 0 100%)`;
const shape = `polygon(0 0, calc(100% - ${TIP}) 0, 100% 50%, calc(100% - ${TIP}) 100%, 0 100%, ${TIP} 50%)`;

const CostEstablished = () => (
  <span className="flex flex-col items-center text-rust">
    <ArrowUp size={18} strokeWidth={2.5} aria-hidden="true" />
    <span className="mt-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
      Cost Established
    </span>
  </span>
);

const DeliveryChart = () => {
  return (
    <figure className="mt-14 md:mt-16">
      {/* Desktop: chevron rows on a shared 4-column grid */}
      <div className="hidden md:block space-y-10">
        {methods.map((method) => (
          <div key={method.title}>
            <h3 className="font-title text-lg uppercase tracking-wide text-darkblue">
              {method.title}
            </h3>
            <ol className="mt-3 flex">
              {method.steps.map((step, i) => (
                <li
                  key={step.label}
                  style={{ clipPath: i === 0 ? firstShape : shape }}
                  className={`flex-1 h-24 flex flex-col items-center justify-center gap-2 px-8 text-white ${
                    step.color
                  } ${i > 0 ? "-ml-[14px]" : ""}`}
                >
                  <step.icon size={26} strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-center">
                    {step.label}
                  </span>
                </li>
              ))}
              {method.savings && (
                // Same overlap as a chevron so columns line up with the row
                // below; the dashed box itself starts at the Construction tip.
                <li className="relative flex-1 -ml-[14px] h-24">
                  <div className="absolute inset-y-0 left-[14px] right-0 flex flex-col items-center justify-center gap-1 border-x border-dashed border-gray-400 text-rust">
                    <span className="text-xs font-bold uppercase tracking-wider text-center">
                      Potential Cost + Time Savings
                    </span>
                    <MoveHorizontal size={22} strokeWidth={2} aria-hidden="true" />
                  </div>
                </li>
              )}
            </ol>
            {/* "Cost Established" sits under the boundary after costAfter */}
            <div className="relative h-12">
              <span
                className="absolute top-1 -translate-x-1/2"
                style={{ left: `${(method.costAfter + 1) * 25}%` }}
              >
                <CostEstablished />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: simple vertical sequences */}
      <div className="md:hidden space-y-10">
        {methods.map((method) => (
          <div key={method.title}>
            <h3 className="font-title text-lg uppercase tracking-wide text-darkblue">
              {method.title}
            </h3>
            <ol className="mt-3 space-y-1">
              {method.steps.map((step, i) => (
                <li key={step.label}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 text-white ${step.color}`}
                  >
                    <step.icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {step.label}
                    </span>
                  </div>
                  {i === method.costAfter && (
                    <p className="flex items-center gap-2 py-2 pl-4 text-rust text-xs font-bold uppercase tracking-wider">
                      <ArrowUp size={16} strokeWidth={2.5} aria-hidden="true" />
                      Cost Established
                    </p>
                  )}
                </li>
              ))}
            </ol>
            {method.savings && (
              <p className="mt-3 flex items-center gap-2 border border-dashed border-gray-400 px-4 py-3 text-rust text-xs font-bold uppercase tracking-wider">
                <MoveHorizontal size={18} strokeWidth={2} aria-hidden="true" />
                Potential Cost + Time Savings
              </p>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
};

export default DeliveryChart;
