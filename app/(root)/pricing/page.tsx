"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "@phosphor-icons/react";
import checkImg from "@/public/images/check-circle.svg";

const Pricing = () => {
  return (
    <main className="absolute top-0 w-screen bg-gradient-to-t from-white to-[#4E4176] to-90% min-h-screen">
      <nav className="fixed flex justify-between items-center z-50 w-full bg-dark-1 px-20 py-4">
        <Link href="/" className="flex items-center justify-center">
          <p className="text-4xl font-extrabold text-white max-sm:hidden">
            DebateX
          </p>
        </Link>
      </nav>
      <header>
        <h1 className="text-4xl font-bold text-center mt-24">
          Choose Your Plan
        </h1>
        <p className="text-center text-black-500 mt-2">
          Start with a 1-month free trial. No credit card required.
        </p>
      </header>
      <div className="flex justify-around mt-8 w-full px-48">
        <Card className="bg-white shadow-xl w-1/4 text-center p-4 flex flex-col rounded-2xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-gray-600 to-white p-2 text-lg">
              Free
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl my-6 mb-10">
              <sup className="text-sm">$</sup>0
            </p>
            <ul className="text-left pl-1 text-xs">
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                Meetings
              </li>
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                Team Chat
              </li>
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                Notepad
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-20 flex justify-center">
            <button className="bg-gray-300 text-black py-2 w-full px-4 border-2 hover:bg-gray-500">
              Current Plan
            </button>
          </CardFooter>
        </Card>

        <Card className="bg-white shadow-xl w-1/4 text-center p-4 flex flex-col rounded-xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-[#4E4176] to-white p-2 text-lg">
              Lite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl my-6 mb-10">
              <sup className="text-sm">$</sup>12
              <sub className="text-sm">/ mo</sub>
            </p>
            <ul className="text-left pl-1 text-xs">
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                Unlimited Meetings & Participants
              </li>
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                Breakout Rooms & Team Chat
              </li>
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                Coin Toss & Point Display
              </li>
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                Integrated Notepad
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto flex justify-center">
            <button className="bg-dark-1 text-white py-2 px-4 border-2 w-full hover:bg-[#4E4176]">
              Upgrade
            </button>
          </CardFooter>
        </Card>

        <Card className="bg-white shadow-xl w-1/4 text-center p-4 flex flex-col rounded-2xl">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-[#5A5DAF] to-white p-2 text-lg">
              Pro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl my-6 mb-10">
              <sup className="text-sm">$</sup>10
              <sub className="text-sm">/ 12 mo</sub>
            </p>
            <ul className="text-left pl-1 text-xs">
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                All Pro Features
              </li>
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                Custom Solutions
              </li>
              <li className="flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                24/7 Support
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto flex justify-center">
            <button className="bg-dark-1 text-white py-2 px-4 border-2 w-full hover:bg-[#4E4176]">
              Upgrade
            </button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Pricing;
