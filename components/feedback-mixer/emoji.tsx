import React from "react";
import Info from "../info/info";
import Neutral from "../ui/icon/neutral";
import Dizzy from "../ui/icon/dizzy";
import Smile from "../ui/icon/smile";

function getIcon(key: number, disabled: boolean) {
  switch (key) {
    case 1:
      return (
        <Neutral className={disabled ? "cursor-auto" : "cursor-pointer"} />
      );
    case 2:
      return <Dizzy className={disabled ? "cursor-auto" : "cursor-pointer"} />;
    case 3:
    default:
      return <Smile className={disabled ? "cursor-auto" : "cursor-pointer"} />;
  }
}

function getLabel(key: number) {
  switch (key) {
    case 1:
      return "davor";
    case 2:
      return "dabei";
    case 3:
      return "danach";
    default:
      return "davor";
  }
}

interface Props {
  value: number;
  onChange: (type: number) => void;
  disabled?: boolean;
  icon_label: string;
}

function Emoji({ value, onChange, disabled = false, icon_label }: Props) {
  const icon = getIcon(value, disabled);
  return (
    <>
      <Info handleClick={onChange} disabled={disabled}>
        {icon}
      </Info>
      <p className="text-2xs text-tuatara font-semibold pb-5">
        {/* {getLabel(value)} */}
        {icon_label}
      </p>
    </>
  );
}

export default Emoji;
