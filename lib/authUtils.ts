// authUtils.ts
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase/config";


interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const getAuthState = (): Promise<AuthState> => {
  return new Promise((resolve) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve({ user, loading: false, error: null });
      },
      (error) => {
        resolve({ user: null, loading: false, error });
      }
    );
  });
};
