import React from "react";

const SubmitButton = ({ onClick, children }) => {

  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 active:scale-[0.98]"
      >
        {children}
      </button>
    </>
  );
};

export default SubmitButton;
