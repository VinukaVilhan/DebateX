
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
    <div>
      <div className="flex3 flex-col gap-1 items-center">
        <Image
          src={img}
          width={50} // Adjust width
          height={40} // Adjust height
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

