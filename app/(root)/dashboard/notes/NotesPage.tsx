import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig"; // Import Firestore instance
import { doc, getDoc } from "firebase/firestore";
import { useCall } from "@stream-io/video-react-sdk";

const NotesPage = () => {
  const [notes, setNotes] = useState("");
  const call = useCall();

  useEffect(() => {
    const fetchNotes = async () => {
      if (call?.id) {
        const notesDoc = doc(db, "meetings", call.id, "notes", "userNote");
        const noteSnapshot = await getDoc(notesDoc);
        if (noteSnapshot.exists()) {
          setNotes(noteSnapshot.data().text);
        }
      }
    };
    fetchNotes();
  }, [call]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Meeting Notes</h1>
      <p>{notes || "No notes taken for this session."}</p>
    </div>
  );
};

export default NotesPage;
