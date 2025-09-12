// Product Detail Page JavaScript
let currentProduct = {};
let selectedSize = '';
let selectedColor = '';
let quantity = 1;

// Get product ID from URL or default to first product
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Sample product data (same as product-card.js)
const productData = {
    1: {
        id: 1,
        name: "Black Dashers",
        category: "Men's shoes",
        price: 64,
        rating: 4,
        reviews: 56,
        description: "The Black Dasher reimagines the traditional running shoe with natural materials engineered for serious performance. Crafted with premium materials and attention to detail.",
        image: "demo.png",
        sizes: ["5", "6", "7", "8", "9"],
        colors: ["black", "blue"],
        type: "accessory"
    },
    2: {
        id: 2,
        name: "UEH Classic Hoodie",
        category: "Men's clothing",
        price: 45,
        rating: 5,
        reviews: 128,
        description: "Premium cotton hoodie with embroidered UEH logo. Perfect for campus life and beyond.",
        image: "demo.png",
        sizes: ["S", "M", "L", "XL"],
        colors: ["black", "white", "blue"],
        type: "hoodie"
    }
    // Add more products as needed
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const productId = getProductIdFromUrl();
    loadProduct(productId);
});

// Load product data
function loadProduct(productId) {
    currentProduct = productData[productId] || productData[1];
    
    // Update DOM elements
    document.getElementById('productImage').src = currentProduct.image;
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productCategory').textContent = currentProduct.category;
    document.getElementById('productPrice').textContent = `$${currentProduct.price}`;
    document.getElementById('productDescription').textContent = currentProduct.description;
    document.getElementById('reviewCount').textContent = `(${currentProduct.reviews} reviews)`;
    
    // Generate rating stars
    generateRatingStars();
    
    // Generate size options
    generateSizeOptions();
    
    // Generate color options
    generateColorOptions();
    
    // Set default selections
    selectedSize = currentProduct.sizes[0];
    selectedColor = currentProduct.colors[0];
    
    // Update UI
    updateTotalPrice();
    updateSelections();
}

// Generate rating stars
function generateRatingStars() {
    const ratingContainer = document.getElementById('productRating');
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= currentProduct.rating) {
            starsHtml += `<svg class="rating-star" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                          </svg>`;
        } else {
            starsHtml += `<svg class="rating-star empty" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                          </svg>`;
        }
    }
    
    ratingContainer.innerHTML = starsHtml;
}

// Generate size options
function generateSizeOptions() {
    const sizeContainer = document.getElementById('sizeOptions');
    let sizesHtml = '';
    
    currentProduct.sizes.forEach((size, index) => {
        sizesHtml += `<div class="size-option-detail ${index === 0 ? 'selected' : ''}" 
                           onclick="selectSize('${size}')">${size}</div>`;
    });
    
    sizeContainer.innerHTML = sizesHtml;
}

// Generate color options
function generateColorOptions() {
    const colorContainer = document.getElementById('colorOptions');
    let colorsHtml = '';
    
    currentProduct.colors.forEach((color, index) => {
        colorsHtml += `<div class="color-option-detail ${color} ${index === 0 ? 'selected' : ''}" 
                            onclick="selectColor('${color}')" title="${color}"></div>`;
    });
    
    colorContainer.innerHTML = colorsHtml;
}

// Select size
function selectSize(size) {
    selectedSize = size;
    updateSelections();
}

// Select color
function selectColor(color) {
    selectedColor = color;
    updateSelections();
}

// Update visual selections
function updateSelections() {
    // Update size selections
    document.querySelectorAll('.size-option-detail').forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === selectedSize) {
            option.classList.add('selected');
        }
    });
    
    // Update color selections
    document.querySelectorAll('.color-option-detail').forEach(option => {
        option.classList.remove('selected');
        if (option.classList.contains(selectedColor)) {
            option.classList.add('selected');
        }
    });
}

// Change quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let newQuantity = parseInt(quantityInput.value) + change;
    
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10;
    
    quantity = newQuantity;
    quantityInput.value = quantity;
    updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
    const total = currentProduct.price * quantity;
    document.getElementById('totalPrice').textContent = `$${total}`;
}

// Add to cart
function addToCart() {
    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        image: currentProduct.image
    };
    
    console.log('Adding to cart:', cartItem);
    alert(`Added ${cartItem.name} (${cartItem.size}, ${cartItem.color}) x${cartItem.quantity} to cart!`);
}

// Buy now
function buyNow() {
    addToCart();
    alert('Redirecting to checkout...');
    // window.location.href = 'checkout.html';
}

// Add to wishlist
function addToWishlist() {
    console.log('Adding to wishlist:', currentProduct);
    alert(`Added ${currentProduct.name} to wishlist!`);
}

// Quantity input change handler
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            quantity = parseInt(this.value) || 1;
            if (quantity < 1) quantity = 1;
            if (quantity > 10) quantity = 10;
            this.value = quantity;
            updateTotalPrice();
        });
    }
});