import React from "react";
import "../components/salechart.css";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Nougat Food", value: 400 },
  { name: "Fudge Food", value: 300 },
  { name: "Jeon Food", value: 300 },
];

const COLORS = ["#E91E63", "#9C27B0", "#FF9800"];

export default function PopularFoodChart() {
  return (
    <div className="bg  shadow rounded-2xl p-6 col-span-12">
      <h2 className="text-xl font-semibold mb-4 popular-text">Popular Food</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
