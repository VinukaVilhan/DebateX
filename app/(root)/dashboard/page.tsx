"use client"


import React, { useState, useEffect } from "react";
import Image from "next/image";

import MeetingModel from "@/components/MeetingModel";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";








const Home = () => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isHostMeeting" | undefined
  >(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(true); // State to control the dialog
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  useEffect(() => {
    setIsDialogOpen(true); // Open the dialog when the component mounts
  }, []);

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
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-10 bg-background_of_dashboard-1 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">Pricing</DialogTitle>
            <DialogDescription>
              <div className="flex justify-around mt-6 w-full gap-4">
                <Card className="bg-white shadow-md w-1/3 text-center p-4 flex flex-col">
                  <CardHeader>
                    <CardTitle>Basic (Free)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-left list-disc pl-1">
                      <li>Meetings</li>
                      <li>Team Chat</li>
                      <li>Notepad</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-center">
                    <button className="bg-gray-300 text-black py-2 px-4 rounded-lg">
                      Current Plan
                    </button>
                  </CardFooter>
                </Card>
                <Card className="bg-white shadow-md w-1/3 text-center p-4 flex flex-col">
                  <CardHeader>
                    <CardTitle>Pro ($15/month)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-left list-disc pl-1">
                      <li>Unlimited Meetings</li>
                      <li>Breakout Rooms</li>
                      <li>Unlimited Participants</li>
                      <li>Coin Toss</li>
                      <li>Team Chat</li>
                      <li>Point display</li>
                      <li>Notepad</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-center">
                    <button className="bg-background_of_dashboard-1 text-white py-2 px-4 rounded-lg">
                      Upgrade
                    </button>
                  </CardFooter>
                </Card>
                <Card className="bg-white shadow-md w-1/3 text-center p-4 flex flex-col">
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-left list-disc pl-1">
                      <li>All Pro Features</li>
                      <li>Custom Solutions</li>
                      <li>24/7 Support</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-center">
                    <button className="bg-purple-600 text-white py-2 px-4 rounded-lg">
                      Upgrade
                    </button>
                  </CardFooter>
                </Card>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <section className="flex flex-col">
        <div className="flex flex-col gap-4 mx-auto max-w-5xl p-4 bg-background_of_dashboard-1 rounded-lg w-full">
          <div className="flex h-auto">
            <div className="flex gap-4 w-full flex-grow">
              <div className="flex flex-[3] bg-white rounded-lg shadow-md p-1 flex-col">
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
                    <p>{user?.primaryEmailAddressId}</p>
                    <span className="w-max inline-block px-3 py-1 mt-2 text-sm text-white bg-purple-600 rounded-full">
                      Free plan
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-[2] bg-red-100 rounded-lg flex-col">
              <div className="flex flex-[1] bg-white last:items-center gap-5 justify-evenly items-center">
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
              <div className="flex flex-[1] bg-white justify-center items-center">
                <Card className="bg-slate-400 outline-none rounded-xl m-4">
                  <CardContent className="flex flex-col bg-slate-400 m-1 justify-center">
                    <h3 className="font-semibold">Personal meeting ID</h3>
                    <div className="flex flex-row items-center gap-2">
                      <h3>305-206-243</h3>
                      <div className="flex items-center justify-evenly mt-2 bg-gray-100 p-9 rounded-lg flex-col">
                        <span className="text-left">Included in your plan:</span>
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex h-60 items-center my-1">
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
                <Card className="text-center mt-4 bg-slate-400 outline-none border-none">
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
                <Card className="text-center mt-4 bg-slate-400 outline-none border-none">
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
    </>
  );
};

export default Home;
