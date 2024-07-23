"use client";
import useFetchTeacherData from "./useFetchTeacherData";

const useTeacher = (teacher_id: string) => {
  const { data, loading } = useFetchTeacherData(teacher_id);
  return {
    data,
    loading,
  };
};

export default useTeacher;
