"use client";

import "../Styles/datePicker.css";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../../(root)/Styles/dashboard.css";
import "react-datepicker/dist/react-datepicker.css";
import MeetingModel from "@/components/MeetingModel";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
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
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { addDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  CassetteTape,
  PlusSquare,
  UserSquare,
} from "lucide-react";
import { DateRange } from "react-day-picker";

import { CalendarDots } from "@phosphor-icons/react/dist/ssr";
export default function Home() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isHostMeeting" | undefined
  >(undefined);
  const [callDetail, setCallDetail] = useState<Call>();
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

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl p-10 bg-background_of_dashboard-1 overflow-y-auto rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">
              Pricing & Plans
            </DialogTitle>

            <DialogDescription>
              <div className="flex justify-around mt-6 w-full gap-4">
                <Card className="bg-white shadow-xl w-1/3 text-center p-4 flex flex-col rounded-2xl ">
                  <CardHeader>
                    <CardTitle className="bg-gradient-to-r from-gray-600 to-white p-2 text-lg">
                      Free
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl my-6">
                      <sup className="text-sm">$</sup>0
                    </p>

                    <ul className="text-left list-disc pl-1 text-xs">
                      <li>Meetings</li>
                      <li>Team Chat</li>
                      <li>Notepad</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-center">
                    <button className="bg-gray-300 text-black py-2 px-4 border-2 w-full hover:bg-gray-500">
                      Current Plan
                    </button>
                  </CardFooter>
                </Card>

                <Card className="bg-white shadow-xl w-1/3 text-center p-4 flex flex-col rounded-xl">
                  <CardHeader>
                    <CardTitle className="bg-gradient-to-r from-[#4E4176] to-white p-2 text-lg">
                      Lite
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl my-6">
                      <sup className="text-sm">$</sup>12
                      <sub className="text-sm">/ mo</sub>
                    </p>
                    <ul className="text-left list-disc pl-1 text-xs">
                      <li>Unlimited Meetings & Participants</li>
                      <li>Breakout Rooms & Team Chat</li>
                      <li>Coin Toss & Point Display</li>
                      <li>Integrated Notepad</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-center">
                    <button className="bg-dark-1 text-white py-2 px-4 border-2 w-full hover:bg-[#4E4176]">
                      Upgrade
                    </button>
                  </CardFooter>
                </Card>

                <Card className="bg-white shadow-xl w-1/3 text-center p-4 flex flex-col rounded-2xl ">
                  <CardHeader>
                    <CardTitle className="bg-gradient-to-r from-[#5A5DAF] to-white p-2 text-lg">
                      Pro
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl my-6">
                      <sup className="text-sm">$</sup>10
                      <sub className="text-sm">/ 12 mo</sub>
                    </p>

                    <ul className="text-left list-disc pl-1 text-xs">
                      <li>All Pro Features</li>
                      <li>Custom Solutions</li>
                      <li>24/7 Support</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-center">
                    <button className="bg-dark-1 text-white py-2 px-4 border-2 w-full hover:bg-[#4E4176]">
                      Upgrade
                    </button>
                  </CardFooter>
                </Card>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="min-h-screen bg-black p-6">
        <main className="space-y-8">
          <div
            className="grid gap-6 px-4 lg:px-20 grid-cols-1 lg:grid-cols-[3fr_1fr]"
            style={{ alignItems: "stretch" }}
          >
            <span className="profileCard w-full">
              <div className="bg-custom-gradient rounded-xl px-6 lg:px-10 py-6 lg:py-10 shadow-lg h-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={user?.imageUrl || ""}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-white text-xl lg:text-2xl font-semibold">
                        {user?.firstName} {user?.lastName}
                      </h2>
                      <p className="text-purple-200">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <button className="text-purple-200 border border-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg">
                    Free Plan
                  </button>
                </div>

                <div className="flex mt-4 flex-col lg:flex-row justify-between items-center">
                  <div className="bg-white text-black rounded-lg p-4 w-full lg:w-1/2">
                    <h3 className="text-lg font-semibold mb-3">
                      Included in your plan
                    </h3>
                    <div className="flex flex-row space-y-4 lg:space-y-0 lg:space-x-10">
                      <span className="flex items-center space-x-1">
                        <Image
                          src="/icons/chat_bubble.svg"
                          height={30}
                          width={30}
                          alt="chat icon"
                        />
                        <label htmlFor="chat">Chat</label>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Image
                          src="/icons/video(ps).svg"
                          height={30}
                          width={30}
                          alt="meeting icon"
                        />
                        <label htmlFor="meeting">Meeting</label>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Image
                          src="/icons/notes(ps).svg"
                          height={30}
                          width={30}
                          alt="notes icon"
                        />
                        <label htmlFor="notes">Notes</label>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 items-center mt-4 lg:mt-0 lg:bg-red-500 xl:bg-pink-900 2xl:bg-green-600">
                    <button className="border-white border font-bold text-white bg-blue-2 px-4 py-2 xl:px-3 2xl:px-5 xl:py-3 rounded text-sm 2xl:text-md">
                      Change Plan
                    </button>
                    <button className="bg-field-2 text-black font-bold border-2 border-white px-4 py-2 lg:px-6 lg:py-3 xl:p-3 rounded text-sm 2xl:text-md">
                      Personal - Room
                    </button>
                  </div>
                </div>
              </div>
            </span>

            <span className="ScheduleCard2 w-full mt-8 lg:mt-0">
              <div className="bg-custom-gradient rounded-xl p-6 text-white shadow-lg h-full">
                <div className="flex flex-col items-center">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center p-5 justify-evenly">
                    <MeetingTypeList
                      icon={<CalendarDots size={50} color="#FFFFFF" />}
                      title="Schedule"
                      handleClick={() => setMeetingState("isScheduleMeeting")}
                    />
                    <MeetingTypeList
                      icon={<PlusSquare size={50} color="#FFFFFF" />}
                      title="Join"
                      handleClick={() => setMeetingState("isJoiningMeeting")}
                    />
                    <MeetingTypeList
                      icon={<UserSquare size={50} color="#FFFFFF" />}
                      title="Host"
                      handleClick={() => setMeetingState("isHostMeeting")}
                    />
                    <MeetingTypeList
                      icon={<CassetteTape size={50} color="#FFFFFF" />}
                      title="Recordings"
                      handleClick={() => router.push("/dashboard/recordings")}
                    />
                    {!callDetails ? (
                      <MeetingModel
                        isOpen={meetingState === "isScheduleMeeting"}
                        onClose={() => setMeetingState(undefined)}
                        title="Create Meeting"
                        buttonText="Schedule Meeting"
                        handleClick={createMeeting}
                      >
                        <div className="flex flex-col gap-2.5">
                          <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Add a description
                          </label>
                          <Textarea
                            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            onChange={(e) =>
                              setValues({
                                ...values,
                                description: e.target.value,
                              })
                            }
                          />{" "}
                        </div>
                        <div className="flex w-full flex-col gap-2.5">
                          <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Select Date and Time
                          </label>
                          <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) =>
                              setValues({ ...values, dateTime: date! })
                            }
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-3 p-2 focus:outline-none custom-datepicker-input"
                          />
                        </div>
                      </MeetingModel>
                    ) : (
                      <MeetingModel
                        isOpen={meetingState === "isScheduleMeeting"}
                        onClose={() => setMeetingState(undefined)}
                        title="Meeting Created"
                        handleClick={() => {
                          navigator.clipboard.writeText(meetingLink);
                          toast({ title: "Link Copied" });
                        }}
                        image={"/icons/checked.svg"}
                        buttonIcon="/icons/copy.svg"
                        className="text-center"
                        buttonText="Copy Meeting Link"
                      />
                    )}

                    <MeetingModel
                      isOpen={meetingState === "isJoiningMeeting"}
                      onClose={() => setMeetingState(undefined)}
                      title="Type the link here"
                      className="text-center"
                      buttonText="Join Meeting"
                      handleClick={() => router.push(values.link)}
                    >
                      <Input
                        placeholder="Meeting link"
                        onChange={(e) =>
                          setValues({ ...values, link: e.target.value })
                        }
                        className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                      />
                    </MeetingModel>

                    <MeetingModel
                      isOpen={meetingState === "isHostMeeting"}
                      onClose={() => setMeetingState(undefined)}
                      title="Start an Instant Meeting"
                      className="text-center"
                      buttonText="Start Meeting"
                      handleClick={createMeeting}
                    />
                  </div>
                  <div className="bg-white text-black rounded px-10 py-2 text-center flex flex-col items-center">
                    <h1 className="text-black mb-2">Personal Meeting ID</h1>
                    <span className="flex items-center gap-2">
                      <p className="text-lg font-bold">305 208 1729-H</p>
                      <Image
                        src={"/icons/copy.png"}
                        width={30}
                        height={30}
                        alt="copy id icon"
                        className="cursor-pointer icon-color"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </main>
      </div>
    </>
  );
}
