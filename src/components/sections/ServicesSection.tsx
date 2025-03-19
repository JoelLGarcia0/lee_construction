"use client";

import Image from "next/image";
import { images } from "../../../public";
import SlideIn from "../animations/SlideIn";
import ScrollReveal from "../animations/ScrollReveal";

const ServicesSection = () => {
  return (
    <section id="services" className="w-full">
      {/* Introduction Section */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-4xl text-darkblue mb-6 font-bold text-center">
          We are <span className="text-rust">Experts</span>
        </h1>
        <SlideIn direction="left">
          <div className="flex flex-col md:flex-row gap-6 text-center md:text-left">
            <p className="text-lg md:w-1/2">
              LEE Construction's highly trained team of professionals provides a
              variety of construction services including Pre-Construction,
              General Contracting, Construction Management, and Design-Build.
              Supported by the latest technology, our staff offers innovative,
              cost-saving solutions that streamline the construction process,
              with ideas customized to the specific necessity and essentials
              that a particular project requires.
            </p>
            <p className="text-lg md:w-1/2">
              We provide full construction management services with the
              experience and track record for evaluating and analyzing the site
              and specific construction market conditions against the actual
              construction cost of a specific project and analyzing that to the
              owner&apos;s budget.
            </p>
          </div>
        </SlideIn>
      </div>

      {/* Service Sections */}
      <div className="space-y-16">
        {/* Pre-Construction Section */}
        <div className="relative py-10 mb-0 px-8 text-white">
          <Image
            src={images.preConstructionBg}
            alt="Pre-Construction Background"
            fill
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-darkblue/90"></div>

          <div className="relative max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center">Pre-Construction</h1>
            <div className="w-16 h-1 bg-blue my-4 mx-auto"></div>

            <SlideIn direction="right">
              <div className="flex flex-col md:flex-row gap-6">
                <p className="text-lg text-center md:text-left md:w-1/2">
                  Pre-Construction is a critical first phase of any project.
                  During Pre-Construction, our goal is not limited to simply
                  defining project parameters such as cost and schedule. While
                  this is an important step for every project, of even greater
                  importance is our ability to help identify and actively plan
                  for construction issues that may place the budget and schedule
                  objectives at risk. Therefore, we believe it is important that
                  we establish ourselves as an integral part of your team very
                  early in the process.
                </p>
                <p className="text-lg text-center md:text-left md:w-1/2">
                  To ensure the utmost client satisfaction, we partner with
                  owners, architects and engineers to review the scope of the
                  project, analyzing materials, equipment, techniques and
                  schedules and the overall impact on project costs, quality and
                  timing. Drawings are reviewed at each stage of development for
                  constructibility and completeness and bids are awarded to
                  pre-qualified trade contractors to ensure that they have the
                  proven financial strength and manpower to meet the project
                  schedule.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* General Contracting Section */}
        <div className="w-full bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 px-8">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-darkblue">
                General Contracting
              </h1>
              <div className="w-16 h-1 bg-blue my-4"></div>

              <SlideIn direction="left">
                <p className="text-lg">
                  We have extensive experience in the traditional General
                  Contracting segment. As general contractors, we first create
                  the highest level of trust and integrity with our clients. We
                  value our role in the success of your project, and take all
                  the steps needed to ensure the end product is one that meets
                  your needs and makes us proud. Selecting us as your general
                  contractor means you leave the details to us. From day-to-day
                  oversight of the construction site and management of vendors
                  and trades to the communication of information to involved
                  parties throughout the course of the project.
                </p>
              </SlideIn>
              <SlideIn direction="left">
                <p className="text-lg mt-6">
                  Diverse expertise across the entire construction spectrum have
                  fortified our core competencies and greatly enhanced the
                  company's general contracting capabilities. Additionally, we
                  have developed and maintained successful relationships with
                  subcontractors, vendors and suppliers that provide for
                  efficiency, reliability, and delivery on both price and
                  performance.
                </p>
              </SlideIn>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src={images.gcPic}
                alt="General Contracting"
                width={600}
                height={400}
                className="shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Construction Management Section*/}
        <div className="text-center max-w-6xl mx-auto px-8">
          <h1 className="text-3xl font-bold text-darkblue">
            Construction Management
          </h1>
          <div className="w-16 h-1 bg-blue my-4 mx-auto"></div>
          <ScrollReveal>
            <p className="text-lg">
              Our Construction Management Team ensures that clients maintain
              control over all critical aspects of construction - scheduling,
              costs, performance, etc. Whether building for the first time or
              expanding existing facilities, we provide an effective management
              program that is focused on providing clients with a worry-free
              experience and the utmost satisfaction. Drawing upon the support
              of our scheduling, purchasing, estimating, safety and design
              review staff, our seasoned group of on-site field personnel serve
              as the “right arm” of the Owner, representing its interests in the
              project. Our team works solely to provide the Owner with the best
              quality product delivered within budget and on schedule.
            </p>
          </ScrollReveal>
        </div>

        {/* Design-Build Section */}
        <div className="relative py-16 px-8 text-white">
          <Image
            src={images.plansBg}
            alt="Design-Build Background"
            fill
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-darkblue/90"></div>

          <div className="relative max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center">Design-Build</h1>
            <div className="w-16 h-1 bg-blue my-4 mx-auto"></div>

            <SlideIn direction="right">
              <div className="flex flex-col md:flex-row gap-6">
                <p className="text-lg text-center md:text-left md:w-1/2">
                  Design Build is a method of building in which both the design
                  and construction are contracted and controlled from one
                  source, the Design-Builder. Design-Build services pertain to
                  one company taking sole responsibility for planning, design,
                  engineering and construction phases through a single contract
                  with the owner. This method allows for more organization
                  because there's one single point of accountability. Because of
                  this, the client has more say in the project.
                </p>
                <p className="text-lg text-center md:text-left md:w-1/2">
                  LEE Construction's Design-Build projects deliver a total
                  design and construction solution. Leveraging in-house
                  experience and expertise, LEE is able to focus on the client's
                  operational, environmental and functional requirements to
                  drive all design control, engineering, estimating,
                  value-engineering, risk management, scheduling and
                  construction. We believe that understanding our client&apos;s
                  needs makes all the difference. It&apos;s how we listen,
                  evaluate, and execute that distinguishes us from our
                  competition. We demonstrate nothing less than the
                  industry&apos;s best craftsmanship and building expertise.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Chart Section */}
        <div className="max-w-6xl mx-auto flex justify-center items-center -mt-12 px-4 ">
          <div className="w-full max-w-4xl">
            <Image
              src={images.chart1}
              alt="Project Metrics Chart"
              width={1000}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
