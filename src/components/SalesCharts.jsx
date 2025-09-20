import React from "react";
import "./salechart.css";
import "../pages/admin/dashboard.css";
import { BarChart, Bar, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 400, target: 600 },
  { name: "Feb", sales: 600, target: 700 },
  { name: "Mar", sales: 750, target: 800 },
  { name: "Apr", sales: 500, target: 700 },
  { name: "May", sales: 450, target: 600 },
  { name: "Jun", sales: 650, target: 750 },
  { name: "Jul", sales: 470, target: 680 },
  { name: "Aug", sales: 520, target: 700 },
  { name: "Sep", sales: 400, target: 650 },
  { name: "Oct", sales: 600, target: 700 },
  { name: "Nov", sales: 500, target: 680 },
  { name: "Dec", sales: 700, target: 800 },
];

export default function SalesChart() {
  return (
    <div className="bg shadow rounded-2xl p-6 col-span-12">
      <h2 className="text-xl font-semibold mb-4 sales-text ">Sales Figures</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#FF9B00" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="target" stroke="#332f72ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
