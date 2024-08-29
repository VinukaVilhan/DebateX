import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "../(root)/Styles/page.css";

//------------ images----------------
import RitharaImg from "@/public/images/team/Rithara.png";
import JalinaImg from "@/public/images/team/Jalina.png";
import AkithImg from "@/public/images/team/Akith.png";
import DulminiImg from "@/public/images/team/Dulmini.png";
import VinukaImg from "@/public/images/team/Vinuka.png";
import VisionImg from "@/public/images/icons8-light-on-100.png";
import MissionImg from "@/public/images/icons8-mission-100 (1).png";
import MedalImg from "@/public/images/icons8-medals-100 (1).png";
import ComImg from "@/public/images/icons8-people-working-together-100.png";
import LawImg from "@/public/images/icons8-law-100.png";
import EventImg from "@/public/images/icons8-schedule-100.png";
import GearImg from "@/public/images/icons8-gear-100.png";
import InnovationImg from "@/public/images/icons8-innovation-100.png";
import ThinkImg from "@/public/images/icons8-thinking-100.png";
import EduImg from "@/public/images/icons8-education-100.png";
import CommImg from "@/public/images/icons8-communication-100.png";
import AboutusImg from "@/public/images/Meeting.jpg";

import FbImg from "@/public/images/icons8-facebook-100 (2).png";
import TwitterImg from "@/public/images/icons8-twitter-100.png";
import LinkedinImg from "@/public/images/icons8-linked-in-100.png";
import InsterImg from "@/public/images/icons8-instagram-100.png";

import { CaretRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr"; // or wherever the CaretRight icon is from

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* Hero Section */}

        <section id="hero" className="hero-section bg-[#292445] text-white">
          <div className="container text-center flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold px-28">
              Engage in Intellectual Debate and Hone Your Skills with DebateX
            </h1>
            <p className="mt-4 text-lg mx-28">
              DebateX is a platform designed to foster critical thinking and
              public speaking skills through engaging and structured debates.
            </p>
          </div>
        </section>

        <section>
          <div className="flex justify-center items-center space-x-12 w-full bg-[#413A67] py-12">
            <button className="bg-[#58224de4] font-bold flex items-center justify-between gap-2 border border-white text-white py-4 px-6 rounded-full">
              Get Started
              <CaretRight size={16} />
            </button>
            <button className="bg-[#58224de4] font-bold flex items-center justify-between gap-2 border border-white text-white py-4 px-6 rounded-full">
              Host a competition
              <CaretRight size={16} />
            </button>
            <button className="bg-[#58224de4] font-bold flex items-center justify-between gap-2 border border-white text-white py-4 px-6 rounded-full">
              Participate a competition
              <CaretRight size={16} />
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section
          id="stats"
          className="stats-section bg-[#050505] text-white py-20"
        >
          <div className="container mx-auto text-center">
            <div className="grid grid-cols-4 gap-8">
              <div>
                <h2 className="text-4xl font-bold">100M</h2>
                <p>App downloads</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">4.75+</h2>
                <p>Average review</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">20M</h2>
                <p>Active users</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">40+</h2>
                <p>Competitions</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="bg-#14142A text-white mb-16 flex flex-col items-center mx-4"
        >
          <h2 className="text-4xl mb-20 font-bold">
            <br></br>
            <br></br>
            <center>About Us</center>
          </h2>

          <div className="container flex mx-12 gap-4">
            <div className="image-container w-1/2">
              <Image
                src={AboutusImg}
                alt="About Us Image"
                className="w-4/5 mx-auto"
              />
            </div>

            <div className="flex flex-col w-1/2 ml-4">
              <p className="text-2xl font-bold mb-12">
                Welcome to DebateX, the ultimate online debating platform where
                ideas meet, challenge, and evolve.
              </p>
              <div className="text-xl ml-4 mr-12">
                <div className="my-8 flex justify-between">
                  <a href="#vision-mission" className="hover:text-indigo-500">
                    Vision and Mission of DebateX
                  </a>
                 
                  <ArrowUpRight size={32} />
                </div>
                <hr className="border-[#2f466a85]" />
                <div className="my-8 flex justify-between">
                  
                  <a href="#services" className="hover:text-indigo-500">
                    DebateX Services
                  </a>
                  <ArrowUpRight size={32} />
                </div>
                <hr className="border-[#2f466a85]" />
                <div className="my-8 flex justify-between">
                  <a href="#team" className="hover:text-indigo-500">
                    DebateX Expert Team
                  </a>
                  
                  <ArrowUpRight size={32} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aims Section */}
        <section id="aims" className="aims-section bg-[#9496D9] py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold">Our Aims</h2>
            <br></br>
            <br></br>
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="aim-item1">
                <Image src={ThinkImg} alt="THINK Image" className="imgicon2" />
                <br></br>
                <h3 className="text-xl font-bold">
                  Encourage Critical Thinking
                </h3>
                <br></br>
                <p>
                  We aim to sharpen participant&rsquo;s analytical skills by
                  providing a platform that challenges them to think deeply and
                  articulate their thoughts clearly.
                </p>
              </div>
              <div className="aim-item2">
                <Image
                  src={EduImg}
                  alt="Educatiom Image"
                  className="imgicon2"
                />
                <br></br>
                <h3 className="text-xl font-bold">
                  Facilitate Lifelong Learning
                </h3>
                <br></br>
                <p>
                  We are dedicated to providing a platform that continuously
                  educates and informs our users, helping them stay abreast of
                  current issues and trends while cultivating a lifelong passion
                  for learning and intellectual growth.
                </p>
              </div>
              <div className="aim-item3">
                <Image
                  src={CommImg}
                  alt="communication Image"
                  className="imgicon2"
                />
                <br></br>
                <h3 className="text-xl font-bold">
                  Enhance Communication Skills
                </h3>
                <br></br>
                <p>
                  Our platform provides various tools and resources to help
                  users improve their debating and communication abilities,
                  making it easier for them to articulate their thoughts clearly
                  and persuasively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section
          id="vision-mission"
          className="vision-mission-section bg-[#14142A] text-white py-16"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold">Our Vision & Mission</h2>
            <div className="grid grid-cols-2 gap-8 mt-20">
              <div className="card1">
                <Image src={VisionImg} alt="Vision Image" className="img1" />
                <br></br>
                <h3 className="text-2xl font-bold">Vision</h3>
                <br></br>
                <p className="text-xl font-semibold">
                  To be the premier online platform for fostering intellectual
                  growth, critical thinking, and respectful discourse through
                  engaging and dynamic debates.
                </p>
              </div>
              <div className="card2">
                <Image src={MissionImg} alt="Mission Image" className="img2" />
                <br></br>
                <h3 className="text-2xl font-bold">Mission</h3>
                <br></br>
                <p className="text-xl font-semibold">
                  Our mission is to foster a diverse community where individuals
                  can debate, challenge ideas, and enhance their communication
                  skills. We provide a supportive environment that promotes
                  respectful dialogue, perspective exchange, and the art of
                  debate, empowering members to become confident, informed, and
                  persuasive speakers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className=" bg-[#9496D9] py-16 px-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Services</h2>
            <p className="text-xl mb-6 font-semibold">
              Unlock Your Debating skills with DebateX Services
            </p>
            <div className="grid grid-cols-3 mt-8">
              <div className="service-item1">
                <div className="w-16 h-16 flex justify-center items-center overflow-hidden rounded-full">
                  <Image src={MedalImg} alt="medal Image" className="imgicon" />
                </div>
                <br></br>
                <h3 className="text-xl font-bold">
                  Debate Competitions and Tournaments
                </h3>
                <p>
                  Organizing and hosting online and offline debate competitions.
                </p>
              </div>
              <div className="service-item2">
                <div className="w-16 h-16 flex justify-center items-center overflow-hidden rounded-full">
                  <Image
                    src={ComImg}
                    alt="community Image"
                    className="imgicon"
                  />
                </div>
                <br></br>
                <h3 className="text-xl font-bold">Community and Networking</h3>
                <p>
                  Facilitating networking opportunities through forums,
                  discussion boards, and social media groups.
                </p>
              </div>
              <div className="service-item3">
                <div className="w-16 h-16 flex justify-center items-center overflow-hidden rounded-full">
                  <Image src={LawImg} alt="law Image" className="imgicon" />
                </div>
                <br></br>
                <h3 className="text-xl font-bold">Judging and Feedback</h3>
                <p>
                  Offering professional judging services for debates and
                  providing detailed feedback and scoring to help debaters
                  improve their skills.
                </p>
              </div>
              <div className="service-item4">
                <div className="w-16 h-16 flex justify-center items-center overflow-hidden rounded-full">
                  <Image src={EventImg} alt="Event Image" className="imgicon" />
                </div>
                <br></br>
                <h3 className="text-xl font-bold">Event Management</h3>
                <p>Offering tools and platforms for virtual debate events.</p>
              </div>
              <div className="service-item5">
                <div className="w-16 h-16 flex justify-center items-center overflow-hidden rounded-full">
                  <Image src={GearImg} alt="Gear Image" className="imgicon" />
                </div>
                <br></br>
                <h3 className="text-xl font-bold">
                  Customization and Personalization
                </h3>
                <p>
                  Allowing users to create personalized profiles to track their
                  progress and achievements.
                </p>
              </div>
              <div className="service-item6">
                <div className="w-16 h-16 flex justify-center items-center overflow-hidden rounded-full">
                  <Image
                    src={InnovationImg}
                    alt="Innovation Image"
                    className="imgicon"
                  />
                </div>
                <br></br>
                <h3 className="text-xl font-bold">Technology and Innovation</h3>
                <p>
                  Offering mobile apps and technology platforms for easy access
                  and participation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="team-section bg-#14142A py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Our Team</h2>
            <br></br>
            <br></br>
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div>
                <Image
                  src={AkithImg}
                  alt="B. A. Akith Chandinu"
                  className="rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold">B. A. Akith Chandinu</h3>
                <p>akith.chandinu@gmail.com</p>
              </div>
              <div>
                <Image
                  src={VinukaImg}
                  alt="V. V. Fernando"
                  className="rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold">V. V. Fernandopulle</h3>
                <p>vv.fernandopulle@gmail.com</p>
              </div>
              <div>
                <Image
                  src={JalinaImg}
                  alt="Jalina Hirushan"
                  className="rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold">Jalina Hirushan</h3>
                <p>jalinahirushan2002@gmail.com</p>
              </div>
              <div>
                <Image
                  src={RitharaImg}
                  alt="Rithara Kithmanthie"
                  className="rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold">Rithara Kithmanthie</h3>
                <p>ritharaedirisinghe@gmail.com</p>
              </div>
              <div>
                <Image
                  src={DulminiImg}
                  alt="S. Dulmini Abeyweera"
                  className="rounded-full mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold">S. Dulmini Abeyweera</h3>
                <p>samikshaabeyweera@gmail.com</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        
        <section id="contact" className="contact-section bg-[#9496D9]  py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p className="mt-4">
              Have questions? Feel free to reach out to us!
            </p>
            <form className="mt-8 max-w-md mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black-200"
                >
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

        {/* Footer Section */}
        <footer className="footer-section bg-[#14142A] text-white py-8">
          <div className="container mx-auto">
            <div className="newsletter text-center mb-12">
              <h1 className="text-xl font-bold">Subscribe to Newsletter</h1>
              <p className="mt-2 text-gray-400">
                Subscribe to our newsletter to receive the latest updates,
                exclusive content, and insightful tips directly to your inbox.
              </p>
              <form className="mt-6 flex justify-center">
                <input
                  type="email"
                  placeholder="Enter your Email..."
                  className="px-4 py-2 rounded-full mr-4 text-black"
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#8b4899] text-white"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="footer-links grid grid-cols-1 md:grid-cols-4 text-center md:text-left gap-8">
              <div className="col-span-1">
                <h4 className="font-bold text-lg mb-4">DebateX</h4>
                <p>
                  Join our community of passionate debaters and never miss out
                  on upcoming events, debates, and opportunities to enhance your
                  skills!
                </p>
                <div className="flex justify-center md:justify-start mt-4 space-x-4">
                  <a href="#" className="text-white hover:text-gray-400">
                    <Image src={FbImg} alt="Facebook" className="icon4" />
                  </a>
                  <a href="#" className="text-white hover:text-gray-400">
                    <Image src={TwitterImg} alt="Twitter" className="icon4" />
                  </a>
                  <a href="#" className="text-white hover:text-gray-400">
                    <Image src={LinkedinImg} alt="LinkedIn" className="icon4" />
                  </a>
                  <a href="#" className="text-white hover:text-gray-400">
                    <Image src={InsterImg} alt="Instagram" className="icon4" />
                  </a>
                </div>
              </div>
             
              <div>
                <h4 className="font-bold text-lg mb-4">Company</h4>
                <ul>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Services
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Resources</h4>
                <ul>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Video Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      API Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Security Reports
                    </a>
                  </li>
                </ul>
              </div>
              <div className="help">
                <h4 className="font-bold text-lg mb-4">Help</h4>
                <ul>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Customer Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-400">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              
            </div>

            <div className="designer mt-12 text-center text-gray-500">
              Copyright @2024 All Rights Reserved | Design By The Mavericks
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
