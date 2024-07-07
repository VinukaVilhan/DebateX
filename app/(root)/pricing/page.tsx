import React from "react";
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

const Pricing = () => {
  return (
    <>
      <button>
        <Link href="/dashboard" className="bg-white">
          Dashboard
        </Link>     <div className="flex justify-around mt-6 w-full">
          <Card className="bg-white shadow-md w-1/3 text-center p-4">
            <CardHeader>
              <CardTitle>Basic (Free)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-left">
                <li>Meetings</li>
                <li>Team Chat</li>
                <li>Notepad</li>
              </ul>
            </CardContent>
            <CardFooter>
              <button className="bg-gray-300 text-black py-2 px-4 rounded-lg">Current Plan</button>
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
              <button className="bg-purple-600 text-white py-2 px-4 rounded-lg">Upgrade</button>
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
              <button className="bg-purple-600 text-white py-2 px-4 rounded-lg">Upgrade</button>
            </CardFooter>
          </Card>
        </div>
      </button>
    </>
  );
};

export default Pricing;
