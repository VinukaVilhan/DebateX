"use client";

import { useState, useEffect } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import { Users, LayoutList, Coins, Copy, Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Loader from "./Loader";
import { cn } from "@/lib/utils";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

interface MeetingRoomProps {
  userName: string;
}

interface CoinTossProps {
  team1: string;
  team2: string;
  onTossResult: (winner: string, side: "pro" | "con") => void;
  isHost: boolean;
}

interface CoinTossResult {
  result: string;
}

const CoinToss: React.FC<CoinTossProps> = ({
  team1,
  team2,
  onTossResult,
  isHost,
}) => {
  const [result, setResult] = useState<string | null>(null);
  const call = useCall();

  const flipCoin = () => {
    const randomNumber = Math.random();
    const winningTeam = randomNumber < 0.5 ? team1 : team2;
    const side: "pro" | "con" = Math.random() < 0.5 ? "pro" : "con";

    const newResult = `${winningTeam} will argue for the ${side} side.`;
    setResult(newResult);
    onTossResult(winningTeam, side);

    // Broadcast the result to all participants
    call?.sendCustomEvent({
      type: "coin_toss_result",
      data: { result: newResult },
    });
  };

  if (!isHost) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
        <Coins size={20} className="text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
        <DropdownMenuItem onClick={flipCoin}>Flip Coin</DropdownMenuItem>
        {result && <DropdownMenuItem>{result}</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);
  const call = useCall();

  const copyLink = () => {
    if (call) {
      const meetingLink = `${window.location.origin}/meeting/${call.id}`;
      navigator.clipboard.writeText(meetingLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <button
      onClick={copyLink}
      className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] flex items-center gap-2"
    >
      {copied ? (
        <Check size={20} className="text-green-500" />
      ) : (
        <Copy size={20} className="text-white" />
      )}
      <span className="text-white text-sm">
        {copied ? "Copied!" : "Copy Link"}
      </span>
    </button>
  );
};

const MeetingRoom: React.FC<MeetingRoomProps> = ({ userName }) => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const [coinTossResult, setCoinTossResult] = useState<string | null>(null);

  const call = useCall();
  const callingState = useCallCallingState();

  const isHost = call?.isCreatedByMe || false;

  useEffect(() => {
    if (call) {
      const handleCustomEvent = (event: any) => {
        if (event.type === "coin_toss_result") {
          setCoinTossResult((event.data as CoinTossResult).result);
        }
      };

      call.on("custom", handleCustomEvent);

      return () => {
        call.off("custom", handleCustomEvent);
      };
    }
  }, [call]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const handleCoinToss = (winner: string, side: "pro" | "con") => {
    const result = `${winner} will argue for the ${side} side.`;
    setCoinTossResult(result);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        <CopyLinkButton />
        <CoinToss
          team1="Team A"
          team2="Team B"
          onTossResult={handleCoinToss}
          isHost={isHost}
        />
        {!isPersonalRoom && <EndCallButton />}
      </div>
      {coinTossResult && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#19232d] px-4 py-2 rounded-xl">
          {coinTossResult}
        </div>
      )}
    </section>
  );
};

export default MeetingRoom;
