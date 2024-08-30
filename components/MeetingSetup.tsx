import { useState } from "react";
import {
  useCallStateHooks,
  useCalls,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";

interface MeetingSetupProps {
  setIsSetupComplete: (isComplete: boolean) => void;
  setUserName: (name: string) => void;
}

const MeetingSetup: React.FC<MeetingSetupProps> = ({
  setIsSetupComplete,
  setUserName,
}) => {
  const [name, setName] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const calls = useCalls();
  const call = calls[0];
  const client = useStreamVideoClient();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const handleJoin = async () => {
    if (!call || !client || !name.trim()) return;

    setIsJoining(true);

    try {
      await call.join({
        // Use 'video' and 'audio' instead of 'camera' and 'mic'
        video: false,
        audio: false,
      });
      // Instead of updating user data, we'll just set the name locally
      setUserName(name);
      setIsSetupComplete(true);
    } catch (error) {
      console.error("Error joining call:", error);
      setIsJoining(false);
    }
  };

  if (!call || !client) return <Loader />;

  if (localParticipant) {
    setIsSetupComplete(true);
    return null;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold text-white">Join Meeting</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 w-64 rounded-md border border-gray-300 p-2 text-black"
      />
      <button
        onClick={handleJoin}
        disabled={isJoining || !name.trim()}
        className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        {isJoining ? "Joining..." : "Join"}
      </button>
    </div>
  );
};

export default MeetingSetup;
