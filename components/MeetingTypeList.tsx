"use client";

import React from "react";
import { CassetteTape,CalendarDots,PlusSquare,UserSquare } from "@phosphor-icons/react/dist/ssr"; // or wherever the CaretRight icon is from

type MeetingTypeListProps = {
  icon: JSX.Element;
  title: string;
  handleClick?: () => void;
};

const MeetingTypeList = ({ icon, title, handleClick }: MeetingTypeListProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div onClick={handleClick} className="cursor-pointer">
        {icon}
      </div>
      <p className="text-sm text-white ">{title}</p>
    </div>
  );
};

export default MeetingTypeList;
