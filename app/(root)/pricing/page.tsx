"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
const [isDialogOpen, setIsDialogOpen] = useState(true); // State to control the dialog
useEffect(() => {
  setIsDialogOpen(true); // Open the dialog when the component mounts
}, []);

const toggleDialog = () => {
  setIsDialogOpen(!isDialogOpen);
};

const Pricing = () => {
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
                    <button className="bg-gray-300 text-black py-2 px-4 border-2 hover:bg-gray-500">
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

      {/* <Link href="/dashboard" className="bg-white">
        Dashboard
      </Link>
      <div className="flex justify-around mt-6 w-full">
        <Card className="bg-white shadow-md w-1/3 text-center p-4">
          <CardHeader>
            <CardTitle>Basic (Free)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-left">
              <li></li>
              <li>Team Chat</li>
              <li>Notepad</li>
            </ul>
          </CardContent>
          <CardFooter>
            <button className="bg-gray-300 text-black py-2 px-4 rounded-lg">
              Current Plan
            </button>
          </CardFooter>
        </Card>
        <Card className="bg-white shadow-md w-1/3 text-center p-4">
          <CardHeader>
            <CardTitle>Pro ($15/month)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-left">
              <li>Unlimited Meetings</li>
              <li>Breakout Rooms</li>
              <li>Unlimited Participants</li>
              <li>Coin Toss</li>
              <li>Team Chat</li>
              <li>Point display</li>
              <li>Notepad</li>
            </ul>
          </CardContent>
          <CardFooter>
            <button className="bg-purple-600 text-white py-2 px-4 rounded-lg">
              Upgrade
            </button>
          </CardFooter>
        </Card>
        <Card className="bg-white shadow-md w-1/3 text-center p-4">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-left">
              <li>All Pro Features</li>
              <li>Custom Solutions</li>
              <li>24/7 Support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <button className="bg-purple-600 text-white py-2 px-4 rounded-lg">
              Upgrade
            </button>
          </CardFooter>
        </Card>
      </div> */}
    </>
  );
};

export default Pricing;
