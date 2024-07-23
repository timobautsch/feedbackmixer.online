"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { db } from "@/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useToast } from "@/components/ui/toast/use-toast";

const validationSchema = z.object({
  sessionName: z.string().trim().min(1, "Please Enter Teacher's Name"),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const useNewSessions = (teacher_id: string) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
    formState,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      sessionName: "",
    },
    mode: "all",
  });
  const { toast } = useToast();

  const onSubmit = async (data: ValidationSchema) => {
    setLoading(true);
    try {
      const newSessionRef = await addDoc(
        collection(db, `teachers/${teacher_id}/session_list`),
        {
          name: data.sessionName,
          created_at: new Date(),
        }
      );
      if (newSessionRef?.id) {
        toast({
          variant: "default",
          title: "New Session Added",
        });
        router.push(`/${teacher_id}/new-session/${newSessionRef?.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Error in adding session",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error adding session",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    control,
    formState,
    onSubmit,
    errors,
    loading,
  };
};

export default useNewSessions;
