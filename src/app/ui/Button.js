import React from "react";

const Button = ({ onClick, children, isSelected }) => {
  return (
    <div>
      <button
        className={`rounded-full cursor-pointer px-4 py-2 text-sm transition border
        ${
          isSelected
            ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
            : "text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
