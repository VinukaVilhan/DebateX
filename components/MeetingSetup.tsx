import { useState, useEffect } from "react";
import {
  useCallStateHooks,
  useCalls,
  useStreamVideoClient,
  DeviceSettings,
} from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";

interface MeetingSetupProps {
  setIsSetupComplete: (isComplete: boolean) => void;
}

const MeetingSetup: React.FC<MeetingSetupProps> = ({ setIsSetupComplete }) => {
  const [isJoining, setIsJoining] = useState(false);
  const calls = useCalls();
  const call = calls[0];
  const client = useStreamVideoClient();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  useEffect(() => {
    if (localParticipant) {
      setIsSetupComplete(true);
    }
  }, [localParticipant, setIsSetupComplete]);

  useEffect(() => {
    const joinCall = async () => {
      if (call && client && !isJoining && !localParticipant) {
        setIsJoining(true);
        try {
          await call.join();
        } catch (error) {
          console.error("Error joining call:", error);
          setIsJoining(false);
        }
      }
    };

    joinCall();
  }, [call, client, isJoining, localParticipant]);

  if (!call || !client) return <Loader />;

  if (isJoining && !localParticipant) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <DeviceSettings />
      <button
        onClick={() => setIsSetupComplete(true)}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Continue to Meeting
      </button>
    </div>
  );
};

export default MeetingSetup;
