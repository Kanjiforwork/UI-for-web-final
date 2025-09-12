// Product Card Component JavaScript
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image-container">
                <!-- Quick actions -->
                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="toggleWishlist(${product.id})" title="Add to wishlist">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="quick-action-btn" onclick="quickView(${product.id})" title="Quick view">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
                
                <!-- Product badge -->
                <div class="product-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z"></path>
                        <path d="m3.3 7 8.7 5 8.7-5"></path>
                        <path d="M12 22V12"></path>
                    </svg>
                </div>
                
                <!-- Product image -->
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                
                <div class="product-price">$${product.price}</div>
                
                <div class="product-rating">
                    <div class="rating-stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">( ${product.reviews} reviews )</span>
                </div>
                
                <p class="product-description">${product.description}</p>
                
                <div class="size-selector">
                    <div class="size-options">
                        ${product.sizes.map(size => `
                            <div class="size-option ${size === product.sizes[0] ? 'selected' : ''}" 
                                 onclick="selectSize(this, '${size}')">${size}</div>
                        `).join('')}
                    </div>
                    
                    <div class="color-selector">
                        ${product.colors.map((color, index) => `
                            <div class="color-option ${color} ${index === 0 ? 'selected' : ''}" 
                                 onclick="selectColor(this, '${color}')" title="${color}"></div>
                        `).join('')}
                    </div>
                </div>
                
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to cart
                </button>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += `<svg class="rating-star" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                      </svg>`;
        } else {
            stars += `<svg class="rating-star empty" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                      </svg>`;
        }
    }
    return stars;
}

function selectSize(element, size) {
    // Remove selected class from all size options
    element.parentNode.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Store selected size
    element.closest('.product-card').dataset.selectedSize = size;
}

function selectColor(element, color) {
    // Remove selected class from all color options
    element.parentNode.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Store selected color
    element.closest('.product-card').dataset.selectedColor = color;
}

function toggleWishlist(productId) {
    // Add wishlist functionality
    console.log('Toggle wishlist for product:', productId);
    
    // You can implement actual wishlist logic here
    showToast('Added to wishlist!', 'success');
}

function quickView(productId) {
    // Quick view functionality
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
        document.getElementById('quickViewContent').innerHTML = createQuickViewContent(product);
        const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
        modal.show();
    }
}

function createQuickViewContent(product) {
    return `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h4>${product.name}</h4>
                <p class="text-muted">${product.category}</p>
                <div class="h4 text-primary mb-3">$${product.price}</div>
                <div class="mb-3">
                    <div class="rating-stars d-inline-flex">
                        ${generateStars(product.rating)}
                    </div>
                    <small class="text-muted ms-2">(${product.reviews} reviews)</small>
                </div>
                <p>${product.description}</p>
                <div class="mb-3">
                    <label class="form-label">Size:</label>
                    <div class="size-options">
                        ${product.sizes.map(size => `
                            <div class="size-option" onclick="selectSize(this, '${size}')">${size}</div>
                        `).join('')}
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label">Color:</label>
                    <div class="color-selector">
                        ${product.colors.map(color => `
                            <div class="color-option ${color}" onclick="selectColor(this, '${color}')" title="${color}"></div>
                        `).join('')}
                    </div>
                </div>
                <button class="btn btn-dark btn-lg w-100 rounded-pill" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Sample products data - mở rộng thành 12 sản phẩm
const sampleProducts = [
    {
        id: 1,
        name: "Black Dashers",
        category: "Men's shoes",
        price: 64,
        rating: 4,
        reviews: 56,
        description: "The Black Dasher reimagines the traditional running shoe with natural materials engineered for serious performance.",
        image: "demo.png",
        sizes: ["5", "6", "7", "8", "9"],
        colors: ["black", "blue"],
        type: "accessory"
    },
    {
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
    },
    {
        id: 3,
        name: "UEH Essential Tee",
        category: "Unisex clothing",
        price: 25,
        rating: 4,
        reviews: 89,
        description: "Soft, comfortable t-shirt made from organic cotton with subtle UEH branding.",
        image: "demo.png",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["white", "black", "blue"],
        type: "tee"
    },
    {
        id: 4,
        name: "UEH Campus Backpack",
        category: "Accessories",
        price: 75,
        rating: 5,
        reviews: 203,
        description: "Durable backpack designed for student life. Multiple compartments and laptop sleeve included.",
        image: "demo.png",
        sizes: ["One Size"],
        colors: ["black", "blue"],
        type: "accessory"
    },
    {
        id: 5,
        name: "UEH Varsity Jacket",
        category: "Men's clothing",
        price: 89,
        rating: 4,
        reviews: 67,
        description: "Classic varsity jacket with premium materials and authentic UEH styling.",
        image: "demo.png",
        sizes: ["S", "M", "L", "XL"],
        colors: ["black", "blue", "red"],
        type: "hoodie"
    },
    {
        id: 6,
        name: "UEH Sport Cap",
        category: "Accessories",
        price: 22,
        rating: 4,
        reviews: 94,
        description: "Adjustable cap with embroidered UEH logo. Perfect for sports and casual wear.",
        image: "demo.png",
        sizes: ["One Size"],
        colors: ["black", "white", "blue"],
        type: "accessory"
    },
    {
        id: 7,
        name: "UEH Premium Polo",
        category: "Men's clothing",
        price: 55,
        rating: 5,
        reviews: 112,
        description: "Elegant polo shirt with UEH emblem. Perfect for formal and casual occasions.",
        image: "demo.png",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["white", "black", "blue"],
        type: "tee"
    },
    {
        id: 8,
        name: "UEH Winter Scarf",
        category: "Accessories",
        price: 28,
        rating: 4,
        reviews: 76,
        description: "Warm and stylish scarf featuring UEH colors. Essential for winter campus days.",
        image: "demo.png",
        sizes: ["One Size"],
        colors: ["blue", "black", "red"],
        type: "accessory"
    },
    {
        id: 9,
        name: "UEH Track Pants",
        category: "Unisex clothing",
        price: 42,
        rating: 4,
        reviews: 158,
        description: "Comfortable track pants for sports and leisure. Made with moisture-wicking fabric.",
        image: "demo.png",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["black", "blue"],
        type: "hoodie"
    },
    {
        id: 10,
        name: "UEH Business Card Holder",
        category: "Accessories",
        price: 18,
        rating: 5,
        reviews: 43,
        description: "Professional card holder with UEH logo. Perfect for networking events.",
        image: "demo.png",
        sizes: ["One Size"],
        colors: ["black"],
        type: "accessory"
    },
    {
        id: 11,
        name: "UEH Long Sleeve Tee",
        category: "Unisex clothing",
        price: 32,
        rating: 4,
        reviews: 87,
        description: "Comfortable long sleeve tee with subtle UEH branding. Great for layering.",
        image: "demo.png",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["white", "black", "blue"],
        type: "tee"
    },
    {
        id: 12,
        name: "UEH Graduation Bear",
        category: "Accessories",
        price: 35,
        rating: 5,
        reviews: 124,
        description: "Adorable graduation bear wearing UEH cap and gown. Perfect graduation gift.",
        image: "demo.png",
        sizes: ["One Size"],
        colors: ["brown"],
        type: "accessory"
    }
];

// Function to render all products using the new detail card design
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = sampleProducts.map(product => 
            `<div class="col">${createProductDetailCard(product)}</div>`
        ).join('');
    }
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    // Bỏ renderProductDetailCard() vì giờ tất cả sản phẩm đều dùng design mới
});

// Single Product Detail Card Component
function createProductDetailCard(product) {
    return `
        <div class="product-detail-card" onclick="goToProductDetail(${product.id})" style="cursor: pointer;">
            <!-- Product Image Section -->
            <div class="product-image-section">
                <!-- Shopping Cart Badge (thay thế VR icon) -->
                <div class="product-3d-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L20.5 9H5.12"></path>
                    </svg>
                </div>
                
                <!-- Product Image -->
                <img src="${product.image}" alt="${product.name}" class="product-main-image">
            </div>
            
            <!-- Product Content Section -->
            <div class="product-content-section">
                <!-- Product Title -->
                <h1 class="product-main-title">${product.name}</h1>
                
                <!-- Category -->
                <p class="product-category-text">${product.category}</p>
                
                <!-- Price -->
                <div class="product-price-display">$${product.price}</div>
                
                <!-- Rating -->
                <div class="product-rating-section">
                    <div class="rating-stars-display">
                        ${generateRatingStars(product.rating)}
                    </div>
                    <span class="rating-reviews-text">( ${product.reviews} reviews )</span>
                </div>
                
                <!-- Description -->
                <p class="product-description-text">${product.description}</p>
                
                <!-- Size Selection -->
                <div class="size-selection-container">
                    <div class="size-options-row">
                        ${product.sizes.map((size, index) => `
                            <div class="size-option-button ${index === 0 ? 'selected' : ''}" 
                                 onclick="selectProductSize(this, '${size}')">${size}</div>
                        `).join('')}
                    </div>
                    
                    <!-- Color Selection -->
                    <div class="color-selection-row">
                        ${product.colors.map((color, index) => `
                            <div class="color-option-circle ${color} ${index === 0 ? 'selected' : ''}" 
                                 onclick="selectProductColor(this, '${color}')" title="${color}"></div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Add to Cart Button -->
                <button class="add-to-cart-main-btn" onclick="addProductToCart(${product.id})">
                    Add to cart
                </button>
            </div>
        </div>
    `;
}

function generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += `<svg class="rating-star-icon" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                      </svg>`;
        } else {
            stars += `<svg class="rating-star-icon empty" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                      </svg>`;
        }
    }
    return stars;
}

function selectProductSize(element, size) {
    // Remove selected class from all size options
    element.parentNode.querySelectorAll('.size-option-button').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Store selected size
    element.closest('.product-detail-card').dataset.selectedSize = size;
    
    console.log('Selected size:', size);
}

function selectProductColor(element, color) {
    // Remove selected class from all color options
    element.parentNode.querySelectorAll('.color-option-circle').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Store selected color
    element.closest('.product-detail-card').dataset.selectedColor = color;
    
    console.log('Selected color:', color);
}

function addProductToCart(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const selectedSize = productCard?.dataset.selectedSize || '5';
    const selectedColor = productCard?.dataset.selectedColor || 'black';
    
    console.log('Adding to cart:', {
        productId,
        size: selectedSize,
        color: selectedColor
    });
    
    // Add to cart logic here
    showToast('Added to cart!', 'success');
}

// Function to navigate to product detail page
function goToProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Sample data for Black Dashers (matching the image)
const blackDashersProduct = {
    id: 1,
    name: "Black Dashers",
    category: "Men's shoes",
    price: 64,
    rating: 4,
    reviews: 56,
    description: "The Black Dasher reimagines the traditional running shoe with natural materials engineered for serious performance.",
    image: "demo.png", // Đổi thành demo.png
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["black", "blue"],
    type: "accessory"
};

// Override any existing renderProducts function to use new design
window.renderProducts = function() {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = sampleProducts.map(product => 
            `<div class="col">${createProductDetailCard(product)}</div>`
        ).join('');
    }
};

// Force re-render when this script loads
document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure this runs after app.js
    setTimeout(() => {
        renderProducts();
    }, 100);
});