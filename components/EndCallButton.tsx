"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import MeetingModal from "./MeetingModel";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const [modalOpen, setModalOpen] = useState(false);

  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const handleEndCall = async () => {
    await call.endCall();
    router.push("/dashboard");
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)} className="bg-red-500">
        End call for everyone
      </Button>
      <MeetingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Are you sure you want to end the call?"
        buttonText="End Call"
        handleClick={handleEndCall}
        buttonClassName="bg-red-500"
      >
        <p>
          Ending the call will disconnect all participants. This action cannot
          be undone.
        </p>
      </MeetingModal>
    </>
  );
};

export default EndCallButton;
