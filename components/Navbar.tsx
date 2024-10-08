"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Mobilenav from "./mobileNav";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <nav className="fixed flex justify-between items-center z-50 w-full bg-dark-1 px-20 py-4">
      <Link href="/" className="flex items-center justify-center">
        <p className="text-5xl font-extrabold text-white max-sm:hidden">
          Debate<span className="text-purple-700">X</span>

        </p>
      </Link>

      <div className="sm:flex justify-evenly gap-10 font-bold hidden">
        <Link href="/#hero" className="text-white text-xl">
          <p className="text-lg">Home</p>
        </Link>
        <Link href="/#about" className="text-white">
          <p className="text-lg">About</p>
        </Link>
        <Link href="/#aims" className="text-white">
          <p className="text-lg">Aims</p>
        </Link>
        <Link href="/#services" className="text-white">
          <p className="text-lg">Services</p>
        </Link>
      </div>

      {isLoggedIn ? (
        <Link href="/dashboard" className="text-white max-sm:hidden">
          <p className="px-4 py-3 font-medium rounded-full border border-white bg-gradient-to-r from-[#D897CB] from-0% to-[#bc76ae3b] to-56%">
            Go to Dashboard
          </p>
        </Link>
      ) : (
        <Link
          href="/sign-in"
          className="px-5 py-4 font-medium rounded-full border border-white bg-gradient-to-r from-[#D897CB] from-0% to-[#bc76ae3b] to-56%"
        >
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
