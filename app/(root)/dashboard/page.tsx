"use client";

import MeetingModel from "@/components/MeetingModel";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import MeetingTypeList from "@/components/MeetingTypeList";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";

const Home = () => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [meetingState, setMeetingState] = useState<
    | "isScheduleMeeting"
    | "isJoiningMeeting"
    | "isHostMeeting"
    | undefined
  >(undefined);

  const [email, setEmail] = useState("");

  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) {
        throw new Error("Failed to create call");
      }

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created successfully",
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast({
        title: "Error creating meeting",
      });
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-4 mx-auto max-w-5xl p-4 bg-background_of_dashboard-1 rounded-lg w-full">
        <div className="flex h-auto">
          <div className="flex gap-4 w-full flex-grow">
            <div className="flex flex-[3] bg-white rounded-2xl shadow-md p-4 flex-col">
              <div className="flex w-full">
                <div className="flex items-center w-fit">
                  <Image
                    src={user?.imageUrl || ""}
                    height={150}
                    width={150}
                    alt="profile pic"
                    className="rounded-xl"
                  />
                </div>
                <div className="w-3/4 pl-5 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
                  <span className="w-max inline-block px-3 py-1 mt-2 text-sm text-white bg-purple-600 rounded-full">
                    Free plan
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-evenly mt-2 bg-gray-200 p-9 rounded-2xl flex-col">
                <span className="text-left ">Included in your plan:</span>
                <div className="flex space-x-9">
                  <span className="flex items-center space-x-2">
                    <Image
                      src="/icons/chat_bubble.svg"
                      height={30}
                      width={30}
                      alt="chat icon"
                    />
                    <label htmlFor="chat">Chat</label>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Image
                      src="/icons/video(ps).svg"
                      height={30}
                      width={30}
                      alt="chat icon"
                    />
                    <label htmlFor="meeting">Meeting</label>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Image
                      src="/icons/notes(ps).svg"
                      height={30}
                      width={30}
                      alt="meeting icon"
                    />
                    <label htmlFor="notes">Notes</label>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-[2] bg-white flex-col rounded-2xl">
              <div className="flex flex-[1] last:items-center gap-5 justify-evenly items-center p-3">
                <MeetingTypeList
                  img="/icons/schedule-meeting.svg"
                  title="Schedule"
                  handleClick={() => setMeetingState("isScheduleMeeting")}
                />
                <MeetingTypeList
                  img="/icons/join-meeting.svg"
                  title="Join"
                  handleClick={() => setMeetingState("isJoiningMeeting")}
                />
                <MeetingTypeList
                  img="/icons/host-meeting.svg"
                  title="Host"
                  handleClick={() => setMeetingState("isHostMeeting")}
                />
                <MeetingTypeList
                  img="/icons/recordings.svg"
                  title="Recordings"
                  handleClick={() => router.push("/dashboard/recordings")}
                />
                <MeetingModel
                  isOpen={meetingState === "isHostMeeting"}
                  onClose={() => setMeetingState(undefined)}
                  title="Host a Meeting"
                  className="text-center"
                  buttonText="Start an instant Meeting"
                  handleClick={createMeeting}
                />

                <MeetingModel
                  isOpen={meetingState === "isJoiningMeeting"}
                  onClose={() => setMeetingState(undefined)}
                  title="Join a Meeting"
                  className="text-center"
                  buttonText="Join Meeting"
                  handleClick={() => {}}
                />

                <MeetingModel
                  isOpen={meetingState === "isScheduleMeeting"}
                  onClose={() => setMeetingState(undefined)}
                  title="Schedule a Meeting"
                  className="text-center"
                  buttonText="Schedule Meeting"
                  handleClick={() => {}}
                />
              </div>
              <div className="flex flex-[1] justify-center items-center">
                <Card className="bg-slate-200 outline-none rounded-xl">
                  <CardContent className="flex flex-col bg-slate-200 m-1 justify-center">
                    <h3 className="font-semibold">Personal meeting ID</h3>
                    <div className="flex flex-row items-center gap-2">
                      <h3>305-206-243</h3>
                      <Image
                        src={"/icons/copy.png"}
                        width={30}
                        height={30}
                        alt="copy id icon"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-60 items-center my-1 bg-white p-3 rounded-2xl">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white">
              <TabsTrigger value="upcoming" className="w-full text-center py-2">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="previous" className="w-full text-center py-2">
                Previous
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card className="text-center mt-4 bg-slate-200 outline-none border-none">
                <CardHeader>
                  <CardTitle>No upcoming meetings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  <button
                    type="button"
                    className="bg-purple-600 text-white py-2 px-4 rounded-lg"
                  >
                    Schedule a meeting
                  </button>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="previous">
              <Card className="text-center mt-4 bg-slate-200 outline-none border-none">
                <CardHeader>
                  <CardTitle>Previous</CardTitle>
                  <CardDescription>View your past events here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  {/* Add content for previous events */}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </section>
  );
};

export default Home;
