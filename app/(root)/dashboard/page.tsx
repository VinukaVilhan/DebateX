"use client"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth } from "@/lib/firebase/config";

import React,{useState,useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import NavbarDashboard from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const [name, setName] = useState("");
  const storage = getStorage();
  const user = auth.currentUser;
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "");
        if (user.photoURL) {
          setProfileImageUrl(user.photoURL);
        } else {
          const profileImageRef = ref(storage, `profile_images/${user.uid}`);
          getDownloadURL(profileImageRef)
            .then((url) => {
              setProfileImageUrl(url);
            })
            .catch((error) => {
              console.error("Error fetching profile image:", error);
            });
        }
      } else {
        console.log("User is logged out");
        setName("");
        setProfileImageUrl("");
      }
    });
  }, [user, storage]);
  return (
    <section className="flex size-full flex-col gap-10 text-black">
    
      <div className="flex flex-col gap-4 mx-auto max-w-5xl p-4 bg-gray-100 rounded-lg">
        <div className="flex h-60">
          <div className="flex gap-4 w-full">
            <div className="flex flex-[3] bg-white rounded-lg shadow-md p-4">
              <div className="flex w-full">
                <div className="flex items-center w-full">
                  <img
                    src={profileImageUrl}
                    height={500}
                    width={500}
                    alt='profile pic'

                  />
                </div>
                <div className="w-3/4 pl-4 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold">Michelle James</h2>
                  <p>james95@gmail.com</p>
                  <span className="inline-block px-3 py-1 mt-2 text-sm text-white bg-purple-600 rounded-full">Free plan</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 bg-gray-100 p-2 rounded-lg">
                <span>Included in your plan:</span>
                <div className="flex space-x-4">
                  <span className="flex items-center space-x-2"><input type="checkbox" /> <span>Chat</span></span>
                  <span className="flex items-center space-x-2"><input type="checkbox" /> <span>Meeting</span></span>
                  <span className="flex items-center space-x-2"><input type="checkbox" /> <span>Notes</span></span>
                  <span className="flex items-center space-x-2"><input type="checkbox" /> <span>Score board</span></span>
                </div>
              </div>
            </div>
            <div className="flex flex-[2] bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-evenly mb-4">
                  <MeetingTypeList img='/icons/schedule-meeting.svg' title='Schedule' />
                  <MeetingTypeList img='/icons/join-meeting.svg' title='Join' />
                  <MeetingTypeList img='/icons/host-meeting.svg' title='Host' />
                </div>
                <div className="flex justify-center items-center bg-gray-100 p-2 rounded-lg">
                  <div className="text-center">
                    <p>Personal Meeting ID</p>
                    <p className="font-bold">305 208 1729-H</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-md rounded-lg">
              <TabsTrigger value="upcoming" className="w-full text-center py-2">Upcoming</TabsTrigger>
              <TabsTrigger value="previous" className="w-full text-center py-2">Previous</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card className='text-center mt-4'>
                <CardHeader>
                  <CardTitle>No upcoming meetings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  <button className="bg-purple-600 text-white py-2 px-4 rounded-lg">Schedule a meeting</button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="previous">
              <Card className='text-center mt-4'>
                <CardHeader>
                  <CardTitle>Previous</CardTitle>
                  <CardDescription>
                    View your past events here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex justify-center">
                  {/* Add content for previous events */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </section>
  );
};

export default Home;
