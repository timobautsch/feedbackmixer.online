"use client";

function MixerAvg({
  classNames,
  value,
}: {
  classNames: string;
  value: number;
}) {
  return (
    <div className={`flex pr-4`}>
      <span className="flex flex-col text-concord justify-between rotate-180 text-2xl px-2">
        <div>.</div>
        <div>.</div>
        <div>.</div>
      </span>
      <div className="flex flex-col gap-2 items-center">
        <div className="w-9s bg-gray-200 rounded-full h-36 mb-4 dark:bg-gray-700 left-6 rotate-180 border border-border-bg-mixer">
          <div
            className={`h-full rounded-full ${classNames}`}
            style={{ height: `${value}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default MixerAvg;
