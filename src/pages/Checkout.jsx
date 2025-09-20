import React, { useState , useEffect} from "react";
import { databases } from "../appwrite/conf";
import { ID, Query } from "appwrite";
import Configure from "../Conf/configure";   // ✅ yeh add karo
import "./checkout.css";


export default function Checkout({ cart = [] }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = 100; // static for now
  const total = subtotal + deliveryFee;

  // ✅ Fetch last order and prefill form
  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        // (yahan login user ka email ya manually dala hua email use kar sakte ho)
        const res = await databases.listDocuments(
          Configure.appwriteDATABASEID,
          Configure.appwriteORDER,
          [
            Query.equal("email", ["hy@gmail.com"]), //  replace with logged-in user email
            Query.orderDesc("$createdAt"),
            Query.limit(1),
          ]
        );

        if (res.documents.length > 0) {
          const last = res.documents[0];
          setForm({
            name: last.name || "",
            email: last.email || "",
            address: last.address || "",
            phone: last.phone?.toString() || "",
          });
        }
      } catch (err) {
        console.error("Error fetching last order:", err);
      }
    };

    fetchLastOrder();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await databases.createDocument(
        Configure.appwriteDATABASEID,   // ✅ Database ID
        Configure.appwriteORDER,        // ✅ Orders collection ID
        ID.unique(),
        {
          name: form.name,
          email: form.email,
          address: form.address,
          phone: form.phone,
          userId: "guest",             // later replace with logged in user
    Items: cart.map((item) => `${item.title} - Rs.${item.price}`),
          subtotal: subtotal,          // required
          DeliveryFee: deliveryFee,
          Total: total,                // capital T
          Foodstatus: "Pending",
          PaymentStatus: "Unpaid",
         
        }
      );

      setSuccess("✅ Order placed successfully!");
      setForm({ name: "", email: "", address: "", phone: "" });
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
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
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