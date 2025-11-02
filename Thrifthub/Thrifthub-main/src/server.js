import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import productRoutes from './productRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from root directory
app.use(express.static(path.join(__dirname, '..')));

// Serve static files from src directory for images
app.use('/src', express.static(path.join(__dirname)));

// MongoDB Connection
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};
connectDB();

// API Routes
app.use('/api/products', productRoutes);

// Serve Frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

document.querySelectorAll('.product-card').forEach((card) => {
  card.addEventListener('click', () => {
    const productId = card.dataset.id; // Get the product ID
    window.location.href = `/product-details.html?id=${productId}`;
  });
});

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`/api/products/${productId}`)
  .then((response) => response.json())
  .then((product) => {
    if (!product) {
      throw new Error('Product not found');
    }
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('.product-description').textContent = product.description;
    document.querySelector('.product-price').textContent = `$${product.price}`;
    document.querySelector('.product-detail-image').src = product.image;
  })
  .catch((error) => {
    console.error('Error fetching product details:', error);
    document.querySelector('.product-details-container').innerHTML = `
      <p style="color: red;">Unable to load product details. Please try again later.</p>
    `;
  });
