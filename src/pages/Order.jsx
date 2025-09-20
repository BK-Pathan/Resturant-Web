import React, { useState, useEffect } from "react";
import { databases } from "../appwrite/conf"; // tumhara configured client
import { Query } from "appwrite";
import Configure from "../Conf/configure";
import "./order.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const userEmail = "hy@gmail.com"; // yahan logged-in user ka email use karna

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await databases.listDocuments(
          Configure.appwriteDATABASEID,
          Configure.appwriteORDER,
          [
            Query.equal("email", [userEmail]),
            Query.orderDesc("$createdAt"),
          ]
        );
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
  if (orders.length === 0) return <p className="p-6">You have no orders yet.</p>;

  return (
  
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.$id} className="order-card">
            <p><strong>Items:</strong> {order.Items.join(", ")}</p>
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