"use server"

import { auth } from "@/lib/firebase/config";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await auth.currentUser;

    if (!user) throw new Error("User is not logged in");
    if(!apiKey) throw new Error("Stream API key is required");
    if(!apiSecret) throw new Error("Stream secret key is required");

    const client = new StreamClient(apiKey, apiSecret);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.uid, exp, issued)

    return token;
}