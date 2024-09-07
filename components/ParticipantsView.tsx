import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/layout";

interface Participant {
  userId: string;
  userName: string;
  team?: string;
}

interface MeetingData {
  participants?: Record<string, Participant>;
  hostName?: string;
  teams?: string[];
}

const ParticipantsView: React.FC<{ meetingId: string }> = ({ meetingId }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [host, setHost] = useState<string | null>(null);
  const [teams, setTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const meetingDocRef = doc(db, "meetings", meetingId);

    const unsubscribe = onSnapshot(meetingDocRef, (meetingDocSnap) => {
      if (meetingDocSnap.exists()) {
        const meetingData = meetingDocSnap.data() as MeetingData;
        const participantsArray = Object.values(meetingData.participants || {});
        setParticipants(participantsArray);
        setHost(meetingData.hostName || null);
        setTeams(meetingData.teams || []);
      } else {
        console.error("Meeting document not found");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching participants:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [meetingId]);

  const handleTeamChange = async (userId: string, newTeam: string) => {
    try {
      const meetingDocRef = doc(db, "meetings", meetingId);
      await updateDoc(meetingDocRef, {
        [`participants.${userId}.team`]: newTeam,
      });
      // Update state locally
      setParticipants((prevParticipants) =>
        prevParticipants.map((participant) =>
          participant.userId === userId
            ? { ...participant, team: newTeam }
            : participant
        )
      );
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  const handleToggleTeam = (userId: string) => {
    setParticipants((prevParticipants) => {
      const participant = prevParticipants.find(p => p.userId === userId);
      if (participant && teams.length > 1) {
        const currentTeamIndex = teams.indexOf(participant.team || "");
        const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
        const newTeam = teams[nextTeamIndex];
        handleTeamChange(userId, newTeam);
      }
      return prevParticipants; // Ensure array return
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="participants-view ">
      <h2 className="text-xl font-bold mb-4">Host</h2>
      {host && (
        <div className="participant-card">
          <p className="font-bold">{host}</p>
        </div>
      )}
      <h2 className="text-xl font-bold mt-6 mb-4">Participants</h2>
      {participants.length > 0 ? (
        participants.map((participant) => (
          <div key={participant.userId} className="participant-card flex items-center mb-2">
            <p className="font-bold mr-4">{participant.userName}</p>
            {host && (
              <>
                <select
                  value={participant.team || ""}
                  onChange={(e) => handleTeamChange(participant.userId, e.target.value)}
                  className="border p-1 text-black mr-4"
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
         
              </>
            )}
          </div>
        ))
      ) : (
        <p>No participants found</p>
      )}
    </div>
  );
};

export default ParticipantsView;
