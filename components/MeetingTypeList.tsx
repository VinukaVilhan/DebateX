"use client";

import Image from "next/image";
import React from "react";

type MeetingTypeListProps = {
  img: string;
  title: string;
  handleClick?: () => void;
};

const MeetingTypeList = ({ img, title, handleClick }: MeetingTypeListProps) => {
  return (
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
  );
};

export default MeetingTypeList;
