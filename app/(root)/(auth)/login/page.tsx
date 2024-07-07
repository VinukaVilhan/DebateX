'use client'

import React, { useState } from "react";
import { auth, provider } from "../../../../lib/firebase/config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";

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
      <div style={{ maxWidth: '600px', margin: '0px auto', padding: '20px', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
        <h1 style={{ color: 'purple', textAlign: 'center' }}>Log in</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px', backgroundColor: 'purple', color: 'white', border: 'none', cursor: 'pointer' }}>Log In</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? then{" "}
          <a
            href="/signup"
            style={{
              color: 'purple',
              textDecoration: 'underline',
              textUnderlineOffset: '5px',
            }}
          >
            Sign up
          </a>
        </p>
        <button
          onClick={handleGoogleLogin}
          style={{ width: '100%', padding: '10px', backgroundColor: '#4285F4', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}
        >
          Login with Google
        </button>
      </div>

      {showSuccessModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
            <h2>Login Successful</h2>
            <p>User Logged in successfully!!</p>
            <button onClick={() => setShowSuccessModal(false)} style={{ padding: '10px', backgroundColor: 'purple', color: 'white', border: 'none', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
            <h2>Login Error</h2>
            <p>{error}</p>
            <button onClick={() => setShowErrorModal(false)} style={{ padding: '10px', backgroundColor: 'purple', color: 'white', border: 'none', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
