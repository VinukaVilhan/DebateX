"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Mobilenav from "./mobileNav";


const Navbar = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [showLogoutSuccessModal, setShowLogoutSuccessModal] = useState(false);
  const [showLogoutErrorModal, setShowLogoutErrorModal] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <nav className="flex justify-between items-center z-50 w-full bg-dark-1 px-20 py-4">
      <Link href="/" className="flex items-center">

        <p className="text-4xl font-extrabold text-white max-sm:hidden">
          DebateX
        </p>
      </Link>
      <div className="sm:flex justify-evenly gap-8 text-xl font-bold hidden ">
        <Link href="/#hero" className="text-white ">
          <p>Home</p>
        </Link>
        <Link href="" className="text-white ">
          <p>About</p>
        </Link>
        <Link href="/#aims" className="text-white ">
          <p>Aims</p>
        </Link>
        <Link href="/#contact" className="text-white ">
          <p>Contact Us</p>
        </Link>
      </div>
      {isLoggedIn ? (
        <Link href="/dashboard" className="text-white max-sm:hidden">
          <p>Go to Dashboard</p>
        </Link>
      ) : (
        <Link href="/sign-in" className="text-white max-sm:hidden">
          <p>Get Started</p>
        </Link>

      )}

      <div className="flex-between gap-5 sm:hidden">
        <Mobilenav />
      </div>
    </nav>
  );
};

export default Navbar;
