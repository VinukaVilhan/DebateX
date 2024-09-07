//@ts-nocheck
"use client";

import MeetingCard from "./ui/MeetingCard";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";
import { Rewind } from "@phosphor-icons/react/dist/ssr";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const { toast } = useToast();
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;

      case "recordings":
        return recordings;

      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous calls";

      case "recordings":
        return "No previous recordings";

      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: "Try again later!" });
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings, toast]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-6 px-8">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type == "ended"
                ? "/icons/rewind.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/video-camera-fill.svg"
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as callRecording).filename?.substring(0, 20) ||
              "No descritpion"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <>
          <h1>{noCallsMessage}</h1>
          <button
            type="button"
            className="bg-[#5A5DAF] text-white py-2 px-4 rounded-lg"
          >
            Schedule a meeting
          </button>
        </>
      )}
    </div>
  );
};

export default CallList;
