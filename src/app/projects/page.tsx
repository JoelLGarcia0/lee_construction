"use client";

import Title from "@/components/sections/Title";
import { images } from "../../../public";
import Projects from "@/components/sections/Projects";

const ProjectsPage = () => {
  return (
    <main>
      <Title
        title="Projects"
        image={images.teamTitleBg}
        objectPosition="center 65%"
      />
      <Projects />
    </main>
  );
};

export default ProjectsPage;
