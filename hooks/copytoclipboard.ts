"use client";

import { useToast } from "@/components/ui/toast/use-toast";
import React from "react";

export function useCopyToClipboard(): [string | null, (value: string) => void] {
  const [state, setState] = React.useState<string | null>(null);
  const { toast } = useToast();
  const copyToClipboard = React.useCallback((value: string) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          toast({
            variant: "default",
            title: "Link copied to clipboard",
          });
          setState(value);
        } else {
          toast({
            variant: "destructive",
            title: "writeText not supported",
          });
        }
      } catch (e) {
        setState(value);
      }
    };

    handleCopy();
  }, []);

  return [state, copyToClipboard];
}
