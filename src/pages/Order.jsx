import React, { useState, useEffect } from "react";
import { databases } from "../appwrite/conf"; 
import { Query } from "appwrite";
import Configure from "../Conf/configure";
import authService from "../appwrite/auth"; 
import "./order.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = await authService.getUser();
        if (!user) {
          console.error("No logged-in user");
          setLoading(false);
          return;
        }

        const userEmail = user.email;
        console.log("🔑 Logged-in User Email:", userEmail);

        const res = await databases.listDocuments(
          Configure.appwriteDATABASEID,
          Configure.appwriteORDER,
          [
            Query.equal("email", [userEmail]),
            Query.orderDesc("$createdAt"),
          ]
        );

        console.log("📦 Orders Found:", res.documents);
        setOrders(res.documents);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;

  // ✅ Agar orders empty hain
  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>
        <div className="no-orders">
          <p>You have no orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.$id} className="order-card">
            <p><strong>Items:</strong> {order.Items?.join(", ")}</p>
            <p><strong>Subtotal:</strong> Rs {order.subtotal}</p>
            <p><strong>Delivery Fee:</strong> Rs {order.DeliveryFee}</p>
            <p><strong>Total:</strong> Rs {order.Total}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Food Status:</strong> {order.Foodstatus}</p>
            <p><strong>Payment Status:</strong> {order.PaymentStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
