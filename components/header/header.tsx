"use client"

import Link from "next/link";
import { useParams } from "next/navigation";

function Header({
  mainsession,
  newsession,
}: {
  mainsession: string;
  newsession: string;
}) {
  const { teacher_id } = useParams();
  return (
    <header className="flex justify-center fixed top-5 left-0 w-full bg-transparent z-10">
      <ul className="flex gap-6 p-4 font-medium">
        <li className={`px-2 text-xl cursor-pointer ${mainsession}`}>
          <Link href={`/${teacher_id}/main-sessions`}>Meine Sessions</Link>
        </li>
        <li className={`px-2 text-xl cursor-pointer ${newsession}`}>
          <Link href={`/${teacher_id}/new-session`}>Neue Session</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
