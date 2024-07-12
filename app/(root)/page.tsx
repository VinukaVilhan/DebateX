import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "../(root)/Styles/page.css";

//------------ images----------------
import HeroImg from "@/public/images/hero.jpg";
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
            <button className="bg-[#58224de4] font- flex items-center justify-center border border-white text-white py-4 px-6 rounded-full">
              Get Started
            </button>
            <button className="bg-[#58224de4] flex items-center justify-center border border-white text-white py-4 px-6 rounded-full">
              Host a competition
            </button>
            <button className="bg-[#58224de4] flex items-center justify-center border border-white text-white py-4 px-6 rounded-full">
              Participate a competition
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
          className="about-section bg-#14142A text-white py-20"
        >
          <br></br>
          <br></br>
          <h2 className="text-3xl font-bold">
            <center>About Us</center>
          </h2>
          <br></br>
          <br></br>
          <br></br>
          <div className="container mx-auto">
            <div className="image-container">
              <Image src={AboutusImg} alt="About Us Image" />
            </div>
            <div className="content-container">
              <p>
                Welcome to DebateX, the ultimate online debating platform where
                ideas meet, challenge, and evolve.<br></br><br></br>
              </p>
              <div className="links">
                <a href="#">DebateX Vision and Mission </a><br></br>
                <a href="#">DebateX Services</a><br></br>
                <a href="#">DebateX Expert Team</a><br></br>
              </div>
            </div>
          </div>
        </section>

        {/* Aims Section */}
        <section id="aims" className="aims-section bg-[#9496D9] py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Our Aims</h2>
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
                  We aim to sharpen participant's analytical skills by
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
          className="vision-mission-section bg-#14142A text-white py-20"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Our Vision & Mission</h2>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="card1">
                <Image src={VisionImg} alt="Vision Image" className="img1" />
                <br></br>
                <h3 className="text-xl font-bold">Vision</h3>
                <br></br>
                <p>
                  To be the premier online platform for fostering intellectual
                  growth, critical thinking, and respectful discourse through
                  engaging and dynamic debates.
                </p>
              </div>
              <div className="card2">
                <Image src={MissionImg} alt="Mission Image" className="img2" />
                <br></br>
                <h3 className="text-xl font-bold">Mission</h3>
                <br></br>
                <p>
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
        <section id="services" className="services-section bg-[#9496D9] py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Services</h2>
            <br></br>
            <br></br>
            <div className="grid grid-cols-3 gap-1 mt-8">
              <div className="service-item1">
                <Image src={MedalImg} alt="medal Image" className="imgicon" />
                <br></br>
                <h3 className="text-xl font-bold">
                  Debate Competitions and Tournaments
                </h3>
                <p>
                  Organizing and hosting online and offline debate competitions.
                </p>
              </div>
              <div className="service-item2">
                <Image src={ComImg} alt="community Image" className="imgicon" />
                <br></br>
                <h3 className="text-xl font-bold">Community and Networking</h3>
                <p>
                  Facilitating networking opportunities through forums,
                  discussion boards, and social media groups.
                </p>
              </div>
              <div className="service-item3">
                <Image src={LawImg} alt="law Image" className="imgicon" />
                <br></br>
                <h3 className="text-xl font-bold">Judging and Feedback</h3>
                <p>
                  Offering professional judging services for debates and
                  providing detailed feedback and scoring to help debaters
                  improve their skills.
                </p>
              </div>
              <div className="service-item4">
                <Image src={EventImg} alt="Event Image" className="imgicon" />
                <br></br>
                <h3 className="text-xl font-bold">Event Management</h3>
                <p>Offering tools and platforms for virtual debate events.</p>
              </div>
              <div className="service-item5">
                <Image src={GearImg} alt="Gear Image" className="imgicon" />
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
                <Image
                  src={InnovationImg}
                  alt="Innovation Image"
                  className="imgicon"
                />
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
        <section
          id="contact"
          className="contact-section bg-[#413A67] text-white py-20"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <p className="mt-4">
              Have questions? Feel free to reach out to us!
            </p>
            <form className="mt-8 max-w-md mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-200"
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
                  className="block text-sm font-medium text-gray-200"
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
                  className="block text-sm font-medium text-gray-200"
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
        <footer className="footer-section bg-[#292445] text-white py-8">
          <div className="container mx-auto text-center">
            <p className="mb-4">
              Join our community of passionate debaters and learners today.
              Unlock your potential and explore new opportunities to engage in
              debates.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-white hover:text-gray-400">
                Facebook
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Twitter
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                LinkedIn
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
