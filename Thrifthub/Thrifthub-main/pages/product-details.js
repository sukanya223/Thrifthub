// Get product ID and category from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const category = urlParams.get('category');

// Product data for each category
const products = {
    men: [
        {
            id: 1,
            name: "Classic T-Shirt",
            price: 29.99,
            image: "../images/men-tshirt.jpg",
            description: "A comfortable and stylish classic t-shirt made from 100% cotton. Perfect for casual wear.",
            colors: ["#000000", "#FFFFFF", "#808080"],
            sizes: ["S", "M", "L", "XL"],
            date: "2024-03-15"
        },
        // Add more men's products here
    ],
    women: [
        {
            id: 1,
            name: "Elegant Blouse",
            price: 49.99,
            image: "../images/women-blouse.jpg",
            description: "An elegant blouse made from premium silk. Features a classic design with a modern twist.",
            colors: ["#FF69B4", "#FFFFFF", "#000000"],
            sizes: ["XS", "S", "M", "L"],
            date: "2024-03-15"
        },
        // Add more women's products here
    ],
    accessories: [
        {
            id: 1,
            name: "Leather Wallet",
            price: 39.99,
            image: "../images/accessories-wallet.jpg",
            description: "A premium leather wallet with multiple card slots and a coin pocket. Handcrafted with attention to detail.",
            colors: ["#8B4513", "#000000", "#808080"],
            sizes: ["One Size"],
            date: "2024-03-15"
        },
        // Add more accessories here
    ],
    luxury: [
        {
            id: 1,
            name: "Designer Watch",
            price: 999.99,
            image: "../images/luxury-watch.jpg",
            description: "A luxury designer watch with a stainless steel case and genuine leather strap. Swiss movement.",
            colors: ["#C0C0C0", "#FFD700", "#000000"],
            sizes: ["One Size"],
            date: "2024-03-15"
        },
        // Add more luxury items here
    ]
};

// Load product details
function loadProductDetails() {
    const product = products[category].find(p => p.id === parseInt(productId));
    if (!product) {
        document.querySelector('.product-details').innerHTML = '<h2>Product not found</h2>';
        return;
    }

    // Update product information
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
    document.querySelector('.product-description').textContent = product.description;
    document.querySelector('.main-image').src = product.image;

    // Load color options
    const colorOptions = document.querySelector('.color-options');
    colorOptions.innerHTML = product.colors.map(color => `
        <div class="color-option" style="background-color: ${color};" data-color="${color}"></div>
    `).join('');

    // Load size options
    const sizeOptions = document.querySelector('.size-options');
    sizeOptions.innerHTML = product.sizes.map(size => `
        <div class="size-option" data-size="${size}">${size}</div>
    `).join('');

    // Load related products
    loadRelatedProducts(product);
}

// Load related products
function loadRelatedProducts(currentProduct) {
    const relatedProducts = products[category]
        .filter(p => p.id !== currentProduct.id)
        .slice(0, 4);

    const relatedGrid = document.querySelector('.related-grid');
    relatedGrid.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="viewDetails(${product.id})">View Details</button>
        </div>
    `).join('');
}

// Handle color selection
document.querySelector('.color-options').addEventListener('click', (e) => {
    if (e.target.classList.contains('color-option')) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.style.borderColor = 'transparent';
        });
        e.target.style.borderColor = '#ff6b6b';
    }
});

// Handle size selection
document.querySelector('.size-options').addEventListener('click', (e) => {
    if (e.target.classList.contains('size-option')) {
        document.querySelectorAll('.size-option').forEach(option => {
            option.style.backgroundColor = 'transparent';
            option.style.color = '#fff';
        });
        e.target.style.backgroundColor = '#444';
        e.target.style.color = '#fff';
    }
});

// Handle quantity changes
document.querySelector('.quantity-btn.decrease').addEventListener('click', () => {
    const input = document.querySelector('.quantity-input');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
});

document.querySelector('.quantity-btn.increase').addEventListener('click', () => {
    const input = document.querySelector('.quantity-input');
    input.value = parseInt(input.value) + 1;
});

// Handle add to cart
document.querySelector('.btn-primary').addEventListener('click', () => {
    const selectedColor = document.querySelector('.color-option[style*="border-color: #ff6b6b"]')?.dataset.color;
    const selectedSize = document.querySelector('.size-option[style*="background-color: #444"]')?.dataset.size;
    const quantity = parseInt(document.querySelector('.quantity-input').value);

    if (!selectedColor || !selectedSize) {
        alert('Please select a color and size');
        return;
    }

    const product = products[category].find(p => p.id === parseInt(productId));
    if (!product) return;

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => 
        item.id === cartItem.id && 
        item.color === cartItem.color && 
        item.size === cartItem.size
    );

    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
});

// Load product details when page loads
document.addEventListener('DOMContentLoaded', loadProductDetails); 