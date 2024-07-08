// tokenProvider.ts
import { getAuthState } from "@/lib/authUtils";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
<<<<<<< HEAD
    const user = await auth.currentUser;

    if (!user) throw new Error("User is not logged in");
    if(!apiKey) throw new Error("Stream API key is required");
    if(!apiSecret) throw new Error("Stream secret key is required");
=======
  const { user, loading, error } = await getAuthState();

  if (loading) {
    throw new Error("Still loading user data");
  }

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

  if (!user) {
    throw new Error("User is not logged in");
  }

  if (!apiKey) {
    throw new Error("Stream API key is required");
  }


  if (!apiSecret) {
    throw new Error("Stream secret key is required");
  }
>>>>>>> df3b8e39d97035e6d44d4cddb319b8c457b07568

  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user.uid, exp, issued);

  return token;
};
