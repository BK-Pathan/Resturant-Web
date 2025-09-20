import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "../appwrite/conf"; // aapka Appwrite client
import "./menu.css";
import Sidebar from "../components/SideBar/SideBar";


export default function Menu({ addToCart }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const DATABASE_ID = "68bec7a7003979115c13";  
  const COLLECTION_ID = "menu_items";         
  const BUCKET_ID = "68bed2b3003474ab4526";     
  const PROJECT_ID = "68bec67000130adc15bd";    

  // Fetch items from DB
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
         console.log("Fetched items:", response.documents);
        setItems(response.documents);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Menu</h1>
      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.$id} className="menu-card">
            
            {/* Image */}
            <div className="menu-image-wrapper">
              {item.imageid ? (
                <img
                  src={`https://nyc.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${item.imageid}/view?project=${PROJECT_ID}`}
                  alt={item.title}
                  className="menu-image"
                />
              ) : (
                <span className="menu-no-image">No Image</span>
              )}
            </div>

            {/* Food info */}
            <h2 className="menu-item-title">{item.title}</h2>
            <p className="menu-item-price">Rs. {item.price}</p>

            {/* Status */}
            <p
              className={`menu-status ${
                item.isAvailable === true
                  ? "available"
                  : item.isAvailable === false
                  ? "not-available"
                  : "unknown"
              }`}
            >
              {item.isAvailable === true
                ? "Available"
                : item.isAvailable === false
                ? "Not Available"
                : "Unknown"}
            </p>

            {/* Description */}
            {item.description && (
              <p className="menu-description">{item.description}</p>
            )}

            {/* Add to Cart */}
            <button
              onClick={() => handleAddToCart(item)}
              className="menu-add-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}