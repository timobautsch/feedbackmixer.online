"use client";

import useFetchTeacherData from "./useFetchTeacherData";

const useConfigureSessions = (teacher_id: string) => {
  const { data, loading } = useFetchTeacherData(teacher_id);
  return {
    data,
    loading,
    sessionData: data[0]?.session_list,
  };
};

export default useConfigureSessions;
