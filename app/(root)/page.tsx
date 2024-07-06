import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="container mx-auto text-center py-20">
            <h1 className="text-4xl font-bold">Welcome to DebateX</h1>
            <p className="mt-4">The platform for spirited debates and discussions</p>
          </div>
        </section>

        {/* Aims Section */}
        <section id="aims" className="aims-section bg-gray-100 py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center">Our Aims</h2>
            <p className="mt-4 text-center">
              At DebateX, we aim to provide a platform for constructive debates and discussions on various topics.
            </p>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="contact-section py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center">Contact Us</h2>
            <p className="mt-4 text-center">Have questions? Feel free to reach out to us!</p>
            <form className="mt-8 max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </section>

        {/* Additional Sections as Needed */}
        <section id="additional" className="additional-section bg-gray-100 py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center">Additional Information</h2>
            <p className="mt-4 text-center">
              More information about our platform, features, and upcoming events.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
