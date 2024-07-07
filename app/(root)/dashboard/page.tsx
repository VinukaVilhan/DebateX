"use client";

import React, { useState } from "react";
import NavbarDashboard from "@/components/Navbar";
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
import MeetingModel from "@/components/MeetingModel";

const Home = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isHostMeeting" | undefined
  >(undefined);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="flex flex-col gap-4">
        <div className="flex h-60">
          <div className="flex gap-4 w-full">
            <div className="flex flex-[3] bg-red-100 rounded-sm flex-col">
              {/* Content for first part */}
              <div className="flex flex-[1] bg-slate-600">
                <div className="w-1/4 bg-red-500 last:items-center justify-end">
                  {/* Content for the smaller part */}
                  <Image
                    src="/images/avatar-1.jpeg"
                    height={100}
                    width={100}
                    alt="profile pic"
                  />
                </div>
                <div className="w-3/4 bg-blue-500">
                  {/* Content for the larger part */}
                  large
                </div>
              </div>
              <div className="flex flex-[1] bg-slate-900"></div>
            </div>
            <div className="flex flex-[2] bg-red-100 rounded-lg flex-col">
              {/* Content for second part */}
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
                  buttonText="Start a Meeting"
                  handleClick={() => {}}
                />
              </div>
              <div className="flex-[1] bg-black">
                <p>till</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-60 items-center">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="previous">Previous</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>
                    View your upcoming events here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  <div className="space-y-1">
                    {/* Add content for upcoming events */}
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="previous">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Previous</CardTitle>
                  <CardDescription>View your past events here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  <div className="space-y-1">
                    {/* Add content for previous events */}
                  </div>
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
