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
    <nav className="flex justify-between items-center z-50 w-full bg-dark-1 px-20 py-4">
      <Link href="/" className="flex items-center">
        {/* <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="DebateX logo"
          className="max-sm:size-10"
        /> */}

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
        <Link
          href="/login"
          className="text-white max-sm:hidden rounded-full px-6 py-2 border border-white bg-gradient-to-r from-[#D897CB] from-0% to-[#bc76ae1e] to-60%"
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
