// useAuth.ts
"use client";
import React, { useEffect, useState } from "react";
import { getAuthState } from "../authUtils";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    getAuthState().then((authState) => {
      setState(authState);
    });
  }, []);

  return state;
};
