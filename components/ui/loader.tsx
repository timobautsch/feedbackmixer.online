import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({
  className,
  loading,
}: {
  className?: string;
  loading?: boolean;
}) => {
  if (!loading) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-800 bg-opacity-50">
      <div className="flex justify-center items-center">
        <Loader2
          className={cn("h-16 w-16 text-primary/60 animate-spin", className)}
        />
      </div>
    </div>
  );
};

export default Loader;
