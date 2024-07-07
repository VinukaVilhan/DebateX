"use client";

import Image from "next/image";
import React from "react";
import MeetingModel from "./MeetingModel";

type MeetingTypeListProps = {
  img: string;
  title: string;
  handleClick?: () => void;
};

const MeetingTypeList = ({ img, title, handleClick }: MeetingTypeListProps) => {
  return (
    <div>
      <div className="flex flex-col gap-1 my-auto">
        <Image
          src={img}
          width={40}
          height={40}
          alt={title}
          onClick={handleClick}
          className="cursor-pointer"
        />
        <p className="text-sm text-black">{title}</p>
      </div>
    </div>
  );
};

export default MeetingTypeList;
