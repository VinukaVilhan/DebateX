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
    <nav className="flex justify-between items-center z-50 w-full bg-dark-1 px-20 py-4">
      <Link href="/" className="flex items-center justify-center">
        <p className="text-5xl font-extrabold text-white max-sm:hidden">
          DebateX
        </p>
      </Link>

      <div className="sm:flex justify-evenly gap-8 font-bold hidden">
        <Link href="/#hero" className="text-white text-xl">
          <p className="text-xl">Home</p>
        </Link>
        <Link href="" className="text-white">
          <p className="text-xl">About</p>
        </Link>
        <Link href="/#aims" className="text-white">
          <p className="text-xl">Aims</p>
        </Link>
        <Link href="/#contact" className="text-white">
          <p className="text-xl">Contact Us</p>
        </Link>
      </div>

      {isLoggedIn ? (
        <Link href="/dashboard" className="text-white max-sm:hidden">
          <p className="px-5 py-4 font-medium rounded-full border border-white bg-gradient-to-r from-[#D897CB] from-0% to-[#bc76ae3b] to-56%">
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
