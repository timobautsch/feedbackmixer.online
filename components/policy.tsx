import Link from "next/link";

type PolicyProps = {
  className?: string;
};

export default function Policy({ className = "" }: PolicyProps) {
  return (
    <div className={`pl-7 h-[50px] flex items-center ${className}`}>
      <Link href="/privacy-policy" className="text-gray-200 text-base">
        Impressum
      </Link>
    </div>
  );
}
