"use client";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase-config";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast/use-toast";

const useIndividualSession = (teacher_id: string, session_id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({});
  const { toast } = useToast();

  // Get indiviudal session data from session_list which is part of teacher's data
  const getSessionData = async (teacher_id: string, session_id: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, `teachers/${teacher_id}/session_list`),
        where(documentId(), "==", session_id)
      );
      const sessionData = await getDocs(q);
      if (!sessionData.empty) {
        sessionData.forEach((doc) => {
          setData(doc.data());
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error getting session",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teacher_id && session_id) {
      getSessionData(teacher_id, session_id);
    }
  }, [teacher_id, session_id]);

  return {
    data,
    loading,
    getSessionData,
  };
};

export default useIndividualSession;
