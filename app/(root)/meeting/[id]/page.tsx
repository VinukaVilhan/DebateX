"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import { Loader } from "lucide-react";
import { useGetCallById } from "@/hooks/useGetCallById";
import Alert from "@/components/Alert";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { db } from "@/app/firebase/page";
import { doc, getDoc } from "firebase/firestore"; // Import Firebase functions

const MeetingPage = () => {
  const { id } = useParams();
  const router = useRouter(); // Initialize useRouter
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id as string);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [meetingState, setMeetingState] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setMeetingState(urlParams.get("state"));
  }, []);

  useEffect(() => {
    const checkMeetingOwnership = async () => {
      if (!user || !id) {
        console.log("no user");
        return;
      }

      try {
        const meetingId = Array.isArray(id) ? id[0] : id;

        const meetingDocRef = doc(db, "meetings", meetingId);
        console.log("meetingdoc ref ", meetingDocRef);
        const meetingDocSnap = await getDoc(meetingDocRef);
        console.log("meetingDocSnap", meetingDocSnap)
        if (meetingDocSnap.exists()) {
          const meetingData = meetingDocSnap.data();
          console.log("meetingData", meetingData);
          console.log("user id", user.id)
          console.log("meetingData.userid", meetingData.userId)
          if (meetingData.userId !== user.id) {
            // Redirect if user ID does not match
            console.log("redirected");
            router.push(`/meeting/${id}?state=isJoiningMeeting`);
          }
          else {
            console.log("user is the host");
          }
        } else {
          console.error("Meeting document not found");
        }
      } catch (error) {
        console.error("Error fetching meeting document:", error);
      }
    };

    checkMeetingOwnership();
  }, [user, id, router]);

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
            <MeetingRoom  />
          

            
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
