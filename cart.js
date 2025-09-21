// Cart JavaScript - Shopping Cart Management
(function() {
    'use strict';
    
    // ===== CART DATA MANAGEMENT =====
    let cartItems = JSON.parse(localStorage.getItem('ueh_cart')) || [];
    
    // Sample products for recommendations
    const sampleProducts = [
        {
            id: 1,
            name: "Black Dashers",
            price: 64.00,
            image_url: "demo.png",
            category: "Shoes"
        },
        {
            id: 2,
            name: "UEH Classic Hoodie",
            price: 45.00,
            discount_price: 39.99,
            image_url: "SP-04.png",
            category: "Hoodie"
        },
        {
            id: 3,
            name: "UEH Essential Tee",
            price: 25.00,
            image_url: "shirt.png",
            category: "T-Shirt"
        }
    ];
    
    // ===== CART ITEM COMPONENT =====
    function createCartItemHTML(item) {
        const displayPrice = item.discount_price || item.price;
        const originalPrice = item.price;
        const hasDiscount = item.discount_price !== null && item.discount_price < item.price;
        
        return `
            <div class="cart-item border-bottom py-4 px-4" data-id="${item.id}">
                <div class="row align-items-center">
                    <!-- Product Image -->
                    <div class="col-md-2 col-3">
                        <div class="position-relative">
                            <img src="${item.image_url}" alt="${item.name}" class="img-fluid rounded-3" style="
                                width: 80px; 
                                height: 80px; 
                                object-fit: cover;
                                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                            ">
                        </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="col-md-4 col-9">
                        <h6 class="mb-1 fw-bold" style="color: #1f2937;">${item.name}</h6>
                        <p class="text-muted mb-1" style="font-size: 0.9rem;">${item.category || 'Product'}</p>
                        ${item.selectedSize ? `<small class="text-muted">Size: ${item.selectedSize}</small><br>` : ''}
                        ${item.selectedColor ? `<small class="text-muted">Color: ${item.selectedColor}</small>` : ''}
                    </div>
                    
                    <!-- Quantity Controls -->
                    <div class="col-md-2 col-4">
                        <div class="d-flex align-items-center justify-content-center">
                            <button class="btn btn-outline-secondary btn-sm rounded-circle" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" style="width: 32px; height: 32px; padding: 0;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <span class="mx-3 fw-medium">${item.quantity}</span>
                            <button class="btn btn-outline-secondary btn-sm rounded-circle" onclick="updateQuantity(${item.id}, ${item.quantity + 1})" style="width: 32px; height: 32px; padding: 0;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Price -->
                    <div class="col-md-2 col-4 text-end">
                        <div class="d-flex flex-column align-items-end">
                            ${hasDiscount ? `
                                <span class="fw-bold" style="color: #1f2937;">$${(displayPrice * item.quantity).toFixed(2)}</span>
                                <small class="text-muted text-decoration-line-through">$${(originalPrice * item.quantity).toFixed(2)}</small>
                            ` : `
                                <span class="fw-bold" style="color: #1f2937;">$${(displayPrice * item.quantity).toFixed(2)}</span>
                            `}
                        </div>
                    </div>
                    
                    <!-- Remove Button -->
                    <div class="col-md-2 col-4 text-end">
                        <button class="btn btn-link text-muted p-2" onclick="removeFromCart(${item.id})" title="Remove item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // ===== RECOMMENDED PRODUCT COMPONENT =====
    function createRecommendedProductHTML(product) {
        const displayPrice = product.discount_price || product.price;
        const hasDiscount = product.discount_price !== null;
        
        return `
            <div class="d-flex align-items-center mb-3 p-2 rounded-3" style="transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
                <img src="${product.image_url}" alt="${product.name}" class="rounded-2 me-3" style="width: 50px; height: 50px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-1" style="font-size: 0.9rem; color: #1f2937;">${product.name}</h6>
                    <div class="d-flex align-items-center">
                        ${hasDiscount ? `
                            <span class="fw-bold text-success me-2" style="font-size: 0.9rem;">$${displayPrice}</span>
                            <small class="text-muted text-decoration-line-through">$${product.price}</small>
                        ` : `
                            <span class="fw-bold" style="font-size: 0.9rem; color: #1f2937;">$${displayPrice}</span>
                        `}
                    </div>
                </div>
                <button class="btn btn-outline-dark btn-sm rounded-pill" onclick="addRecommendedToCart(${product.id})" style="font-size: 0.8rem;">Add</button>
            </div>
        `;
    }
    
    // ===== CART MANAGEMENT FUNCTIONS =====
    function saveCart() {
        localStorage.setItem('ueh_cart', JSON.stringify(cartItems));
        updateCartDisplay();
        updateCartBadge();
    }
    
    function addToCart(product, selectedSize = null, selectedColor = null) {
        const existingItem = cartItems.find(item => 
            item.id === product.id && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor
        );
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                discount_price: product.discount_price || null,
                image_url: product.image_url,
                category: product.category,
                quantity: 1,
                selectedSize: selectedSize,
                selectedColor: selectedColor
            });
        }
        
        saveCart();
        showToast(`Added "${product.name}" to cart!`, 'success');
    }
    
    function removeFromCart(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        saveCart();
        showToast('Item removed from cart', 'info');
    }
    
    function updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
        }
    }
    
    function clearCart() {
        cartItems = [];
        saveCart();
        showToast('Cart cleared', 'info');
    }
    
    // ===== DISPLAY FUNCTIONS =====
    function updateCartDisplay() {
        const cartItemsList = document.getElementById('cartItemsList');
        const emptyCartState = document.getElementById('emptyCartState');
        const cartItemCount = document.getElementById('cartItemCount');
        
        if (!cartItemsList) return;
        
        if (cartItems.length === 0) {
            cartItemsList.style.display = 'none';
            emptyCartState?.classList.remove('d-none');
            if (cartItemCount) cartItemCount.textContent = 'Your cart is empty';
        } else {
            cartItemsList.style.display = 'block';
            emptyCartState?.classList.add('d-none');
            if (cartItemCount) cartItemCount.textContent = `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`;
            
            cartItemsList.innerHTML = cartItems.map(item => createCartItemHTML(item)).join('');
        }
        
        updateOrderSummary();
    }
    
    function updateOrderSummary() {
        const subtotal = cartItems.reduce((total, item) => {
            const price = item.discount_price || item.price;
            return total + (price * item.quantity);
        }, 0);
        
        const tax = subtotal * 0.1; // 10% tax
        const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
        const total = subtotal + tax + shipping;
        
        // Update display elements
        const subtotalEl = document.getElementById('cartSubtotal');
        const taxEl = document.getElementById('cartTax');
        const shippingEl = document.getElementById('cartShipping');
        const totalEl = document.getElementById('cartTotal');
        
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }
    
    function updateCartBadge() {
        const cartBadge = document.getElementById('cartCount');
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        if (cartBadge) {
            if (totalItems > 0) {
                cartBadge.textContent = totalItems;
                cartBadge.classList.remove('d-none');
            } else {
                cartBadge.classList.add('d-none');
            }
        }
    }
    
    function loadRecommendedProducts() {
        const recommendedContainer = document.getElementById('recommendedProducts');
        if (!recommendedContainer) return;
        
        // Show products not in cart
        const availableProducts = sampleProducts.filter(product => 
            !cartItems.some(cartItem => cartItem.id === product.id)
        ).slice(0, 3);
        
        if (availableProducts.length > 0) {
            recommendedContainer.innerHTML = availableProducts.map(product => 
                createRecommendedProductHTML(product)
            ).join('');
        } else {
            recommendedContainer.innerHTML = '<p class="text-muted text-center">No recommendations available</p>';
        }
    }
    
    // ===== EVENT HANDLERS =====
    function addRecommendedToCart(productId) {
        const product = sampleProducts.find(p => p.id === productId);
        if (product) {
            addToCart(product);
            loadRecommendedProducts(); // Refresh recommendations
        }
    }
    
    function applyPromoCode() {
        const promoInput = document.getElementById('promoCode');
        const code = promoInput?.value.trim().toUpperCase();
        
        if (!code) {
            showToast('Please enter a promo code', 'warning');
            return;
        }
        
        // Simple promo code logic
        const validCodes = {
            'STUDENT10': 0.1,
            'UEH2025': 0.15,
            'WELCOME': 0.05
        };
        
        if (validCodes[code]) {
            showToast(`Promo code "${code}" applied! ${Math.round(validCodes[code] * 100)}% discount`, 'success');
            if (promoInput) promoInput.value = '';
        } else {
            showToast('Invalid promo code', 'error');
        }
    }
    
    function proceedToCheckout() {
        if (cartItems.length === 0) {
            showToast('Your cart is empty', 'warning');
            return;
        }
        
        showToast('Redirecting to checkout...', 'info');
        // Here you would redirect to checkout page
        setTimeout(() => {
            // window.location.href = 'checkout.html';
            console.log('Proceeding to checkout with items:', cartItems);
        }, 1000);
    }
    
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <div class="rounded me-2" style="width: 12px; height: 12px; background-color: ${getToastColor(type)};"></div>
                    <strong class="me-auto">UEH Merch</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        // Remove toast after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
    
    function getToastColor(type) {
        const colors = {
            'success': '#10b981',
            'error': '#ef4444',
            'warning': '#f59e0b',
            'info': '#3b82f6'
        };
        return colors[type] || colors.info;
    }
    
    // ===== GLOBAL FUNCTIONS =====
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.clearCart = clearCart;
    window.addRecommendedToCart = addRecommendedToCart;
    window.applyPromoCode = applyPromoCode;
    window.proceedToCheckout = proceedToCheckout;
    window.showToast = showToast;
    
    // ===== INITIALIZATION =====
    function initializeCart() {
        console.log('🛒 Cart initialized with', cartItems.length, 'items');
        updateCartDisplay();
        updateCartBadge();
        loadRecommendedProducts();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCart);
    } else {
        initializeCart();
    }
    
    console.log('🛒 Cart JavaScript loaded successfully');
})();