"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import Mobilenav from "./mobileNav";
import { auth } from "../lib/firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";

const NavbarDashboard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showLogoutSuccessModal, setShowLogoutSuccessModal] = useState(false);
  const [showLogoutErrorModal, setShowLogoutErrorModal] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const storage = getStorage();
  const user = auth.currentUser;

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
      }
    });
  }, [user, storage]);

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
        <p className="text-[26 px] font-extrabold text-white max-sm:hidden">
          DebateX
        </p>
      </Link>
   
      <Link href="/login" className="max-sm:hidden">
        <p>Profile</p>
      </Link>
   
      <div className="flex-between gap-5">
        {/* <Mobilenav /> */}
      </div>
    </nav>
  );
};

export default NavbarDashboard;
