import React from "react";

const Input = ({ value, onChange, type, maxlength, placeholder, disabled }) => {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        inputMode="decimal"
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-300 bg-white py-3 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
      />
    </>
  );
};

export default Input;
