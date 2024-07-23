"use client";

import { Toaster } from "@/components/ui/toast/toaster";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Pathname({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="fixed z-10">
      {children}
      {!pathname.includes("/privacy-policy") ? (
        // <div className="absolute bottom-10 xxs:bottom-1 left-6">
          <Link href="/privacy-policy" className="text-gray-200 text-base my-5 block">
            Impressum
          </Link>
        // </div>
      ) : null}
      
      <Toaster />
    </div>
  );
}
