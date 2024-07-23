"use client";
import { db } from "@/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SessionItem } from "@/types/common";
import { useToast } from "@/components/ui/toast/use-toast";

const useUpdateSessions = () => {
  const { toast } = useToast();
  const getSessionDocPath = (id: string, teacher_id: string) =>
    `teachers/${teacher_id}/session_list/${id}`;

  const updateSession = async (
    id: string,
    teacher_id: string,
    data: Partial<SessionItem>
  ) => {
    const docRef = doc(db, getSessionDocPath(id, teacher_id));
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { ...data });
      } else {
        toast({
          variant: "default",
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
    updateSession,
  };
};

export default useUpdateSessions;
