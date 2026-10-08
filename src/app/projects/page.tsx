import type { Metadata } from "next";
import Title from "@/components/sections/Title";
import CallToAction from "@/components/sections/CallToAction";
import Projects from "@/components/sections/Projects";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Healthcare, education, government, and private construction projects completed by LEE Construction Group across Florida.",
};

// Admin uploads, deletes, and reorders refresh this page immediately via
// revalidatePath("/projects"); this is just a fallback.
export const revalidate = 3600;

const ProjectsPage = async () => {
  const projectImages = await prisma.projectImage.findMany({
    orderBy: { order: "asc" },
    select: { id: true, src: true, category: true },
  });

  return (
    <main>
      <Title title="Projects" />
      <Projects images={projectImages} />
      <CallToAction />
    </main>
  );
};

export default ProjectsPage;
