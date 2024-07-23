"use client";

import Policy from "@/components/policy";
import Link from "next/link";

export default function HomePage({
  params,
}: {
  params: { teacher_id: string };
}) {
  const { teacher_id } = params || {};
  return (
    <div className="bg-teacher-page-1 bg-cover max-h-screen">
    <div className="grid place-content-center min-h-[calc(100dvh-50px)] space-y-8 px-6">
      <h1 className="text-feedback-size font-semibold flex flex-col text-cararra">
        Feedback <br />
        Mixer
      </h1>
      <div className="space-y-2 flex flex-col">
        <Link
          className="rounded-full h-14 w-[347px] flex justify-center items-center text-center bg-yellowButton text-lg text-popover hover:bg-yellowButtonHover"
          href={`/${teacher_id}/main-sessions`}
        >
          Meine Sessions
        </Link>
        <Link
          href={`/${teacher_id}/new-session`}
          className="rounded-full h-14 w-[347px] flex justify-center items-center text-center bg-greenButton text-lg text-popover hover:bg-greenButtonHover"
        >
          Neue Session
        </Link>
      </div>
    
    </div>
    <Policy />
    </div>
  );
}
