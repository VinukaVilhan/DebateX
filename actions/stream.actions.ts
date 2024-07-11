import { getAuthState } from "@/lib/authUtils";
import { StreamClient } from "@stream-io/node-sdk";

// Ensure environment variables are loaded
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_STREAM_SECRET_KEY;

if (!apiKey) {
  throw new Error("Stream API key is required");
}

if (!apiSecret) {
  throw new Error("Stream secret key is required");
}

// Define the tokenProvider function
export const tokenProvider = async (): Promise<string> => {
  try {
    // Retrieve the current user's authentication state
    const { user } = await getAuthState();

    // Check if the user is logged in
    if (!user) {
      throw new Error("User is not logged in");
    }

    // Initialize the StreamClient with the API key and secret
    const client = new StreamClient(apiKey, apiSecret);

    // Set token expiration and issued timestamps
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // 1 hour expiration
    const issued = Math.floor(Date.now() / 1000) - 60; // 1 minute ago

    // Generate the token
    const token = client.createToken(user.uid, exp, issued);

    return token;
  } catch (error) {
    // Use a type guard to handle different error types safely
    if (error instanceof Error) {
      console.error("Error in tokenProvider:", error);
      throw new Error(`Failed to create token: ${error.message}`);
    } else {
      console.error("Unexpected error in tokenProvider:", error);
      throw new Error("Failed to create token due to an unknown error");
    }
  }
};
