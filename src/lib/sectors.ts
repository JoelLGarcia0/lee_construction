// Project sectors, in display order. Keys match ProjectImage.category.
export const SECTORS = [
  {
    key: "healthcare",
    title: "Healthcare",
    description:
      "State-of-the-art healthcare facilities designed for patient care and operational efficiency.",
  },
  {
    key: "education",
    title: "Education",
    description:
      "Modern educational institutions that foster learning and community growth.",
  },
  {
    key: "government",
    title: "Government",
    description:
      "Public infrastructure projects serving communities and government operations.",
  },
  {
    key: "private",
    title: "Private",
    description:
      "Custom commercial and private construction solutions tailored to client needs.",
  },
] as const;

export type SectorKey = (typeof SECTORS)[number]["key"];
