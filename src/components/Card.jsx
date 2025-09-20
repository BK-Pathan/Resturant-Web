import React from "react";

export default function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
      {/* Icon (optional) */}
      {icon && <div className="text-3xl text-gray-600">{icon}</div>}

      <div>
        <h2 className="text-lg font-medium text-gray-500">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
