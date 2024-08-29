"use client";
import MobileNavDashboard from "./MobileNavDashboard";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import profileImg from "./../public/icons/user-profile.svg";
import { UserButton, useUser } from "@clerk/nextjs";
import SignOutButtonRithara from "./ui/Signoutbutton";
const NavbarDashboard = () => {
  const router = useRouter();
  const [showLogoutSuccessModal, setShowLogoutSuccessModal] = useState(false);
  const [showLogoutErrorModal, setShowLogoutErrorModal] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const { user } = useUser();
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.imageUrl);
    }
  }, [user]);

  return (
    <nav className=" fixed w-full bg-dark-1 px-6 py-4 lg:px-10 ">
      <div className="flex flex-row flex-1 flex-between">
        <Link href="/" className="flex items-center gap-1">
          {/* <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="DebateX logo"
          className="max-sm:size-10"
        /> */}
          <p className="text-[26 px] font-extrabold text-white max-sm:hidden">
            DebateX
          </p>
        </Link>

        <div className="flex flex-row gap-1">
          <UserButton />
        </div>
      </div>

      <div className="flex-between gap-5">
        <MobileNavDashboard />
      </div>
    </nav>
  );
};

export default NavbarDashboard;
