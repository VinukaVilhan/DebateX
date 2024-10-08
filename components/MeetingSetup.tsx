"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash, Edit2 } from "lucide-react";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/layout";

interface MeetingSetupProps {
  setIsSetupComplete: (value: boolean) => void;
  userId: string;
  meetingId: string;
  meetingState: string;
  userName: string;
}

const MeetingSetup: React.FC<MeetingSetupProps> = ({
  setIsSetupComplete,
  userId,
  meetingId,
  meetingState,
  userName,
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teams, setTeams] = useState<string[]>([]);
  const [teamInput, setTeamInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const call = useCall();
  const firestore = getFirestore();

  if (!call) {
    throw new Error("useCall must be used inside StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  useEffect(() => {
    if (
      meetingState === "isHostMeeting" ||
      meetingState === "isScheduleMeeting"
    ) {
      setIsDialogOpen(true);
    }
  }, [meetingState]);

  const addOrUpdateTeam = () => {
    if (teamInput.trim() === "") return;

    if (editIndex !== null) {
      setTeams((prevTeams) => {
        const updatedTeams = [...prevTeams];
        updatedTeams[editIndex] = teamInput;
        setEditIndex(null);
        return updatedTeams;
      });
    } else {
      setTeams((prevTeams) => [...prevTeams, teamInput]);
    }

    setTeamInput("");
  };

  const editTeam = (index: number) => {
    setTeamInput(teams[index]);
    setEditIndex(index);
  };

  const deleteTeam = (index: number) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const saveToFirestore = async () => {
    try {
      // Create a reference to the document with the meetingId as the document ID
      const meetingDocRef = doc(collection(db, "meetings"), meetingId);

      // Use setDoc to create or overwrite the document with the specified ID
      const meetingDocSnap = await getDoc(meetingDocRef);
      if (meetingDocSnap.exists()) {
        console.log("Document exists:", meetingDocSnap.data());
        // Perform any actions if the document exists
        const meetingData = meetingDocSnap.data();

        const participants = meetingData.participants || [];
        const updatedParticipants = [...participants, { userId, userName }];
        await updateDoc(meetingDocRef, { participants: updatedParticipants });
        console.log("Document updated with new participant");
      } else {
        console.log("Document does not exist. Creating a new document.");
        await setDoc(meetingDocRef, {
          meetingId,
          hostId: userId,
          hostName: userName,
          teams,
        });
      }

      setIsSetupComplete(true);
      setIsDialogOpen(false); // Close the dialog after saving the teams
      call.join();
    } catch (error) {
      console.error("Error adding document to Firestore: ", error);
    }
  };

  const handleLetsGoClick = () => {
    if (
      (meetingState === "isHostMeeting" || meetingState === "isScheduleMeeting") &&
      teams.length > 0
    ) {
      saveToFirestore(); // Save the teams and close the dialog
    } else if (meetingState !== "isHostMeeting" && meetingState !== "isScheduleMeeting") {
      // Proceed to the meeting directly if not a host
      saveToFirestore(); // Save the teams and close the dialog

      setIsSetupComplete(true);
      call.join();
    }
  };

  return (
    <>
      {(meetingState === "isHostMeeting" ||
        meetingState === "isScheduleMeeting") && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl p-10 bg-background_of_dashboard-1 overflow-y-auto rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl">
                What are the teams?
              </DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={teamInput}
                    onChange={(e) => setTeamInput(e.target.value)}
                    placeholder="Enter team name"
                  />
                  <Button
                    className="p-2 bg-blue-500 rounded-full"
                    onClick={addOrUpdateTeam}
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </Button>
                </div>
                <ul className="mt-4 space-y-2">
                  {teams.map((team, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-white"
                    >
                      <span>{team}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          className="p-2 bg-yellow-500 rounded-full"
                          onClick={() => editTeam(index)}
                        >
                          <Edit2 className="w-4 h-4 text-white" />
                        </Button>
                        <Button
                          className="p-2 bg-red-500 rounded-full"
                          onClick={() => deleteTeam(index)}
                        >
                          <Trash className="w-4 h-4 text-white" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button
                  className="bg-blue-500 mt-4"
                  onClick={handleLetsGoClick}
                >
                  Ok, I added the teams, let&apos;s go
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
        <h1 className="text-2xl font-bold">Setup</h1>
        <VideoPreview />

        <div className="flex h-16 items-center justify-center gap-3">
          <label className="flex items-center justify-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isMicCamToggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            />
            Join with mic and cam off
          </label>
          <DeviceSettings />
        </div>

        <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={handleLetsGoClick}
        >
          Join Meeting
        </Button>
      </div>
    </>
  );
};

export default MeetingSetup;
