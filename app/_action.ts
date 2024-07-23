"use server";

import { ErrorProps, State } from "@/lib/interfaces";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { formSchema } from "./validation";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export async function loginAction(
  prevState: State,
  data: FormData
): Promise<State> {
  let redirectPath: string | null = null;
  try {
    const input = Object.fromEntries(data);
    const response = formSchema.safeParse(input);

    if (!response.success) {
      throw new Error(response?.error?.errors[0]?.message);
    }
    const { teacher_code, teacher_name } = response.data || {};

    const q = query(
      collection(db, "teachers"),
      where("teacher_code", "==", teacher_code)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const { docs } = querySnapshot || {};
      const [doc] = docs || [];
      const { id } = doc || {};
      redirectPath = `/${id}`;
      return {
        status: "success",
        message: "Login successfully",
      };
    }

    const newTeacherRes = await addDoc(collection(db, "teachers"), {
      teacher_code,
      teacher_name,
    });
    if (!newTeacherRes) {
      return {
        status: "error",
        message: "error while creating teacher",
      };
    }
    const { id } = newTeacherRes || {};

    // const teacherSessionListRes = await addDoc(
    //   collection(db, `teachers/${id}/session_list`),
    //   {}
    // );
    //
    // if (!teacherSessionListRes) {
    //   return {
    //     status: "error",
    //     message: "Somthing went wrong",
    //   };
    // }
    //
    // const addStudentFeedback = await addDoc(
    //   collection(
    //     db,
    //     `teachers/${id}/session_list/${teacherSessionListRes?.id}/student_feedback`
    //   ),
    //   {}
    // );
    // if (!addStudentFeedback) {
    //   return {
    //     status: "error",
    //     message: "Somthing went wrong",
    //   };
    // }
    redirectPath = `/${id}`;
    return {
      status: "success",
      message: "Teacher created successfully",
    };
  } catch (error) {
    const { message = "Something went wrong" }: ErrorProps = error || {};
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data.",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: `Server validation: ${issue.message}`,
        })),
      };
    }
    return {
      status: "error",
      message,
    };
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}
