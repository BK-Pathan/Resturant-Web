import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";
import authService from "../../appwrite/auth";
import "./side.css";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/menu", label: "Menu" },
    { to: "/cart", label: "Cart" },
    { to: "/checkout", label: "Checkout" },
    { to: "/orders", label: "Orders" },
    { to: "/profile", label: "Profile" },
  ];

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
      {/* Navigation links */}
      <div>
        <h2 className="sidebar-title">Hungry Hub</h2>
        <nav className="sidebar-nav">
          {links.map((link, i) => (
            <NavLink
              key={i}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={() => setIsSidebarOpen(false)} 
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout button */}
      <div>
        <button onClick={handleLogout} className="sidebar-logout">
          Logout
        </button>
      </div>
    </div>
  );
}
