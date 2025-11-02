const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust the path to your Product model

mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return Product.find({ category: "Accessories" });
  })
  .then(products => {
    console.log('Accessories Products:', products);
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error:', error);
  });

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupSearch();
});

const products = [
  { id: 1, name: "Black T-Shirt", category: "men", image: "/images/shirt.jpg" },
  { id: 2, name: "Denim Jacket", category: "men", image: "/images/jacket.jpg" },
  { id: 3, name: "Sunglasses", category: "accessories", image: "/images/sunglasses.jpg" },
  { id: 4, name: "Luxury Handbag", category: "luxury", image: "/images/handbag.jpg" },
  { id: 5, name: "High Heels", category: "women", image: "/images/heels.jpg" },
  { id: 6, name: "Sports Sneakers", category: "men", image: "/images/sneakers.jpg" },
  { id: 7, name: "Bracelet", category: "accessories", image: "/images/bracelet.jpg" },
  { id: 8, name: "Formal Shoes", category: "luxury", image: "/images/formal-shoes.jpg" },
  { id: 9, name: "Casual Pants", category: "pants", image: "/images/pants.jpg" },
  { id: 10, name: "Leather Jacket", category: "jackets", image: "/images/leather-jacket.jpg" }
];

// 🔹 Load Products (Filter Optional)
function loadProducts(filter = null, searchQuery = "") {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = ""; // Clear previous items

  let filteredProducts = products.filter(product => {
    return (!filter || product.category === filter) && 
           product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `<p class="text-gray-400 text-center w-full">No products found.</p>`;
    return;
  }

  filteredProducts.forEach(product => {
    let productHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <h3 class="mt-2 text-lg font-bold">${product.name}</h3>
      </div>
    `;
    productGrid.innerHTML += productHTML;
  });
}

// 🔹 Filter by Category
function filterCategory(category) {
  loadProducts(category);
}

// 🔹 Search Functionality
function setupSearch() {
  const searchInput = document.querySelector("input[type='text']");
  if (!searchInput) return;

  searchInput.addEventListener("input", (event) => {
    const searchQuery = event.target.value.trim();
    loadProducts(null, searchQuery);
  });
}

app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
