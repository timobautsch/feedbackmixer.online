import { useEffect, useState } from "react";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase-config";
import { getSubCollections } from "@/utils/getSubCollections";

const useFetchTeacherData = (teacher_id: string) => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!teacher_id) return;

      const q = query(
        collection(db, "teachers"),
        where(documentId(), "==", teacher_id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const queryData = await Promise.all(
          querySnapshot.docs.map(async (detail) => {
            const subCollections = await getSubCollections(detail.ref, [
              "session_list",
              "student_feedback",
            ]);
            return {
              ...detail.data(),
              id: detail.id,
              ...subCollections,
            };
          })
        );
        setData(queryData);
      }
      setLoading(false);
    };

    fetchData();
  }, [teacher_id]);

  return {
    data,
    loading,
  };
};

export default useFetchTeacherData;
