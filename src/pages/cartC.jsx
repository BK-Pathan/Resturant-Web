import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b">
              <span>{item.name}</span>
              <span>Rs. {item.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4 text-lg">
            <span>Total:</span>
            <span>Rs. {total}</span>
          </div>
        </div>
      )}
      <div className="text-center mt-6">
        <Link
          to="/"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition"
        >
          Back to Menu
        </Link>
      </div>
    </div>
  );
}
