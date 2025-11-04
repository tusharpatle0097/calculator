import React from "react";

const Range = ({ onChange, value, min, max, step }) => {
//   console.log(max);
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        type="range"
        min={min}
        max={max}
        step={step}
        className="w-full accent-slate-900 cursor-pointer"
      />
    </>
  );
};

export default Range;
