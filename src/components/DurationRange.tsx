import React from "react";

interface Props {
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}
export const DurationRange = ({ duration, setDuration }: Props) => {
  const onDurationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) >= 0) {
      setDuration(parseInt(e.target.value));
    }
  };
  return (
    <div className="my-2 pt-1 space-y-6">
      <h1 className="text-[16px]">기간</h1>
      <div className={`w-full  px-2 text-[12px] rounded-lg`}>
        <p
          className={`inline-block px-2 py-1 rounded-lg translate-x-[-50%] bg-brandBlue text-white relative after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-4 after:border-x-transparent after:border-b-transparent after:border-t-gray-700`}
          style={{ left: `${duration * 5}%` }}
        >
          {duration}주
        </p>
      </div>
      <input
        type="range"
        min="0"
        max="20"
        step="1"
        value={duration}
        name="duration"
        onChange={onDurationHandler}
        className="w-full h-[3px] range-sm bg-brandBlue accent-brandBlue"
      />
    </div>
  );
};
