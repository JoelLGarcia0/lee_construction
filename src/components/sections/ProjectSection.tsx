"use client";

import Image from "next/image";
import React from "react";
import { images } from "../../../public";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { motion } from "framer-motion";
import SlideIn from "../animations/SlideIn";

const ProjectSection = () => {
  return (
    <section id="project" className="relative w-full py-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={images.whatWeDoBg}
          alt="Construction workers background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          quality={100}
          priority
        />
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-darkblue/90"></div>
      </div>

      {/* Cotent Container */}
      <div
        className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center
       text-white px-8 md:px-16"
      >
        {/* Carousel Container */}
        <div className="w-full md:w-5/6 px-10">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div className="flex justify-center items-center h-80 bg-gray-200 rounded-2xl relative">
                  <Image
                    src={images.project1}
                    alt="Project 1"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-0  bg-blue rounded-md left-0 p-2 text-white">
                    <h3 className="text-xl">South Miami Middle School</h3>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex justify-center items-center h-80 bg-gray-200 rounded-2xl relative">
                  <Image
                    src={images.project2}
                    alt="Project 1"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-0 bg-blue rounded-md left-0 p-2 text-white">
                    <h3 className="text-xl">Jackson Memorial Renovation </h3>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex justify-center items-center h-80 bg-gray-200 rounded-2xl relative">
                  <Image
                    src={images.project3}
                    alt="Project 1"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-0 bg-blue rounded-md left-0 p-2 text-white">
                    <h3 className="text-xl">Tomochichi Courthouse</h3>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="text-darkblue cursor-pointer " />
            <CarouselNext className="text-darkblue cursor-pointer " />
          </Carousel>
        </div>

        {/* Text Section */}

        <div className="w-full flex flex-col items-center text-center px-8 md:w-1/2 md:px-12">
          <h1 className="text-3xl font-bold">Projects</h1>

          <div className="w-20 h-1 bg-blue mt-4"></div>
          <SlideIn direction="right">
            <p className="mt-4 text-lg">Our recently completed projects</p>
          </SlideIn>

          <SlideIn direction="right">
            <motion.a
              href="/projects"
              className="mt-10 inline-flex shadow-lg items-center text-white bg-blue px-6 py-3 rounded-lg text-md font-bold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              See More
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.a>
          </SlideIn>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
