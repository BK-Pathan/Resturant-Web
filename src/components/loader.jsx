import React from "react";
import "./Loader.css";

// Loader.js
export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="plate">
        <div className="food"></div>
        <div className="steam steam1"></div>
        <div className="steam steam2"></div>
        <div className="steam steam3"></div>
      </div>

      {/* 🍴 Fork & Spoon */}
      <div className="cutlery">
        <div className="fork"></div>
        <div className="spoon"></div>
      </div>

      <h2 className="loader-text">Cooking something delicious...</h2>
    </div>
  );
}
