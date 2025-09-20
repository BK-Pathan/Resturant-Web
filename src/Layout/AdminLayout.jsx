import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/loader";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      // ✅ Loader ke baad sidha dashboard bhejo
      if (location.pathname === "/") {
        navigate("/admin/dashboard");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  if (loading) {
    return <Loader />; // show animation first
  }

  const isDashboard = location.pathname === "/admin/dashboard";

  const getLinkClass = (path) =>
    `nav-link ${location.pathname === path ? "active" : ""}`;

  return (
    <div className="admin-layout">
      <div className="admin-main">
        {isDashboard ? (
          <div className="dashboard-page">{children}</div>
        ) : (
          <div className="other-page">
            <div>
              <Link to="/admin/dashboard" className="logo-link">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJnfeKJLNfq9-8bOLPdsoY6k7-U2t3uSdFQ&s"
                  alt="Logo"
                  className="logo-img"
                />
              </Link>
            </div>

            {/* Top Navbar */}
            <div className="top-navbar">
              <div className="top-links">
                <Link to="/admin/dashboard" className={getLinkClass("/admin/dashboard")}>
                  Dashboard
                </Link>
                <Link to="/menu" className={getLinkClass("/menu")}>
                  Menu
                </Link>
                <Link to="/cart" className={getLinkClass("/cart")}>
                  Cart
                </Link>
                <Link to="/orders" className={getLinkClass("/orders")}>
                  Orders
                </Link>
                <Link to="/checkout" className={getLinkClass("/checkout")}>
                  Checkout
                </Link>
                <Link to="/profile" className={getLinkClass("/profile")}>
                  Profile
                </Link>
              </div>
            </div>

            {children}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
