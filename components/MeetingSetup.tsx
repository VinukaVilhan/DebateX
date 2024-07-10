"use client";

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const MeetingSetup = () => {
  const [isMicCamToggeldOn, setIsMicCamToggeldOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used inside StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggeldOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggeldOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />

      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggeldOn}
            onChange={(e) => setIsMicCamToggeldOn(e.target.checked)}
          />
          Join with mic and cam off
        </label>
        <DeviceSettings />
      </div>
    </div>
  );
};

export default MeetingSetup;
