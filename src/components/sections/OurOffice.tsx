import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import SlideIn from "../animations/SlideIn";

const OurOffice = () => {
  return (
    <section
      id="ouroffice"
      className="py-12 w-full px-8 flex justify-center bg-greybg text-center"
    >
      <div className="w-full max-w-5xl p-6">
        {/* Content Layout */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left: Office Info */}
          <div className="w-full md:w-1/2 flex flex-col items-start space-y-4 text-left text-darkblue">
            <SlideIn direction="left">
              <h1 className="text-3xl font-bold text-darkblue text-center mb-6">
                Our Office
              </h1>
            </SlideIn>
            <div className="flex items-center gap-4 py-4">
              <FaMapMarkerAlt className="text-blue text-5xl" />

              <div>
                <SlideIn direction="left">
                  <h2 className="text-lg font-semibold">Miami Office</h2>
                  <p className="text-gray-800 py-2">9771 South Dixie Hwy</p>
                  <p className="text-gray-800 py-2">Miami, Florida 33156</p>
                </SlideIn>
              </div>
            </div>

            <div className="flex items-center py-4 gap-4">
              <FaPhoneAlt className="text-blue text-5xl" />

              <div>
                <SlideIn direction="left">
                  <h2 className="text-lg font-semibold py-2">Contact</h2>
                </SlideIn>
                <SlideIn direction="left">
                  <p className="text-gray-700">(305) 216-7558</p>
                </SlideIn>
              </div>
            </div>
          </div>

          {/* Right: Google Map */}
          <div className="w-full md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.7457453655584!2d-80.3178609237449!3d25.679721777403586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9c7aed1bc6fa9%3A0xde5f84bf80ae60bc!2s9771%20S%20Dixie%20Hwy%2C%20Pinecrest%2C%20FL%2033156!5e0!3m2!1sen!2sus!4v1742241670652!5m2!1sen!2sus"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Miami Office Location"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurOffice;
