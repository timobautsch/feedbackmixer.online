"use client";

import FeedbackMixer from "@/components/feedback-mixer";
import Policy from "@/components/policy";
import Loader from "@/components/ui/loader";
import useIndividualSession from "@/hooks/useIndividualSession";
import useNewFeedback from "@/hooks/useNewFeedback";
import { SesionsDetails } from "@/lib/interfaces";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Dashboard({
  params,
}: {
  params: { teacher_id: string; session_id: string };
}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const { data, loading } = useIndividualSession(
    params.teacher_id,
    params.session_id
  );
  const { submitFeedback } = useNewFeedback();

  const handleSubmission = (data: Record<string, string>) => {
    submitFeedback(params.teacher_id, params.session_id, {
      student_name: name || "",
      ...data,
    });
  };

  return (
    <div className="sm:bg-MacBookPro xs:bg-feedback-student-res bg-fixed bg-cover">
      <div className="py-8 px-2 grid xs:h-full lg:h-[calc(100dvh)]">
        <FeedbackMixer
          hideButton={false}
          handleSubmit={handleSubmission}
          labelData={data as SesionsDetails}
          studentName={name || ""}
          text_disabled={true}
        />
      </div>
      <Loader loading={loading} />
      <Policy />
    </div>
  );
}

export default Dashboard;
