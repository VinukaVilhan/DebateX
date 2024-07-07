"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import Mobilenav from "./mobileNav";
import { auth } from "../lib/firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showLogoutSuccessModal, setShowLogoutSuccessModal] = useState(false);
  const [showLogoutErrorModal, setShowLogoutErrorModal] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storage = getStorage();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout Success");
        setShowLogoutSuccessModal(true);
        setShowLogoutErrorModal(false);

        setTimeout(() => {
          setShowLogoutSuccessModal(false);
          router.push("/signup");
        }, 3000); // Show modal for 3 seconds before navigating
      })
      .catch((error) => {
        setLogoutError(error.message);
        setShowLogoutErrorModal(true);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "");
        setIsLoggedIn(true);
        if (user.photoURL) {
          setProfileImageUrl(user.photoURL);
        } else {
          const profileImageRef = ref(storage, `profile_images/${user.uid}`);
          getDownloadURL(profileImageRef)
            .then((url) => {
              setProfileImageUrl(url);
            })
            .catch((error) => {
              console.error("Error fetching profile image:", error);
            });
        }
      } else {
        console.log("User is logged out");
        setName("");
        setProfileImageUrl("");
        setIsLoggedIn(false);
      }
    });
  }, [storage]);

  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        {/* <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="DebateX logo"
          className="max-sm:size-10"
        /> */}
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          DebateX
        </p>
      </Link>
      <Link href="/#hero" className="text-white max-sm:hidden">
        <p>Home</p>
      </Link>
      <Link href="/#aims" className="text-white max-sm:hidden">
        <p>Aims</p>
      </Link>
      <Link href="/#contact" className="text-white max-sm:hidden">
        <p>Contact Us</p>
      </Link>
      {isLoggedIn ? (
        <Link href="/dashboard" className="text-white max-sm:hidden">
          <p>Go to Dashboard</p>
        </Link>
      ) : (
        <Link href="/login" className="text-white max-sm:hidden">
          <p>Get Started</p>
        </Link>
      )}
   
      <div className="flex-between gap-5">
        <Mobilenav />
      </div>
    </nav>
  );
};

export default Navbar;
