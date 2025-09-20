import React from "react";

export default function SearchBar({ placeholder, onChange }) {
  return (
    <div className="w-full flex justify-between items-center mb-6 pt-5 ml-5">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
