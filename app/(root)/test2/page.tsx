// "use client";

// import "../styles/datePicker.css";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import "../../(root)/Styles/dashboard.css";
// import "react-datepicker/dist/react-datepicker.css";
// import MeetingModel from "@/components/MeetingModel";
// import MeetingTypeList from "@/components/MeetingTypeList";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";
// import { useUser } from "@clerk/nextjs";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
// import ReactDatePicker from "react-datepicker";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// import { addDays, format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { DateRange } from "react-day-picker";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// const Home = () => {
//   const [date, setDate] = React.useState<DateRange | undefined>({
//     from: new Date(2022, 0, 20),
//     to: addDays(new Date(2022, 0, 20), 20),
//   });
//   const router = useRouter();
//   const { user } = useUser();
//   const { toast } = useToast();
//   const [name, setName] = useState("");
//   const [meetingState, setMeetingState] = useState<
//     "isScheduleMeeting" | "isJoiningMeeting" | "isHostMeeting" | undefined
//   >(undefined);
//   const [callDetail, setCallDetail] = useState<Call>();
//   const [isDialogOpen, setIsDialogOpen] = useState(true); // State to control the dialog
//   const client = useStreamVideoClient();
//   const [values, setValues] = useState({
//     dateTime: new Date(),
//     description: "",
//     link: "",
//   });
//   const [callDetails, setCallDetails] = useState<Call>();

//   useEffect(() => {
//     setIsDialogOpen(true); // Open the dialog when the component mounts
//   }, []);

//   const toggleDialog = () => {
//     setIsDialogOpen(!isDialogOpen);
//   };

//   const createMeeting = async () => {
//     if (!client || !user) return;

//     try {
//       if (!values.dateTime) {
//         toast({
//           title: "Please select a date and time",
//         });
//         return;
//       }

//       const id = crypto.randomUUID();
//       const call = client.call("default", id);

//       if (!call) {
//         throw new Error("Failed to create call");
//       }

//       const startsAt =
//         values.dateTime.toISOString() || new Date(Date.now()).toISOString();
//       const description = values.description || "Instant meeting";

//       await call.getOrCreate({
//         data: {
//           starts_at: startsAt,
//           custom: {
//             description,
//           },
//         },
//       });

//       setCallDetails(call);

//       if (!values.description) {
//         router.push(`/meeting/${call.id}`);
//       }

//       toast({
//         title: "Meeting created successfully",
//       });
//     } catch (error) {
//       console.error("Error creating meeting:", error);
//       toast({
//         title: "Error creating meeting",
//       });
//     }
//   };

//   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

//   return (
//     <>
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-3xl p-10 bg-background_of_dashboard-1 overflow-y-auto rounded-xl">
//           <DialogHeader>
//             <DialogTitle className="text-center text-3xl">
//               Pricing & Plans
//             </DialogTitle>

//             <DialogDescription>
//               <div className="flex justify-around mt-6 w-full gap-4">
//                 <Card className="bg-white shadow-xl w-1/3 text-center p-4 flex flex-col rounded-2xl ">
//                   <CardHeader>
//                     <CardTitle className="bg-gradient-to-r from-gray-600 to-white p-2 text-lg">
//                       Free
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-3xl my-6">
//                       <sup className="text-sm">$</sup>0
//                     </p>

//                     <ul className="text-left list-disc pl-1 text-xs">
//                       <li>Meetings</li>
//                       <li>Team Chat</li>
//                       <li>Notepad</li>
//                     </ul>
//                   </CardContent>
//                   <CardFooter className="mt-auto flex justify-center">
//                     <button className="bg-gray-300 text-black py-2 px-4 border-2 hover:bg-gray-500">
//                       Current Plan
//                     </button>
//                   </CardFooter>
//                 </Card>

//                 <Card className="bg-white shadow-xl w-1/3 text-center p-4 flex flex-col rounded-xl">
//                   <CardHeader>
//                     <CardTitle className="bg-gradient-to-r from-[#4E4176] to-white p-2 text-lg">
//                       Lite
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-3xl my-6">
//                       <sup className="text-sm">$</sup>12
//                       <sub className="text-sm">/ mo</sub>
//                     </p>
//                     <ul className="text-left list-disc pl-1 text-xs">
//                       <li>Unlimited Meetings & Participants</li>
//                       <li>Breakout Rooms & Team Chat</li>
//                       <li>Coin Toss & Point Display</li>
//                       <li>Integrated Notepad</li>
//                     </ul>
//                   </CardContent>
//                   <CardFooter className="mt-auto flex justify-center">
//                     <button className="bg-dark-1 text-white py-2 px-4 border-2 w-full hover:bg-[#4E4176]">
//                       Upgrade
//                     </button>
//                   </CardFooter>
//                 </Card>

//                 <Card className="bg-white shadow-xl w-1/3 text-center p-4 flex flex-col rounded-2xl ">
//                   <CardHeader>
//                     <CardTitle className="bg-gradient-to-r from-[#5A5DAF] to-white p-2 text-lg">
//                       Pro
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-3xl my-6">
//                       <sup className="text-sm">$</sup>10
//                       <sub className="text-sm">/ 12 mo</sub>
//                     </p>

//                     <ul className="text-left list-disc pl-1 text-xs">
//                       <li>All Pro Features</li>
//                       <li>Custom Solutions</li>
//                       <li>24/7 Support</li>
//                     </ul>
//                   </CardContent>
//                   <CardFooter className="mt-auto flex justify-center">
//                     <button className="bg-dark-1 text-white py-2 px-4 border-2 w-full hover:bg-[#4E4176]">
//                       Upgrade
//                     </button>
//                   </CardFooter>
//                 </Card>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//       <section className="flex flex-col">
//         <div className="flex flex-col gap-20 mx-auto max-w-5xl p-4 bg-background_of_dashboard-1 rounded-lg w-full">
//           <div className="flex h-auto">
//             <div className="flex gap-20 w-full flex-grow">
//               <div className="flex flex-[3] bg-white rounded-2xl shadow-md p-4 flex-col">
//                 <div className="flex w-full">
//                   <div className="flex1 items-center w-fit">
//                     <Image
//                       src={user?.imageUrl || ""}
//                       height={150}
//                       width={150}
//                       alt="profile pic"
//                       className="rounded-xl"
//                     />
//                   </div>
//                   <div className="w-3/4 pl-5 flex flex-col justify-center">
//                     <h2 className="text-2xl font-bold">
//                       {user?.firstName} {user?.lastName}
//                     </h2>
//                     <p className="text-sm">
//                       {user?.primaryEmailAddress?.emailAddress}
//                     </p>
//                     <span className="w-max inline-block px-3 py-1 mt-2 text-sm text-white bg-[#5A5DAF] rounded-full">
//                       Free plan
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-evenly mt-5 bg-gray-200 p-9 rounded-2xl flex-col">
//                   <span className="text-left font-bold">
//                     Included in your plan:
//                   </span>
//                   <br></br>
//                   <div className="flex space-x-2">
//                     <span className="flex items-center space-x-2">
//                       <Image
//                         src="/icons/chat_bubble.svg"
//                         height={30}
//                         width={30}
//                         alt="chat icon"
//                       />
//                       <label htmlFor="chat">Chat</label>
//                     </span>
//                     <span className="flex items-center space-x-2">
//                       <Image
//                         src="/icons/video(ps).svg"
//                         height={30}
//                         width={30}
//                         alt="chat icon"
//                       />
//                       <label htmlFor="meeting">Meeting</label>
//                     </span>
//                     <span className="flex items-center space-x-2">
//                       <Image
//                         src="/icons/notes(ps).svg"
//                         height={30}
//                         width={30}
//                         alt="meeting icon"
//                       />
//                       <label htmlFor="notes">Notes</label>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-[2] bg-white flex-col rounded-2xl">
//                 <div className="flex flex-[1] last:items-center gap-8 justify-evenly items-center p-3">
//                   <MeetingTypeList
//                     img="/icons/schedule-meeting.svg"
//                     title="Schedule"
//                     handleClick={() => setMeetingState("isScheduleMeeting")}
//                   />
//                   <MeetingTypeList
//                     img="/icons/join-meeting.svg"
//                     title="Join"
//                     handleClick={() => setMeetingState("isJoiningMeeting")}
//                   />
//                   <MeetingTypeList
//                     img="/icons/host-meeting.svg"
//                     title="Host"
//                     handleClick={() => setMeetingState("isHostMeeting")}
//                   />
//                   <MeetingTypeList
//                     img="/icons/cassette-tape.svg"
//                     title="Recordings"
//                     handleClick={() => router.push("/dashboard/recordings")}
//                   />

//                   {!callDetails ? (
//                     <MeetingModel
//                       isOpen={meetingState === "isScheduleMeeting"}
//                       onClose={() => setMeetingState(undefined)}
//                       title="Create Meeting"
//                       buttonText="Schedule Meeting"
//                       handleClick={createMeeting}
//                     >
//                       <div className="flex flex-col gap-2.5">
//                         <label className="text-base font-normal leading-[22.4px] text-sky-2">
//                           Add a description
//                         </label>
//                         <Textarea
//                           className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
//                           onChange={(e) =>
//                             setValues({
//                               ...values,
//                               description: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div className="flex w-full flex-col gap-2.5">
//                         <label className="text-base font-normal leading-[22.4px] text-sky-2">
//                           Select Date and Time
//                         </label>
//                         <ReactDatePicker
//                           selected={values.dateTime}
//                           onChange={(date) =>
//                             setValues({ ...values, dateTime: date! })
//                           }
//                           showTimeSelect
//                           timeFormat="HH:mm"
//                           timeIntervals={15}
//                           timeCaption="time"
//                           dateFormat="MMMM d, yyyy h:mm aa"
//                           className="w-full rounded bg-dark-3 p-2 focus:outline-none custom-datepicker-input"
//                         />
//                       </div>
//                     </MeetingModel>
//                   ) : (
//                     <MeetingModel
//                       isOpen={meetingState === "isScheduleMeeting"}
//                       onClose={() => setMeetingState(undefined)}
//                       title="Meeting Created"
//                       handleClick={() => {
//                         navigator.clipboard.writeText(meetingLink);
//                         toast({ title: "Link Copied" });
//                       }}
//                       image={"/icons/checked.svg"}
//                       buttonIcon="/icons/copy.svg"
//                       className="text-center"
//                       buttonText="Copy Meeting Link"
//                     />
//                   )}

//                   <MeetingModel
//                     isOpen={meetingState === "isJoiningMeeting"}
//                     onClose={() => setMeetingState(undefined)}
//                     title="Type the link here"
//                     className="text-center"
//                     buttonText="Join Meeting"
//                     handleClick={() => router.push(values.link)}
//                   >
//                     <Input
//                       placeholder="Meeting link"
//                       onChange={(e) =>
//                         setValues({ ...values, link: e.target.value })
//                       }
//                       className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
//                     />
//                   </MeetingModel>

//                   <MeetingModel
//                     isOpen={meetingState === "isHostMeeting"}
//                     onClose={() => setMeetingState(undefined)}
//                     title="Start an Instant Meeting"
//                     className="text-center"
//                     buttonText="Start Meeting"
//                     handleClick={createMeeting}
//                   />
//                 </div>
//                 <div className="flex flex-[2] justify-center items-center">
//                   <Card className="bg-slate-200 outline-none rounded-xl ml-7">
//                     <CardContent className="flex flex-col bg-slate-200 m-1 justify-center">
//                       <br></br>
//                       <h3 className="font-semibold">Personal meeting ID</h3>
//                       <br></br>
//                       <div className="flex flex-row items-center gap-3">
//                         <h3>305-206-243</h3>
//                         <div className="copyicon">
//                           <Image
//                             src={"/icons/copy.png"}
//                             width={30}
//                             height={30}
//                             alt="copy id icon"
//                             className="icon-color"
//                           />
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex h-60 items-center my-1 bg-white p-8 rounded-2xl">
//             <Tabs defaultValue="upcoming" className="w-full">
//               <TabsList className="grid w-full grid-cols-2 bg-white">
//                 <TabsTrigger
//                   value="upcoming"
//                   className="w-full text-center py-2"
//                 >
//                   Upcoming
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="previous"
//                   className="w-full text-center py-2 "
//                 >
//                   Previous
//                 </TabsTrigger>
//               </TabsList>
//               <TabsContent value="upcoming">
//                 <Card className="text-center mt-4 bg-slate-200 outline-none border-none">
//                   <CardHeader>
//                     <br></br> <CardTitle>No upcoming meetings</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-2 flex justify-center">
//                     <br></br>
//                     <button
//                       type="button"
//                       className="bg-[#5A5DAF] text-white py-2 px-4 rounded-lg"
//                     >
//                       Schedule a meeting
//                     </button>
//                   </CardContent>
//                   <CardFooter></CardFooter>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="previous">
//                 <Card className="text-center mt-4 bg-slate-200 outline-none border-none">
//                   <CardHeader>
//                     <br></br>
//                     <CardTitle>Previous</CardTitle>
//                     <CardDescription>
//                       View your past events here.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-2 flex justify-center">
//                     {/* Add content for previous events */}
//                   </CardContent>
//                   <CardFooter></CardFooter>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;