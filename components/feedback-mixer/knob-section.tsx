"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import Knob from "../ui/knob";

interface Props {
  handleOnChange?: (number: number) => void;
  value: number;
  first_color: string;
  second_color: string;
  className?: string;
  disabled?: boolean;
  text_disabled?: boolean;
  textValue: string;
  handleTextChange?: (text: string) => void;
  knobPadding?: string;
  smallKnob?: string;
  pointerSizeBottom?: string;
  pointerSizeLeft?: string;
  pointerWidth?: string;
  pointerHeight?: string;
}

function KnobSection({
  handleOnChange,
  value,
  first_color,
  second_color,
  className,
  disabled,
  textValue,
  handleTextChange,
  text_disabled,
  knobPadding,
  smallKnob,
  pointerSizeBottom,
  pointerSizeLeft,
  pointerWidth,
  pointerHeight,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(!isEditing);
  };

  const handleTextBoxChange = (event: any) => {
    handleTextChange?.(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <>
      <Knob
        first_color={first_color}
        second_color={second_color}
        value={value}
        onChange={(number) => {
          handleOnChange?.(number);
        }}
        className={className}
        disabled={disabled}
        knobPadding={knobPadding}
        smallKnob={smallKnob}
        pointerSizeBottom={pointerSizeBottom}
        pointerSizeLeft={pointerSizeLeft}
        pointerWidth={pointerWidth}
        pointerHeight={pointerHeight}
      />
      {isEditing && !text_disabled ? (
        <Input
          type="text"
          value={textValue}
          disabled={text_disabled}
          onChange={handleTextBoxChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="text-2xs w-16 rounded p-0 focus:outline-none h-4 border-none"
        />
      ) : (
        <p
          className="text-2xs text-lunar-green h-7 w-16 text-center font-semibold overflow-hidden text-ellipsis break-words"
          onDoubleClick={handleDoubleClick}
        >
          {textValue}
        </p>
      )}
    </>
  );
}

export default KnobSection;
