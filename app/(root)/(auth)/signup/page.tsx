"use client";

import React from 'react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../../../lib/firebase/config"; // Adjust the import based on your directory structure
import Image from "next/image";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupSuccessModal, setShowSignupSuccessModal] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [showSignupErrorModal, setShowSignupErrorModal] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(email, password);
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
        console.log(user);
        setShowSignupSuccessModal(true);
        setTimeout(() => {
          setShowSignupSuccessModal(false);
          router.push("/pricing");
        }, 3000); // Show modal for 3 seconds before navigating
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setSignupError(errorMessage);
        setShowSignupErrorModal(true);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user);
        setShowSignupSuccessModal(true);
        setTimeout(() => {
          setShowSignupSuccessModal(false);
          router.push("/pricing");
        }, 3000); // Show modal for 3 seconds before navigating
      })
      .catch((error) => {
        console.error("Error during sign in:", error.message);
        setSignupError(error.message);
        setShowSignupErrorModal(true);
      });
  };

  return (
    <>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "40px",
          backgroundColor: "#ffffff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          textAlign: "center",
          background: "#F0F0FF",
        }}
      >
        <h1 style={{ color: "#413A67", fontSize: "2rem", marginBottom: "20px" }}>
          Sign up
        </h1>
        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              htmlFor="formUsername"
              style={{ display: "block", marginBottom: "5px", color: "#413A67" }}
            >
              Username
            </label>
            <input
              type="text"
              id="formUsername"
              value={name}
              placeholder="Sasuke Uchiha"
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #CCCCCC",
                borderRadius: "4px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="formEmail"
              style={{ display: "block", marginBottom: "5px", color: "#413A67" }}
            >
              Email address
            </label>
            <input
              type="email"
              id="formEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #CCCCCC",
                borderRadius: "4px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="formPassword"
              style={{ display: "block", marginBottom: "5px", color: "#413A67" }}
            >
              Password
            </label>
            <input
              type="password"
              id="formPassword"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                border: "1px solid #CCCCCC",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#413A67",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sign up
          </button>
          <button className="flex flex-row items-center justify-center gap-2"
            type="button"
            onClick={handleGoogleSignIn}
            style={{
              padding: "10px",
              backgroundColor: "white",
              border: "1px solid #413A67",
              color: "#413A67",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sign up with Google
            <Image
            src='/icons/google.svg'
            height={20}
            width={20}
            alt='Google logo'/>
          </button>
        </form>
        <p style={{ marginTop: "20px", color: "#413A67" }}>
          Already signed in? then{" "}
          <a
            href="/login"
            style={{
              color: "#413A67",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
            }}
          >
            Login
          </a>
        </p>
      </div>

      {/* Success Modal */}
      {showSignupSuccessModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              maxWidth: "400px",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ color: "#413A67" }}>Signup Successful</h2>
            <p style={{ color: "#413A67" }}>User signed up successfully!!</p>
            <button
              onClick={() => setShowSignupSuccessModal(false)}
              style={{
                padding: "10px",
                backgroundColor: "#413A67",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showSignupErrorModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              maxWidth: "400px",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ color: "#413A67" }}>Signup Error</h2>
            <p style={{ color: "#413A67" }}>{signupError}</p>
            <button
              onClick={() => setShowSignupErrorModal(false)}
              style={{
                padding: "10px",
                backgroundColor: "#413A67",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
