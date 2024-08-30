"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import "../../../(root)/Styles/Personal-Room.css";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col mb-6">
      <h1 className="text-base font-medium text-black lg:text-xl">{title}:</h1>
      <p className="text-sm font-bold text-black lg:text-xl">{description}</p>
    </div>
  );
};

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingID = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`;
  const client = useStreamVideoClient();
  const router = useRouter();
  const { toast } = useToast();
  const { call } = useGetCallById(meetingID!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingID!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingID}?personal=true`);
  };

  return (
    <section className="flex flex-col gap-10 text-black p-6">
      <h1 className="text-3xl font-bold mb-4">Personal Room</h1>
      <div className="flex flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.firstName}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingID!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5 text-white">
        <Button className="custom-button" onClick={startRoom}>
          Start Meeting
        </Button>

        <Button
          className="custom-button2"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
