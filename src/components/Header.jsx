import React from "react";

export default function Header() {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-6">
      <h1 className="text-xl font-semibold">Welcome, Admin</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Logout
      </button>
    </div>
  );
}
