import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        id="search"
        type="text"
        placeholder="Search e.g. mortgage, BMI, percentage…"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 shadow-sm outline-none ring-blue-200 focus:ring-4"
      />
    </div>
  );
};

export default SearchInput;
