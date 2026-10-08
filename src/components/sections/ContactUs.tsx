"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { button } from "@/lib/styles";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
  website: "", // honeypot, see below
};

const fields = [
  { name: "fullName", label: "Full Name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone Number", type: "tel", required: false, autoComplete: "tel" },
] as const;

const inputClass =
  "w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue";

const ContactUs = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<{
    message: string;
    type: "" | "pending" | "success" | "error";
  }>({ message: "", type: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: "Sending...", type: "pending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus({
          message:
            "Message sent successfully! Our Team will get back to you shortly",
          type: "success",
        });
        setFormData(emptyForm);
      } else {
        setStatus({
          message: "Failed to send message. Try again later.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-16 px-8 w-full bg-white border-t border-gray-200 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Left: heading, intro, and the form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-darkblue">
            Contact Us
          </h2>
          <p className="text-gray-700 mt-6 leading-relaxed max-w-md">
            Please submit this form and we’ll get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Honeypot: hidden from people and screen readers; bots that
                fill every field get their message silently dropped. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-semibold text-gray-700 pb-1.5"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  autoComplete={field.autoComplete}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className={inputClass}
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 pb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className={inputClass}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.type === "pending"}
              className={`w-full ${button.primary} cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {status.type === "pending" ? "Sending..." : "Send Message"}
            </button>

            {status.message && status.type !== "pending" && (
              <p
                role="status"
                className={`text-sm ${
                  status.type === "success" ? "text-green-700" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>

  {/* Right: office info and map */}
          <div id="ouroffice" className="flex flex-col bg-white border border-gray-200 border-t-[3px] border-t-darkblue p-6 md:p-8">
            <h3 className="font-title text-sm uppercase tracking-[0.2em] text-gray-500">
              Our Office
            </h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-rust text-lg mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-darkblue">Miami Office</h4>
                  <address className="not-italic text-gray-800 mt-1 leading-relaxed">
                    9771 South Dixie Hwy
                    <br />
                    Pinecrest, Florida 33156
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-rust text-lg mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-darkblue">Contact</h4>
                  <a
                    href="tel:+13052167558"
                    className="text-gray-800 mt-1 inline-block hover:text-blue hover:underline"
                  >
                    (305)-216-7558
                  </a>
                </div>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.7457453655584!2d-80.3178609237449!3d25.679721777403586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9c7aed1bc6fa9%3A0xde5f84bf80ae60bc!2s9771%20S%20Dixie%20Hwy%2C%20Pinecrest%2C%20FL%2033156!5e0!3m2!1sen!2sus!4v1742241670652!5m2!1sen!2sus"
              width="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of LEE Construction's Miami office"
              className="mt-6 w-full flex-1 min-h-[260px] border border-gray-200"
            ></iframe>
          </div>
      </div>
    </section>
  );
};

export default ContactUs;
