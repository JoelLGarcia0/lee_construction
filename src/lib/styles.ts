// Shared button styles: square, uppercase, letter-spaced. Keep every CTA on
// the site using one of these so buttons look consistent.
const shared =
  "group/btn inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-colors";
const base = `${shared} px-7 py-4 text-sm`;
const compact = `${shared} px-4 py-2.5 text-[13px]`;

export const button = {
  primary: `${base} bg-blue text-white hover:bg-darkblue`,
  // Same look as primary, with a hover that stays visible on navy sections.
  primaryOnDark: `${base} bg-blue text-white hover:bg-white hover:text-darkblue`,
  // Smaller primary, for the navbar.
  primaryCompact: `${compact} bg-blue text-white hover:bg-darkblue`,
  accent: `${base} bg-rust text-white hover:bg-[#963409]`,
  outlineLight: `${base} border border-white/70 text-white hover:bg-white hover:text-darkblue`,
  outlineDark: `${base} border border-darkblue text-darkblue hover:bg-darkblue hover:text-white`,
};

// Put on a "→" inside a button: nudges it right when the button is hovered.
export const buttonArrow =
  "inline-block transition-transform duration-200 group-hover/btn:translate-x-1";
