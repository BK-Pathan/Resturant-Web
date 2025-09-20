import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function StatsCard({ icon, title, value, chartData }) {
  return (
    <div className="bg  rounded-xl shadow-md flex flex-col justify-between text-white ">
      {/* Top Section */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <h3 className="text-gray-600 text-sm">{title}</h3>
            <p className="text-xl font-bold">{value}</p>
          </div>
        </div>
      </div>

      {/* Mini Graph Section */}
      {chartData && (
        <div className="h-16 ">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
