import { getAuthState } from "@/lib/authUtils";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.NEXT_PUBLIC_STREAM_SECRET_KEY!;

if (!apiKey) {
  throw new Error("Stream API key is required");
}


if (!apiSecret) {
  throw new Error("Stream secret key is required");
}

export const tokenProvider = async (): Promise<string> => {
  const { user } = await getAuthState();

  if (!user) {
    throw new Error("User is not logged in");
  }

  try {
    const client = new StreamClient(apiKey, apiSecret);

    // Set token expiration and issued timestamps
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // 1 hour expiration
    const issued = Math.floor(Date.now() / 1000) - 60; // 1 minute ago

    // Generate the token
    const token = client.createToken(user.uid, exp, issued);

    return token;
  } catch (error) {
    console.error("Error in tokenProvider:", error);
    throw new Error(`Failed to create token: ${(error as Error).message}`);
  } // Add this closing brace
}; // Add this closing brace and semicolon