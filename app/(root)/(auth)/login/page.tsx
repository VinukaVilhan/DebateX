'use client'

import React, { useState } from "react";
import { auth, provider } from "../../../../lib/firebase/config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setShowSuccessModal(true);
        setShowErrorModal(false);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push("/dashboard/");
        }, 2500);
      })
      .catch((error) => {
        setError(error.message);
        setShowErrorModal(true);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push("/dashboard/");
        }, 2500);
      })
      .catch((error) => {
        setError(error.message);
        setShowErrorModal(true);
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
          Log in
        </h1>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px", color: "#413A67" }}
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
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
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px", color: "#413A67" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
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
            Log In
          </button>
        </form>
        <p style={{ marginTop: "20px", color: "#413A67" }}>
          Don&apos;t have an account? then{" "}
          <a
            href="/signup"
            style={{
              color: "#413A67",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
            }}
          >
            Sign up
          </a>
        </p>
        <button className="flex flex-row items-center justify-center gap-2"
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Login with Google
          <Image
          src='/icons/google.svg'
          height={20}
          width={20}
          alt='Google logo'/>
        </button>
      </div>

      {showSuccessModal && (
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
            <h2 style={{ color: "#413A67" }}>Login Successful</h2>
            <p style={{ color: "#413A67" }}>User Logged in successfully!!</p>
            <button
              onClick={() => setShowSuccessModal(false)}
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

      {showErrorModal && (
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
            <h2 style={{ color: "#413A67" }}>Login Error</h2>
            <p style={{ color: "#413A67" }}>{error}</p>
            <button
              onClick={() => setShowErrorModal(false)}
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

export default Login;
