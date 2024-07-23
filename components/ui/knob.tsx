import { useEffect, useRef } from "react";

interface Props {
  first_color: string;
  second_color: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  knobPadding?: string;
  smallKnob?: string;
  pointerSizeBottom?: string;
  pointerSizeLeft?: string;
  pointerWidth?: string;
  pointerHeight?: string;
}

function Knob({
  first_color,
  second_color,
  value,
  onChange,
  className = "w-[75px] h-[75px]",
  disabled = false,
  knobPadding = "p-03",
  smallKnob = "p-1",
  pointerSizeBottom = "before:bottom-2.5",
  pointerSizeLeft = "before:left-2.5",
  pointerWidth = "before:w-[3.5px]",
  pointerHeight = "before:h-[3.5px]",
}: Props) {
  const volumeKnob = useRef<HTMLDivElement | null>(null);
  const sliderValue = value * 10;

  useEffect(() => {
    const knob = volumeKnob.current;

    let volumeSetting = 0;
    let timeOut: NodeJS.Timeout | null = null;

    const detectMobile = () => {
      const result = navigator.userAgent.match(
        /(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i
      );
      return result ? "mobile" : "desktop";
    };

    const getMouseDown = () =>
      detectMobile() === "desktop" ? "mousedown" : "touchstart";
    const getMouseUp = () =>
      detectMobile() === "desktop" ? "mouseup" : "touchend";
    const getMouseMove = () =>
      detectMobile() === "desktop" ? "mousemove" : "touchmove";

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      if (!knob || disabled) return;
      const boundingRectangle = knob.getBoundingClientRect();
      const knobPositionX = boundingRectangle.right;
      const knobPositionY = boundingRectangle.top;
      const knobCenterX = boundingRectangle.width / 2 + knobPositionX;
      const knobCenterY = boundingRectangle.height / 2 + knobPositionY;
      let mouseX, mouseY;

      if (detectMobile() === "desktop") {
        const mouseEvent = event as MouseEvent;
        mouseX = mouseEvent.clientX;
        mouseY = mouseEvent.clientY;
      } else {
        const touchEvent = event as TouchEvent;
        mouseX = touchEvent.touches[0].clientX;
        mouseY = touchEvent.touches[0].clientY;
      }

      const oppositeSide = knobCenterY - mouseY;
      const adjacentSide = knobCenterX - mouseX;

      const currentRadiansAngle = Math.atan2(adjacentSide, oppositeSide);
      const getRadiansInDegrees = (currentRadiansAngle / Math.PI) * 360;
      const finalAngleInDegrees = -(getRadiansInDegrees - 315);

      if (finalAngleInDegrees > 0 && finalAngleInDegrees <= 270) {
        knob.style.transform = `rotate(${finalAngleInDegrees}deg)`;
        volumeSetting = Math.floor(finalAngleInDegrees / (270 / 100));
      }

      onChange(volumeSetting / 10);
      event.preventDefault();
      event.stopPropagation();
    };

    const onMouseDown = (event: MouseEvent | TouchEvent) => {
      if (disabled) return;
      event.preventDefault();
      document.addEventListener(getMouseMove(), onMouseMove, {
        passive: false,
      });
      document.addEventListener("touchmove", preventScroll, { passive: false });
      onMouseMove(event);
    };

    const onMouseUp = () => {
      document.removeEventListener(getMouseMove(), onMouseMove);
      document.removeEventListener("touchmove", preventScroll);
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };

    if (knob) {
      knob.addEventListener(getMouseDown(), onMouseDown);
    }
    document.addEventListener(getMouseUp(), onMouseUp);

    return () => {
      if (knob) {
        knob.removeEventListener(getMouseDown(), onMouseDown);
      }
      document.removeEventListener(getMouseUp(), onMouseUp);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [volumeKnob, disabled]);

  useEffect(() => {
    const knob = volumeKnob?.current;
    if (!knob) {
      return;
    }
    knob.style.transform = `rotate(${sliderValue * (270 / 100)}deg)`;
  }, [value, sliderValue]);

  return (
    <div
      className={`bg-knobBackgroud relative rounded-full ${smallKnob} ${className} ${
        disabled ? "cursor-auto" : "cursor-pointer"
      }`}
      style={{
        backgroundImage: `conic-gradient(
          from 225deg at 50% 50%,
          ${first_color} 0%,
          ${second_color} calc(${sliderValue + 1} * 0.75%),
          #EBF3E8 calc(${sliderValue + 1} * 0.75%),
          #ebf1e5 calc(${sliderValue + 1} * 0.75%)
        )`,
      }}
    >
      <div
        className={`w-full h-full ${knobPadding} rounded-full bg-gradient-to-r shadow-knob-shadow from-gallary via-mercury to-alto`}
      >
        <div className="relative w-full h-full rounded-full bg-knobInsideColor">
          <div
            ref={volumeKnob}
            id={`knob_${Math.random()}`}
            className={`absolute w-full h-full rounded-full rotate-0 z-30 before:absolute ${pointerSizeBottom} ${pointerSizeLeft} ${pointerWidth} ${pointerHeight} before:bg-[#827C79] before:rounded-full`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Knob;
