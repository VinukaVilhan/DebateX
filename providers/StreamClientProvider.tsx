"use client";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { auth } from "@/lib/firebase/config";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!apiKey) {
      throw new Error("Stream API key is required");
    }

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.uid,
        name: user?.displayName || user?.uid,
        image: user?.photoURL || "",
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user]);

  // if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
