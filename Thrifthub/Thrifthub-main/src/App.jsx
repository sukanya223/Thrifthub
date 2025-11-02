import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductGrid from "./components/ProductGrid";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Categories />
      <ProductGrid />
    </div>
  );
}

export default App;
