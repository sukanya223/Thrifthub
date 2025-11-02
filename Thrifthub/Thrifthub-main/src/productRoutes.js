import express from 'express';
import Product from '../src/models/Product.js';
 // Import Mongoose model

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    try {
        const { name, price, description, category, imageUrl } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: "Name and Price are required" });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            imageUrl
        });

        await newProduct.save(); // Save to MongoDB
        res.status(201).json({ message: "Product added", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
    }
});

export default router;
