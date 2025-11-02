import React from "react";
import "./ProductGrid.css";
import img1 from "../assets/img1.jpg";  // Make sure these images exist
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const products = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 }
];

function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.img} alt="Product" />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
