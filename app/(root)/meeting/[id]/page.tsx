"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

import { useGetCallById } from "@/hooks/useGetCallById";
import Alert from "@/components/Alert";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id as string);  // Type assertion here
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [meetingState, setMeetingState] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setMeetingState(urlParams.get("state"));
  }, []);

  if (!isLoaded || isCallLoading) {
    return <Loader />;
  }

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }

  const notAllowed =
    call.type === "invited" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) {
    return <Alert title="You are not allowed to join this meeting" />;
  }

  if (user) console.log(user.id, id, meetingState);

  // Ensure that id is a string
  const meetingId = Array.isArray(id) ? id[0] : id || "";

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete && user ? (
            <MeetingSetup
              setIsSetupComplete={setIsSetupComplete}
              userId={user.id}
              meetingId={meetingId}  
              meetingState={meetingState || ""}
            />
          ) : (
            <MeetingRoom meetingID={meetingId} />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
