import React from "react";
import Link from "next/link";
import Image from "next/image";
import Mobilenav from "./mobileNav";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="DebateX logo"
          className="max-sm:size-10"
        />
        <p className="text-[26 px] font-extrabold text-white max-sm:hidden">DebateX</p>
      </Link>
      <Link href="/#hero" className="max-sm:hidden">
        <p>Home</p>
      </Link>
      <Link href="/#aims" className="max-sm:hidden">
        <p>Aims</p>
      </Link>
      <Link href="/#contact" className="max-sm:hidden">
        <p>Contact Us</p>
      </Link>
      <Link href="/login" className="max-sm:hidden">
        <p>Get Started</p>
      </Link>
      <div className="flex-between gap-5">
        <Mobilenav />
      </div>
    </nav>
  );
};

export default Navbar;
