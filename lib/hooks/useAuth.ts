// useAuth.ts
"use client"
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    }, (error) => {
      setError(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
};
