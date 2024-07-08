"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useAuth } from "@/lib/hooks/useAuth";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user } = useAuth();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  return (
    <main className="h-screen w-full">
      <StreamCall call={}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
