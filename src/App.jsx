
import Sidebar from "./components/SideBar/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./Layout/AdminLayout"; 

import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Order";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import { useState } from "react";
import Profile from "./pages/Profile";

function App() {
  const [cart, setCart] = useState([]);

   const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin routes */}
<Route
  path="/*"
  element={
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <AdminLayout>
          <Routes>  
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="menu" element={<Menu addToCart={addToCart} />} />
            <Route path="cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="checkout" element={<Checkout cart={cart} />} />
            <Route path="orders" element={<Orders />} />
            <Route path="Profile" element={<Profile />} />
          </Routes>
        </AdminLayout>
       
      </div>
    </div>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
