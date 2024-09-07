"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { avatarImages } from "@/constants";
import { useToast } from "./use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  // Convert the date string into a Date object
  const dateObj = new Date(date);

  // Format the date as "date month"
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short", // e.g., "Sep"
  });

  // Format the time as "10.49 AM"
  const formattedTime = dateObj
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(":", ".");

  // get name of the day
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="flex flex-col w-full justify-between gap-6 rounded-2xl bg-dark-1 px-9 py-8 mx-auto">
      <div className="flex flex-col gap-2 pl-2">
        <article className="flex items-center gap-3">
          <Image src={icon} alt="upcoming" width={28} height={28} />
          <div className="flex flex-col gap-2">
            {/* <h1 className="text-2xl font-bold">{title}</h1> */}
            <h1 className="text-4xl font-bold mb-0">{`${formattedDate}`}</h1>
          </div>
        </article>

        <article>
          <p className="text-base font-normal">{`${formattedTime}, ${dayName}`}</p>
        </article>
      </div>
      <article
        className={cn("flex flex-col justify-center relative gap-4", {})}
      >
        {/* <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img: string, index: number) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div> */}
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="rounded bg-blue-1 px-6 w-2/3 flex gap-1 justify-center"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              <p className="text-lg">{buttonText}</p>
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-2"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
