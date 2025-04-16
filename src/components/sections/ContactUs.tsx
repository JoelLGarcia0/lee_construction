"use client";

import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({ message: "", type: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: "Sending...", type: "pending" });

    try {
      const response = await axios.post("/api/contact", formData);
      if (response.status === 200) {
        setStatus({
          message:
            "Message sent successfully! Our Team will get back to you shortly",
          type: "success",
        });
        setFormData({ fullName: "", email: "", phone: "", message: "" });
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
      className="py-16 px-8 w-full flex justify-center bg-white text-center scroll-mt-26 md:scroll-mt-[15vh] overflow-hidden"
    >
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-darkblue pb-2">Contact Us</h1>
        <p className="text-gray-700 mt-2">
          Please submit this form and we’ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Full Name */}
          <div className="text-left">
            <label className="block font-medium text-gray-800 py-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block font-medium text-gray-800 py-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>

          {/* Phone Number */}
          <div className="text-left">
            <label className="block font-medium text-gray-800 py-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>

          {/* Message */}
          <div className="text-left">
            <label className="block font-medium text-gray-800 py-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-darkblue transition-all cursor-pointer"
          >
            Send Message
          </button>

          {/* Status Message */}
          {status.message && (
            <p
              className={`text-sm mt-2 ${
                status.type === "success" ? "text-darkblue" : "text-darkblue"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
