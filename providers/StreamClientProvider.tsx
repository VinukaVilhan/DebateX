import { tokenProvider } from "@/actions/stream.actions";
import { auth } from "@/lib/firebase/config";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
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
        id: user.uid,
        name: user.displayName || user.uid,
        image: user.photoURL || "",
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user]);

  return videoClient ? (
    <StreamVideo client={videoClient}>{children}</StreamVideo>
  ) : null;
};

export default StreamVideoProvider;