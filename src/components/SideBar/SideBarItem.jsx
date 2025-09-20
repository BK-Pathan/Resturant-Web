import React from "react";
import { NavLink } from "react-router-dom";
import "./side.css";

export default function SidebarItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "sidebar-item active" : "sidebar-item"
      }
    >
      {label}
    </NavLink>
  );
}
