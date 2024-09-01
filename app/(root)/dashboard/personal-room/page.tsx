"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { FiCopy } from 'react-icons/fi';
import "../../../(root)/Styles/personal-room.css";

const Table = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-base font-medium text-white lg:text-xl">{title}:</h1>
      <div className="flex items-center">
        <p className="text-sm font-bold text-white lg:text-xl">{description}</p>
        {icon && <div className="ml-2">{icon}</div>}
      </div>
    </div>
  );
};

const personalRoom = () => {
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
    <div className="body-section">
      <section className="personal-room-container flex flex-col gap-10 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Personal Room</h1>
        <div className="flex flex-col gap-8 xl:max-w-[900px]">
          <Table
            title="Topic"
            description={`${user?.username}'s Meeting Room`}
          />
          <Table title="Meeting ID" description={meetingID!} />
          <Table 
            title="Invite Link" 
            description={meetingLink} 
            icon={
              <FiCopy
                className="copy-icon"
                onClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  toast({ title: "Link Copied" });
                }}
              />
            }
          />
        </div>
        <div className="flex gap-5 text-white">
          <Button className="custom-button" onClick={startRoom}>
            Start Meeting
          </Button>
        </div>
      </section>
    </div>
  );
};

export default personalRoom;

