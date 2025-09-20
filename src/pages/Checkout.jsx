import React, { useState, useEffect } from "react";
import { databases } from "../appwrite/conf";
import { ID } from "appwrite";
import Configure from "../Conf/configure";
import authService from "../appwrite/auth"; // ✅ import auth service
import "./checkout.css";

export default function Checkout({ cart = [] }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  // ✅ Prefill with logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getUser();
        if (user) {
          setForm((prev) => ({
            ...prev,
            email: user.email,   // 👈 auto-fill logged in user email
            name: user.name || prev.name,
          }));
        }
      } catch (err) {
        console.error("❌ Error fetching logged-in user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await databases.createDocument(
        Configure.appwriteDATABASEID,
        Configure.appwriteORDER,
        ID.unique(),
        {
          name: form.name,
          email: form.email,      // 👈 ab hamesha login user email save hogi
          address: form.address,
          phone: form.phone,
          Items: cart.map((item) => `${item.title} - Rs.${item.price}`),
          subtotal: subtotal,
          DeliveryFee: deliveryFee,
          Total: total,
          Foodstatus: "Pending",
          PaymentStatus: "Unpaid",
        }
      );

      setSuccess("✅ Order placed successfully!");
      setForm({ name: "", email: form.email, address: "", phone: "" }); // email reset na karo
    } catch (err) {
      console.error("Appwrite error:", err);
      setSuccess("❌ Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        {success && <div className="checkout-alert">{success}</div>}

        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            type="text"
            placeholder="Name"
            className="checkout-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="checkout-input"
            value={form.email}
            readOnly   // 👈 user manually change na kare
          />
          <input
            type="text"
            placeholder="Address"
            className="checkout-input"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="checkout-input"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <div className="checkout-summary">
            <span>Subtotal:</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="checkout-summary">
            <span>Delivery Fee:</span>
            <span>Rs. {deliveryFee}</span>
          </div>
          <div className="checkout-summary">
            <span>Total:</span>
            <span>Rs. {total}</span>
          </div>

          <button type="submit" disabled={loading} className="checkout-btn">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
