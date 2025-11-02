import React from "react";
import "./Categories.css";

function Categories() {
  return (
    <div className="categories">
      <button className="category-btn">🧥 Men's Wear</button>
      <button className="category-btn">👗 Women's Wear</button>
      <button className="category-btn">👜 Accessories</button>
      <button className="category-btn">💎 Luxury Thrift</button>
    </div>
  );
}

export default Categories;
