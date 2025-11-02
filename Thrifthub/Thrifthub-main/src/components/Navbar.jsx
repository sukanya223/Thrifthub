import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Thriftique</h1>
      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="cart-btn">🛒 Cart</button>
      </div>
    </nav>
  );
}

export default Navbar;
