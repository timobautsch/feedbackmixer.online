"use client";
import { useRouter } from "next/navigation";
import { db } from "@/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useToast } from "@/components/ui/toast/use-toast";
import { ErrorProps } from "@/lib/interfaces";

const useNewFeedback = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const submitFeedback = async (
    teacher_id: string,
    session_id: string,
    data: Record<string, string>
  ) => {
    setLoading(true);
    try {
      const newFeedback = await addDoc(
        collection(
          db,
          `teachers/${teacher_id}/session_list/${session_id}/student_feedback`
        ),
        {
          ...data,
        }
      );
      if (newFeedback?.id) {
        toast({
          variant: "default",
          title: "New Feedback Added",
        });
        router.push(`/${teacher_id}/feedback/${session_id}/success`);
      } else {
        toast({
          variant: "destructive",
          title: "Error in adding session",
        });
      }
    } catch (error) {
      const { message }: ErrorProps = error || {};
      toast({
        variant: "destructive",
        title: "Error in adding session",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    submitFeedback,
    loading,
  };
};

export default useNewFeedback;
