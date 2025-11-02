// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load cart items
function loadCart() {
    const cartItems = document.querySelector('.cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="../index.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Color: ${item.color}</p>
                <p>Size: ${item.size}</p>
                <p class="item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn decrease">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                <button class="quantity-btn increase">+</button>
                <button class="remove-btn"><i class="fas fa-times"></i></button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
    addEventListeners();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;

    document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.shipping').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
}

// Add event listeners
function addEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.cart-item');
            const input = item.querySelector('.quantity-input');
            const id = parseInt(item.dataset.id);
            const cartItem = cart.find(item => item.id === id);

            if (e.target.classList.contains('decrease')) {
                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                    input.value = cartItem.quantity;
                }
            } else if (e.target.classList.contains('increase')) {
                cartItem.quantity++;
                input.value = cartItem.quantity;
            }

            updateCart();
        });
    });

    // Quantity input
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const item = e.target.closest('.cart-item');
            const id = parseInt(item.dataset.id);
            const cartItem = cart.find(item => item.id === id);
            const value = parseInt(e.target.value);

            if (value >= 1) {
                cartItem.quantity = value;
                updateCart();
            } else {
                e.target.value = cartItem.quantity;
            }
        });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.cart-item');
            const id = parseInt(item.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}

// Update cart in localStorage and reload
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Login modal functionality
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close');

loginBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Load cart when page loads
document.addEventListener('DOMContentLoaded', loadCart); 