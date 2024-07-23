import { useState } from "react";
import Dizzy from "../ui/icon/dizzy";
import Neutral from "../ui/icon/neutral";
import Smile from "../ui/icon/smile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover/pop-over";

interface InfoProps {
  children: React.ReactNode;
  handleClick: (type: number) => void;
  disabled?: boolean;
}

export default function Info({
  children,
  handleClick,
  disabled = false,
}: InfoProps) {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (type: number) => {
    console.log("🚀 ~ handleEmojiClick ~ type:", type)
    handleClick(type);
    setOpen(false);
  };

  const handleOpenChange = (openState: boolean) => {
    if (!disabled) {
      setOpen(openState);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger onClick={disabled ? undefined : () => setOpen(!open)}>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <div className="container">
          <div className="flex gap-8 bg-white px-2">
            <span
              onClick={() => {
                handleEmojiClick(1);
              }}
            >
              <Neutral />
            </span>
            <span
              onClick={() => {
                handleEmojiClick(2);
              }}
            >
              <Dizzy />
            </span>
            <span
              onClick={() => {
                handleEmojiClick(3);
              }}
            >
              <Smile />
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
