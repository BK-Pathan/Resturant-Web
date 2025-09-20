import React from "react";
import { Link } from "react-router-dom";
import "./cart.css";

export default function Cart({ cart = [], removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <div className="cart-list">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div>
                <span className="cart-item-title">{item.name}</span> -{" "}
                <span className="cart-item-price">Rs. {item.price}</span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeFromCart(index)}
                className="cart-delete-btn"
              >
                Delete
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="cart-total">
            <span>Total: Rs. {total}</span>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="cart-footer">
        <div className="cart-actions">
          <Link to="/menu" className="cart-btn cart-back-btn">
            Back to Menu
          </Link>

          {cart.length > 0 && (
            <Link to="/checkout" className="cart-btn cart-checkout-btn">
              Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}