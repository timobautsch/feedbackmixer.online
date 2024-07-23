"use client";
import { useToast } from "@/components/ui/toast/use-toast";
import { db } from "@/firebase-config";
import { SessionItem } from "@/types/common";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useSessions = (sessionList?: SessionItem[], teacher_id?: string) => {
  const { toast } = useToast();
  const [sessionData, setSessionData] = useState<SessionItem[]>([]);
  const [editSessionId, setEditSessionId] = useState<string | null>(null);
  const [editedSession, setEditedSession] = useState<Partial<SessionItem>>({
    name: "",
  });

  useEffect(() => {
    if (sessionList) {
      setSessionData(sessionList);
    }
  }, [sessionList]);

  const getSessionDocPath = (id: string) =>
    `teachers/${teacher_id}/session_list/${id}`;

  const getFeedbackCollectionPath = (session_id: string) =>
    `teachers/${teacher_id}/session_list/${session_id}/student_feedback`;

  const handleRemoveSession = async (id: string) => {
    const sessionDocRef = doc(db, getSessionDocPath(id));
    const feedbackCollectionRef = collection(db, getFeedbackCollectionPath(id));

    try {
      const feedbackSnapshot = await getDocs(feedbackCollectionRef);
      const deleteFeedbackPromises = feedbackSnapshot.docs.map((feedbackDoc) =>
        deleteDoc(feedbackDoc.ref)
      );
      await Promise.all(deleteFeedbackPromises);
      await deleteDoc(sessionDocRef);
      setSessionData(sessionData.filter((session) => session.id !== id));
      toast({
        variant: "default",
        title: "Session and feedback removed successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error removing session and feedback",
      });
    }
  };

  const handleEditClick = (sessionItem: SessionItem) => {
    setEditSessionId(sessionItem.id);
    setEditedSession({ name: sessionItem.name });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSession((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async (id: string) => {
    const docRef = doc(db, getSessionDocPath(id));
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { ...editedSession });
        setSessionData((prev) =>
          prev.map((session) =>
            session.id === id ? { ...session, ...editedSession } : session
          )
        );
        setEditSessionId(null);
      } else {
        toast({
          variant: "destructive",
          title: "No such document!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating session",
      });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter") {
      handleSaveClick(id);
    }
  };

  const updateSession = async (id: string, data: Partial<SessionItem>) => {
    const docRef = doc(db, getSessionDocPath(id));
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { ...data });
      } else {
        toast({
          variant: "destructive",
          title: "No such document!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating session",
      });
    }
  };

  return {
    sessionData,
    editSessionId,
    editedSession,
    handleRemoveSession,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleKeyDown,
    updateSession,
  };
};

export default useSessions;
