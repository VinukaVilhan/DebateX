"use client";
import MobileNavDashboard from "./MobileNavDashboard";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth } from "../lib/firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import profileImg from "./../public/icons/user-profile.svg";
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

      <Link href="/profile" className="flex gap-2 items-center max-sm:hidden">
        <p className="text-white " >Hi, {name}</p>   
      </Link>

      <div className="flex flex-row gap-1">
      <div>
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt="Profile"
              width={30}
              height={30}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <Image
              src={profileImg}
              alt="Default Profile"
              style={{ borderRadius: "50%", width: "30px", height: "30px" }}
            />
          )}
        </div>
      <button type="button" className="text-white" onClick={handleSignout}><Image
      src='/icons/logout.png'
      height={30}
      width={30}
      alt='logout icon'
      /></button>
      </div>
    
      
      </div>
      

      <div className="flex-between gap-5">
        <MobileNavDashboard />
      </div>
    </nav>
  );
};

export default NavbarDashboard;
