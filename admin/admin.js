// Admin JavaScript - Complete Product Management System
(function() {
    'use strict';
    
    // ===== DATA STORAGE =====
    let products = JSON.parse(localStorage.getItem('admin_products')) || [
        {
            id: 1,
            name: "Black Dashers",
            description: "The Black Dasher reimagines the traditional running shoe with natural materials engineered for serious performance.",
            price: 64.00,
            discount_price: null,
            quantity: 15,
            image_url: "demo.png",
            category_id: 3,
            seller_id: 1,
            status: "available",
            created_at: "2024-01-15T10:30:00Z",
            updated_at: "2024-01-15T10:30:00Z",
            category: "Men's shoes",
            rating: 4,
            reviews: 56,
            sizes: ["5", "6", "7", "8", "9"],
            colors: ["black", "blue"],
            type: "accessory"
        },
        {
            id: 2,
            name: "UEH Classic Hoodie",
            description: "Premium cotton hoodie with embroidered UEH logo. Perfect for campus life and beyond.",
            price: 45.00,
            discount_price: 39.99,
            quantity: 25,
            image_url: "SP-04.png",
            category_id: 1,
            seller_id: 1,
            status: "available",
            created_at: "2024-01-10T09:15:00Z",
            updated_at: "2024-01-20T14:30:00Z",
            category: "Men's clothing",
            rating: 5,
            reviews: 128,
            sizes: ["S", "M", "L", "XL"],
            colors: ["black", "white", "blue"],
            type: "hoodie"
        },
        {
            id: 3,
            name: "UEH Essential Tee",
            description: "Soft, comfortable t-shirt made from organic cotton with subtle UEH branding.",
            price: 25.00,
            discount_price: null,
            quantity: 40,
            image_url: "shirt.png",
            category_id: 2,
            seller_id: 1,
            status: "available",
            created_at: "2024-01-05T16:45:00Z",
            updated_at: "2024-01-05T16:45:00Z",
            category: "Unisex clothing",
            rating: 4,
            reviews: 89,
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["white", "black", "blue"],
            type: "tee"
        }
    ];
    
    let categories = JSON.parse(localStorage.getItem('admin_categories')) || [
        { id: 1, name: "Hoodies & Jackets", type: "hoodie", description: "Comfortable hoodies and jackets" },
        { id: 2, name: "T-Shirts & Tees", type: "tee", description: "Essential t-shirts and tees" },
        { id: 3, name: "Accessories", type: "accessory", description: "Bags, caps, and other accessories" }
    ];
    
    let sizes = JSON.parse(localStorage.getItem('admin_sizes')) || [
        "XS", "S", "M", "L", "XL", "XXL", "One Size", "5", "6", "7", "8", "9", "10"
    ];
    
    let colors = JSON.parse(localStorage.getItem('admin_colors')) || [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#ffffff" },
        { name: "Blue", value: "#007AFF" },
        { name: "Red", value: "#FF3B30" },
        { name: "Brown", value: "#8B4513" }
    ];
    
    // ===== NEW DATA FOR ORDERS AND CUSTOMERS =====
    let orders = JSON.parse(localStorage.getItem('admin_orders')) || [
        {
            id: 1001,
            customer_id: 1,
            customer_name: "Nguyen Van A",
            customer_email: "nguyenvana@ueh.edu.vn",
            customer_phone: "+84 901 234 567",
            items: [
                { product_id: 2, product_name: "UEH Classic Hoodie", quantity: 2, price: 39.99, size: "L", color: "black" },
                { product_id: 3, product_name: "UEH Essential Tee", quantity: 1, price: 25.00, size: "M", color: "white" }
            ],
            subtotal: 104.98,
            tax: 10.50,
            shipping: 0,
            total: 115.48,
            status: "processing",
            payment_status: "paid",
            payment_method: "credit_card",
            shipping_address: {
                street: "279 Nguyen Tri Phuong",
                city: "Ho Chi Minh City",
                district: "District 10",
                postal_code: "700000"
            },
            created_at: "2025-01-15T09:30:00Z",
            updated_at: "2025-01-16T14:20:00Z"
        },
        {
            id: 1002,
            customer_id: 2,
            customer_name: "Tran Thi B",
            customer_email: "tranthib@ueh.edu.vn",
            customer_phone: "+84 902 345 678",
            items: [
                { product_id: 1, product_name: "Black Dashers", quantity: 1, price: 64.00, size: "8", color: "black" }
            ],
            subtotal: 64.00,
            tax: 6.40,
            shipping: 5.99,
            total: 76.39,
            status: "delivered",
            payment_status: "paid",
            payment_method: "paypal",
            shipping_address: {
                street: "590A Cach Mang Thang Tam",
                city: "Ho Chi Minh City",
                district: "District 3",
                postal_code: "700000"
            },
            created_at: "2025-01-10T16:45:00Z",
            updated_at: "2025-01-20T11:30:00Z"
        },
        {
            id: 1003,
            customer_id: 3,
            customer_name: "Le Van C",
            customer_email: "levanc@ueh.edu.vn",
            customer_phone: "+84 903 456 789",
            items: [
                { product_id: 4, product_name: "UEH Campus Backpack", quantity: 1, price: 65.00, size: "One Size", color: "black" },
                { product_id: 6, product_name: "UEH Sport Cap", quantity: 2, price: 22.00, size: "One Size", color: "blue" }
            ],
            subtotal: 109.00,
            tax: 10.90,
            shipping: 0,
            total: 119.90,
            status: "pending",
            payment_status: "pending",
            payment_method: "bank_transfer",
            shipping_address: {
                street: "1A Hoang Dieu",
                city: "Ho Chi Minh City",
                district: "Phu Nhuan",
                postal_code: "700000"
            },
            created_at: "2025-01-25T08:15:00Z",
            updated_at: "2025-01-25T08:15:00Z"
        },
        {
            id: 1004,
            customer_id: 1,
            customer_name: "Nguyen Van A",
            customer_email: "nguyenvana@ueh.edu.vn",
            customer_phone: "+84 901 234 567",
            items: [
                { product_id: 7, product_name: "UEH Premium Polo", quantity: 1, price: 45.00, size: "L", color: "white" }
            ],
            subtotal: 45.00,
            tax: 4.50,
            shipping: 5.99,
            total: 55.49,
            status: "cancelled",
            payment_status: "failed",
            payment_method: "credit_card",
            shipping_address: {
                street: "279 Nguyen Tri Phuong",
                city: "Ho Chi Minh City",
                district: "District 10",
                postal_code: "700000"
            },
            created_at: "2025-01-22T12:00:00Z",
            updated_at: "2025-01-23T09:30:00Z"
        }
    ];
    
    let customers = JSON.parse(localStorage.getItem('admin_customers')) || [
        {
            id: 1,
            name: "Nguyen Van A",
            email: "nguyenvana@ueh.edu.vn",
            phone: "+84 901 234 567",
            address: {
                street: "279 Nguyen Tri Phuong",
                city: "Ho Chi Minh City",
                district: "District 10",
                postal_code: "700000"
            },
            orders_count: 2,
            total_spent: 170.97,
            last_order_date: "2025-01-16T14:20:00Z",
            status: "active",
            created_at: "2024-12-01T10:00:00Z"
        },
        {
            id: 2,
            name: "Tran Thi B",
            email: "tranthib@ueh.edu.vn",
            phone: "+84 902 345 678",
            address: {
                street: "590A Cach Mang Thang Tam",
                city: "Ho Chi Minh City",
                district: "District 3",
                postal_code: "700000"
            },
            orders_count: 1,
            total_spent: 76.39,
            last_order_date: "2025-01-20T11:30:00Z",
            status: "active",
            created_at: "2024-11-15T14:30:00Z"
        },
        {
            id: 3,
            name: "Le Van C",
            email: "levanc@ueh.edu.vn",
            phone: "+84 903 456 789",
            address: {
                street: "1A Hoang Dieu",
                city: "Ho Chi Minh City",
                district: "Phu Nhuan",
                postal_code: "700000"
            },
            orders_count: 1,
            total_spent: 119.90,
            last_order_date: "2025-01-25T08:15:00Z",
            status: "active",
            created_at: "2025-01-20T16:45:00Z"
        },
        {
            id: 4,
            name: "Pham Thi D",
            email: "phamthid@ueh.edu.vn",
            phone: "+84 904 567 890",
            address: {
                street: "456 Le Van Sy",
                city: "Ho Chi Minh City",
                district: "District 3",
                postal_code: "700000"
            },
            orders_count: 0,
            total_spent: 0,
            last_order_date: null,
            status: "inactive",
            created_at: "2024-10-01T09:15:00Z"
        }
    ];
    
    // ===== CURRENT STATE =====
    let currentPage = 1;
    let itemsPerPage = 10;
    let filteredProducts = [...products];
    let filteredOrders = [...orders];
    let filteredCustomers = [...customers];
    let editingProduct = null;
    let editingCategory = null;
    let currentOrder = null;
    
    // ===== TAB MANAGEMENT =====
    function initializeTabs() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link[data-tab]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tabName = this.getAttribute('data-tab');
                switchTab(tabName);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    function switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab
        const targetTab = document.getElementById(tabName + '-tab');
        if (targetTab) {
            targetTab.classList.add('active');
            
            // Load tab content
            switch(tabName) {
                case 'products':
                    loadProducts();
                    break;
                case 'categories':
                    loadCategories();
                    break;
                case 'attributes':
                    loadSizesAndColors();
                    break;
                case 'orders':
                    loadOrders();
                    break;
                case 'customers':
                    loadCustomers();
                    break;
            }
        }
    }
    
    // ===== PRODUCTS MANAGEMENT =====
    function loadProducts() {
        applyFilters();
        renderProductsTable();
        renderPagination();
    }
    
    function renderProductsTable() {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageProducts = filteredProducts.slice(startIndex, endIndex);
        
        if (pageProducts.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5">
                        <div class="empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M20 7H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2zM4 7v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7"></path>
                            </svg>
                            <h5>No products found</h5>
                            <p>Try adjusting your filters or add a new product.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = pageProducts.map(product => `
            <tr>
                <td>
                    <input type="checkbox" class="form-check-input" value="${product.id}">
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="../${product.image_url}" alt="${product.name}" class="product-image me-3">
                        <div>
                            <h6 class="mb-0">${product.name}</h6>
                            <small class="text-muted">#${product.id}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge bg-light text-dark">${product.type}</span>
                </td>
                <td>
                    <div>
                        ${product.discount_price ? `
                            <span class="fw-bold text-success">$${product.discount_price}</span>
                            <small class="text-muted text-decoration-line-through d-block">$${product.price}</small>
                        ` : `
                            <span class="fw-bold">$${product.price}</span>
                        `}
                    </div>
                </td>
                <td>
                    <span class="fw-medium">${product.quantity}</span>
                </td>
                <td>
                    <span class="status-badge ${product.status === 'available' ? 'status-available' : 'status-out-of-stock'}">
                        ${product.status === 'available' ? 'Available' : 'Out of Stock'}
                    </span>
                </td>
                <td>
                    <div class="d-flex">
                        <button class="btn btn-action btn-edit" onclick="editProduct(${product.id})" title="Edit">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn btn-action btn-delete" onclick="deleteProduct(${product.id})" title="Delete">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    function applyFilters() {
        const searchTerm = document.getElementById('searchProduct')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('filterCategory')?.value || '';
        const statusFilter = document.getElementById('filterStatus')?.value || '';
        
        filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || product.type === categoryFilter;
            const matchesStatus = !statusFilter || product.status === statusFilter;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
        
        currentPage = 1; // Reset to first page when filtering
    }
    
    function renderPagination() {
        const pagination = document.getElementById('productsPagination');
        if (!pagination) return;
        
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
            </li>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHTML += `
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                    </li>
                `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            }
        }
        
        // Next button
        paginationHTML += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
            </li>
        `;
        
        pagination.innerHTML = paginationHTML;
    }
    
    function changePage(page) {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderProductsTable();
            renderPagination();
        }
    }
    
    // ===== PRODUCT MODAL MANAGEMENT =====
    function openProductModal(productId = null) {
        editingProduct = productId;
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        const modalLabel = document.getElementById('productModalLabel');
        
        if (productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                modalLabel.textContent = 'Edit Product';
                populateProductForm(product);
            }
        } else {
            modalLabel.textContent = 'Add Product';
            resetProductForm();
        }
        
        populateProductSizesAndColors();
        modal.show();
    }
    
    function populateProductForm(product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.type;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDiscountPrice').value = product.discount_price || '';
        document.getElementById('productQuantity').value = product.quantity;
        
        // Set selected sizes
        const sizeCheckboxes = document.querySelectorAll('#productSizes input[type="checkbox"]');
        sizeCheckboxes.forEach(checkbox => {
            checkbox.checked = product.sizes.includes(checkbox.value);
        });
        
        // Set selected colors
        const colorCheckboxes = document.querySelectorAll('#productColors input[type="checkbox"]');
        colorCheckboxes.forEach(checkbox => {
            checkbox.checked = product.colors.includes(checkbox.value);
        });
    }
    
    function resetProductForm() {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
    }
    
    function populateProductSizesAndColors() {
        const sizesContainer = document.getElementById('productSizes');
        const colorsContainer = document.getElementById('productColors');
        
        // Populate sizes
        sizesContainer.innerHTML = sizes.map(size => `
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="size_${size}" value="${size}">
                <label class="form-check-label" for="size_${size}">${size}</label>
            </div>
        `).join('');
        
        // Populate colors
        colorsContainer.innerHTML = colors.map(color => `
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="color_${color.name}" value="${color.name.toLowerCase()}">
                <label class="form-check-label" for="color_${color.name}">${color.name}</label>
            </div>
        `).join('');
    }
    
    function saveProduct() {
        const form = document.getElementById('productForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const productData = {
            name: document.getElementById('productName').value,
            type: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            discount_price: document.getElementById('productDiscountPrice').value ? 
                           parseFloat(document.getElementById('productDiscountPrice').value) : null,
            quantity: parseInt(document.getElementById('productQuantity').value),
            sizes: Array.from(document.querySelectorAll('#productSizes input:checked')).map(cb => cb.value),
            colors: Array.from(document.querySelectorAll('#productColors input:checked')).map(cb => cb.value),
            status: parseInt(document.getElementById('productQuantity').value) > 0 ? 'available' : 'out_of_stock',
            updated_at: new Date().toISOString()
        };
        
        // Set category based on type
        const categoryMap = { hoodie: "Men's clothing", tee: "Unisex clothing", accessory: "Accessories" };
        productData.category = categoryMap[productData.type] || "General";
        productData.category_id = productData.type === 'hoodie' ? 1 : productData.type === 'tee' ? 2 : 3;
        
        if (editingProduct) {
            // Update existing product
            const index = products.findIndex(p => p.id === editingProduct);
            if (index !== -1) {
                products[index] = { ...products[index], ...productData };
                showToast('Product updated successfully!', 'success');
            }
        } else {
            // Add new product
            const newProduct = {
                id: Math.max(...products.map(p => p.id), 0) + 1,
                seller_id: 1,
                rating: 4,
                reviews: 0,
                image_url: "demo.png", // Default image
                created_at: new Date().toISOString(),
                ...productData
            };
            products.push(newProduct);
            showToast('Product added successfully!', 'success');
        }
        
        saveData();
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
        loadProducts();
    }
    
    function editProduct(productId) {
        openProductModal(productId);
    }
    
    function deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            products = products.filter(p => p.id !== productId);
            saveData();
            showToast('Product deleted successfully!', 'success');
            loadProducts();
        }
    }
    
    // ===== CATEGORIES MANAGEMENT =====
    function loadCategories() {
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;
        
        if (categories.length === 0) {
            grid.innerHTML = `
                <div class="col-12">
                    <div class="empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M3 3h7v7H3z"></path>
                            <path d="M14 3h7v7h-7z"></path>
                            <path d="M14 14h7v7h-7z"></path>
                            <path d="M3 14h7v7H3z"></path>
                        </svg>
                        <h5>No categories found</h5>
                        <p>Add your first category to organize products.</p>
                    </div>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = categories.map(category => `
            <div class="col-md-4 mb-4">
                <div class="category-card" onclick="editCategory(${category.id})">
                    <h5>${category.name}</h5>
                    <p class="text-white-50 mb-3">${category.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-white-50">${getProductCountByCategory(category.type)} products</small>
                        <div>
                            <button class="btn btn-sm btn-outline-light me-2" onclick="event.stopPropagation(); editCategory(${category.id})">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="btn btn-sm btn-outline-light" onclick="event.stopPropagation(); deleteCategory(${category.id})">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3,6 5,6 21,6"></polyline>
                                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    function getProductCountByCategory(type) {
        return products.filter(p => p.type === type).length;
    }
    
    function openCategoryModal(categoryId = null) {
        editingCategory = categoryId;
        const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
        const modalLabel = document.getElementById('categoryModalLabel');
        
        if (categoryId) {
            const category = categories.find(c => c.id === categoryId);
            if (category) {
                modalLabel.textContent = 'Edit Category';
                document.getElementById('categoryId').value = category.id;
                document.getElementById('categoryName').value = category.name;
                document.getElementById('categoryType').value = category.type;
                document.getElementById('categoryDescription').value = category.description;
            }
        } else {
            modalLabel.textContent = 'Add Category';
            document.getElementById('categoryForm').reset();
            document.getElementById('categoryId').value = '';
        }
        
        modal.show();
    }
    
    function saveCategory() {
        const form = document.getElementById('categoryForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const categoryData = {
            name: document.getElementById('categoryName').value,
            type: document.getElementById('categoryType').value,
            description: document.getElementById('categoryDescription').value
        };
        
        if (editingCategory) {
            // Update existing category
            const index = categories.findIndex(c => c.id === editingCategory);
            if (index !== -1) {
                categories[index] = { ...categories[index], ...categoryData };
                showToast('Category updated successfully!', 'success');
            }
        } else {
            // Add new category
            const newCategory = {
                id: Math.max(...categories.map(c => c.id), 0) + 1,
                ...categoryData
            };
            categories.push(newCategory);
            showToast('Category added successfully!', 'success');
        }
        
        saveData();
        bootstrap.Modal.getInstance(document.getElementById('categoryModal')).hide();
        loadCategories();
    }
    
    function editCategory(categoryId) {
        openCategoryModal(categoryId);
    }
    
    function deleteCategory(categoryId) {
        const productsInCategory = products.filter(p => p.category_id === categoryId).length;
        if (productsInCategory > 0) {
            alert(`Cannot delete category. It contains ${productsInCategory} products.`);
            return;
        }
        
        if (confirm('Are you sure you want to delete this category?')) {
            categories = categories.filter(c => c.id !== categoryId);
            saveData();
            showToast('Category deleted successfully!', 'success');
            loadCategories();
        }
    }
    
    // ===== SIZES AND COLORS MANAGEMENT =====
    function loadSizesAndColors() {
        renderSizes();
        renderColors();
    }
    
    function renderSizes() {
        const container = document.getElementById('sizesContainer');
        if (!container) return;
        
        container.innerHTML = sizes.map(size => `
            <span class="size-chip me-2 mb-2" onclick="deleteSize('${size}')">
                ${size}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ms-1">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </span>
        `).join('');
    }
    
    function renderColors() {
        const container = document.getElementById('colorsContainer');
        if (!container) return;
        
        container.innerHTML = colors.map(color => `
            <span class="color-chip me-2 mb-2" onclick="deleteColor('${color.name}')" style="--color: ${color.value}">
                <style>.color-chip[style*="${color.value}"]::before { background-color: ${color.value}; }</style>
                ${color.name}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ms-1">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </span>
        `).join('');
    }
    
    function openSizeModal() {
        const modal = new bootstrap.Modal(document.getElementById('sizeModal'));
        document.getElementById('sizeForm').reset();
        modal.show();
    }
    
    function saveSize() {
        const sizeName = document.getElementById('sizeName').value.trim();
        if (!sizeName) return;
        
        if (sizes.includes(sizeName)) {
            showToast('Size already exists!', 'error');
            return;
        }
        
        sizes.push(sizeName);
        saveData();
        showToast('Size added successfully!', 'success');
        bootstrap.Modal.getInstance(document.getElementById('sizeModal')).hide();
        renderSizes();
    }
    
    function deleteSize(sizeName) {
        if (confirm(`Are you sure you want to delete size "${sizeName}"?`)) {
            sizes = sizes.filter(s => s !== sizeName);
            saveData();
            showToast('Size deleted successfully!', 'success');
            renderSizes();
        }
    }
    
    function openColorModal() {
        const modal = new bootstrap.Modal(document.getElementById('colorModal'));
        document.getElementById('colorForm').reset();
        modal.show();
    }
    
    function saveColor() {
        const colorName = document.getElementById('colorName').value.trim();
        const colorValue = document.getElementById('colorValue').value;
        
        if (!colorName) return;
        
        if (colors.find(c => c.name.toLowerCase() === colorName.toLowerCase())) {
            showToast('Color already exists!', 'error');
            return;
        }
        
        colors.push({ name: colorName, value: colorValue });
        saveData();
        showToast('Color added successfully!', 'success');
        bootstrap.Modal.getInstance(document.getElementById('colorModal')).hide();
        renderColors();
    }
    
    function deleteColor(colorName) {
        if (confirm(`Are you sure you want to delete color "${colorName}"?`)) {
            colors = colors.filter(c => c.name !== colorName);
            saveData();
            showToast('Color deleted successfully!', 'success');
            renderColors();
        }
    }
    
    // ===== ORDERS MANAGEMENT =====
    function loadOrders() {
        applyOrderFilters();
        renderOrdersTable();
        updateOrderStats();
        renderOrdersPagination();
    }
    
    function renderOrdersTable() {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageOrders = filteredOrders.slice(startIndex, endIndex);
        
        if (pageOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5">
                        <div class="empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            </svg>
                            <h5>No orders found</h5>
                            <p>Try adjusting your filters.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = pageOrders.map(order => `
            <tr onclick="viewOrderDetails(${order.id})" style="cursor: pointer;">
                <td>
                    <div>
                        <span class="fw-bold">#${order.id}</span>
                    </div>
                </td>
                <td>
                    <div>
                        <div class="fw-medium">${order.customer_name}</div>
                        <small class="text-muted">${order.customer_email}</small>
                    </div>
                </td>
                <td>
                    <small class="text-muted">${order.items.length} item${order.items.length !== 1 ? 's' : ''}</small>
                </td>
                <td>
                    <span class="fw-bold">$${order.total.toFixed(2)}</span>
                </td>
                <td>
                    <span class="status-badge ${getOrderStatusClass(order.status)}">
                        ${capitalizeFirst(order.status)}
                    </span>
                </td>
                <td>
                    <small>${formatDate(order.created_at)}</small>
                </td>
                <td>
                    <div class="d-flex">
                        <button class="btn btn-action btn-edit" onclick="event.stopPropagation(); viewOrderDetails(${order.id})" title="View Details">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="btn btn-action btn-edit" onclick="event.stopPropagation(); updateOrderStatusQuick(${order.id})" title="Update Status">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    function applyOrderFilters() {
        const searchTerm = document.getElementById('searchOrder')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('filterOrderStatus')?.value || '';
        const paymentFilter = document.getElementById('filterPaymentStatus')?.value || '';
        const dateFilter = document.getElementById('filterDate')?.value || '';
        
        filteredOrders = orders.filter(order => {
            const matchesSearch = order.customer_name.toLowerCase().includes(searchTerm) ||
                                order.customer_email.toLowerCase().includes(searchTerm) ||
                                order.id.toString().includes(searchTerm);
            const matchesStatus = !statusFilter || order.status === statusFilter;
            const matchesPayment = !paymentFilter || order.payment_status === paymentFilter;
            const matchesDate = !dateFilter || order.created_at.startsWith(dateFilter);
            
            return matchesSearch && matchesStatus && matchesPayment && matchesDate;
        });
        
        currentPage = 1;
    }
    
    function updateOrderStats() {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
        const completedOrders = orders.filter(o => o.status === 'delivered').length;
        const totalRevenue = orders.filter(o => o.payment_status === 'paid').reduce((sum, o) => sum + o.total, 0);
        
        document.getElementById('totalOrdersCount').textContent = totalOrders;
        document.getElementById('pendingOrdersCount').textContent = pendingOrders;
        document.getElementById('completedOrdersCount').textContent = completedOrders;
        document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    }
    
    function renderOrdersPagination() {
        const pagination = document.getElementById('ordersPagination');
        if (!pagination) return;
        
        const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changeOrderPage(${currentPage - 1})">Previous</a>
            </li>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHTML += `
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="changeOrderPage(${i})">${i}</a>
                    </li>
                `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            }
        }
        
        // Next button
        paginationHTML += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changeOrderPage(${currentPage + 1})">Next</a>
            </li>
        `;
        
        pagination.innerHTML = paginationHTML;
    }
    
    function changeOrderPage(page) {
        const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderOrdersTable();
            renderOrdersPagination();
        }
    }
    
    function viewOrderDetails(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;
        
        currentOrder = order;
        const modal = new bootstrap.Modal(document.getElementById('orderModal'));
        const content = document.getElementById('orderDetailsContent');
        
        content.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-header bg-light">
                            <h6 class="mb-0">Order Information</h6>
                        </div>
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Order ID:</strong></div>
                                <div class="col-sm-8">#${order.id}</div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Status:</strong></div>
                                <div class="col-sm-8">
                                    <select class="form-select form-select-sm" id="orderStatusSelect">
                                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Payment:</strong></div>
                                <div class="col-sm-8">
                                    <span class="status-badge ${order.payment_status === 'paid' ? 'status-available' : 'status-out-of-stock'}">
                                        ${capitalizeFirst(order.payment_status)}
                                    </span>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Created:</strong></div>
                                <div class="col-sm-8">${formatDate(order.created_at)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-header bg-light">
                            <h6 class="mb-0">Customer Information</h6>
                        </div>
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Name:</strong></div>
                                <div class="col-sm-8">${order.customer_name}</div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Email:</strong></div>
                                <div class="col-sm-8">${order.customer_email}</div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Phone:</strong></div>
                                <div class="col-sm-8">${order.customer_phone}</div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Address:</strong></div>
                                <div class="col-sm-8">
                                    ${order.shipping_address.street}<br>
                                    ${order.shipping_address.district}, ${order.shipping_address.city}<br>
                                    ${order.shipping_address.postal_code}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-light">
                    <h6 class="mb-0">Order Items</h6>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map(item => `
                                    <tr>
                                        <td>${item.product_name}</td>
                                        <td>${item.size}</td>
                                        <td>${item.color}</td>
                                        <td>${item.quantity}</td>
                                        <td>$${item.price.toFixed(2)}</td>
                                        <td>$${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 offset-md-6">
                            <div class="d-flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span>$${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Tax:</span>
                                <span>$${order.tax.toFixed(2)}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Shipping:</span>
                                <span>${order.shipping === 0 ? 'Free' : '$' + order.shipping.toFixed(2)}</span>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between">
                                <strong>Total:</strong>
                                <strong>$${order.total.toFixed(2)}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.show();
    }
    
    function updateOrderStatus() {
        if (!currentOrder) return;
        
        const newStatus = document.getElementById('orderStatusSelect').value;
        const orderIndex = orders.findIndex(o => o.id === currentOrder.id);
        
        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            orders[orderIndex].updated_at = new Date().toISOString();
            saveData();
            showToast(`Order #${currentOrder.id} status updated to ${newStatus}!`, 'success');
            bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
            loadOrders();
        }
    }
    
    function updateOrderStatusQuick(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;
        
        const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        const currentIndex = statusOptions.indexOf(order.status);
        const nextStatus = statusOptions[Math.min(currentIndex + 1, statusOptions.length - 1)];
        
        if (nextStatus !== order.status) {
            const orderIndex = orders.findIndex(o => o.id === orderId);
            orders[orderIndex].status = nextStatus;
            orders[orderIndex].updated_at = new Date().toISOString();
            saveData();
            showToast(`Order #${orderId} status updated to ${nextStatus}!`, 'success');
            loadOrders();
        }
    }
    
    function resetOrderFilters() {
        document.getElementById('searchOrder').value = '';
        document.getElementById('filterOrderStatus').value = '';
        document.getElementById('filterPaymentStatus').value = '';
        document.getElementById('filterDate').value = '';
        applyOrderFilters();
        renderOrdersTable();
        renderOrdersPagination();
    }
    
    function exportOrders() {
        const dataStr = JSON.stringify(orders, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders_export.json';
        link.click();
        URL.revokeObjectURL(url);
        showToast('Orders exported successfully!', 'success');
    }
    
    // ===== CUSTOMERS MANAGEMENT =====
    function loadCustomers() {
        applyCustomerFilters();
        renderCustomersTable();
        updateCustomerStats();
        renderCustomersPagination();
    }
    
    function renderCustomersTable() {
        const tbody = document.getElementById('customersTableBody');
        if (!tbody) return;
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageCustomers = filteredCustomers.slice(startIndex, endIndex);
        
        if (pageCustomers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5">
                        <div class="empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <h5>No customers found</h5>
                            <p>Try adjusting your filters.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = pageCustomers.map(customer => `
            <tr onclick="viewCustomerDetails(${customer.id})" style="cursor: pointer;">
                <td>
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="
                            width: 40px; 
                            height: 40px; 
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            font-weight: 600;
                            font-size: 14px;
                        ">
                            ${customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div class="fw-medium">${customer.name}</div>
                            <small class="text-muted">ID: ${customer.id}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <div>
                        <div class="fw-medium">${customer.email}</div>
                        <small class="text-muted">${customer.phone}</small>
                    </div>
                </td>
                <td>
                    <span class="fw-bold">${customer.orders_count}</span>
                </td>
                <td>
                    <span class="fw-bold">$${customer.total_spent.toFixed(2)}</span>
                </td>
                <td>
                    <small>${formatDate(customer.created_at)}</small>
                </td>
                <td>
                    <span class="status-badge ${customer.status === 'active' ? 'status-available' : 'status-out-of-stock'}">
                        ${capitalizeFirst(customer.status)}
                    </span>
                </td>
                <td>
                    <div class="d-flex">
                        <button class="btn btn-action btn-edit" onclick="event.stopPropagation(); viewCustomerDetails(${customer.id})" title="View Details">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    function applyCustomerFilters() {
        const searchTerm = document.getElementById('searchCustomer')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('filterCustomerStatus')?.value || '';
        const sortBy = document.getElementById('sortCustomers')?.value || 'name';
        
        filteredCustomers = customers.filter(customer => {
            const matchesSearch = customer.name.toLowerCase().includes(searchTerm) ||
                                customer.email.toLowerCase().includes(searchTerm) ||
                                customer.phone.includes(searchTerm);
            const matchesStatus = !statusFilter || customer.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
        
        // Sort customers
        filteredCustomers.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'date':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'orders':
                    return b.orders_count - a.orders_count;
                case 'spent':
                    return b.total_spent - a.total_spent;
                default:
                    return 0;
            }
        });
        
        currentPage = 1;
    }
    
    function updateCustomerStats() {
        const totalCustomers = customers.length;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const newCustomers = customers.filter(c => {
            const joinDate = new Date(c.created_at);
            return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
        }).length;
        const activeCustomers = customers.filter(c => c.status === 'active').length;
        
        document.getElementById('totalCustomersCount').textContent = totalCustomers;
        document.getElementById('newCustomersCount').textContent = newCustomers;
        document.getElementById('activeCustomersCount').textContent = activeCustomers;
    }
    
    function renderCustomersPagination() {
        const pagination = document.getElementById('customersPagination');
        if (!pagination) return;
        
        const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changeCustomerPage(${currentPage - 1})">Previous</a>
            </li>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHTML += `
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="changeCustomerPage(${i})">${i}</a>
                    </li>
                `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            }
        }
        
        // Next button
        paginationHTML += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changeCustomerPage(${currentPage + 1})">Next</a>
            </li>
        `;
        
        pagination.innerHTML = paginationHTML;
    }
    
    function changeCustomerPage(page) {
        const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderCustomersTable();
            renderCustomersPagination();
        }
    }
    
    function viewCustomerDetails(customerId) {
        const customer = customers.find(c => c.id === customerId);
        if (!customer) return;
        
        const customerOrders = orders.filter(o => o.customer_id === customerId);
        const modal = new bootstrap.Modal(document.getElementById('customerModal'));
        const content = document.getElementById('customerDetailsContent');
        
        content.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-header bg-light">
                            <h6 class="mb-0">Customer Information</h6>
                        </div>
                        <div class="card-body">
                            <div class="text-center mb-4">
                                <div class="rounded-circle d-inline-flex align-items-center justify-content-center" style="
                                    width: 80px; 
                                    height: 80px; 
                                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                    color: white;
                                    font-weight: 600;
                                    font-size: 24px;
                                ">
                                    ${customer.name.charAt(0).toUpperCase()}
                                </div>
                                <h5 class="mt-3 mb-1">${customer.name}</h5>
                                <span class="status-badge ${customer.status === 'active' ? 'status-available' : 'status-out-of-stock'}">
                                    ${capitalizeFirst(customer.status)}
                                </span>
                            </div>
                            
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Email:</strong></div>
                                <div class="col-sm-8">${customer.email}</div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Phone:</strong></div>
                                <div class="col-sm-8">${customer.phone}</div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Address:</strong></div>
                                <div class="col-sm-8">
                                    ${customer.address.street}<br>
                                    ${customer.address.district}, ${customer.address.city}<br>
                                    ${customer.address.postal_code}
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4"><strong>Joined:</strong></div>
                                <div class="col-sm-8">${formatDate(customer.created_at)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-header bg-light">
                            <h6 class="mb-0">Purchase Statistics</h6>
                        </div>
                        <div class="card-body">
                            <div class="row text-center">
                                <div class="col-6 mb-3">
                                    <div class="h4 fw-bold text-primary mb-1">${customer.orders_count}</div>
                                    <small class="text-muted">Total Orders</small>
                                </div>
                                <div class="col-6 mb-3">
                                    <div class="h4 fw-bold text-success mb-1">$${customer.total_spent.toFixed(2)}</div>
                                    <small class="text-muted">Total Spent</small>
                                </div>
                                <div class="col-6">
                                    <div class="h4 fw-bold text-info mb-1">$${customer.orders_count > 0 ? (customer.total_spent / customer.orders_count).toFixed(2) : '0.00'}</div>
                                    <small class="text-muted">Average Order</small>
                                </div>
                                <div class="col-6">
                                    <div class="h4 fw-bold text-warning mb-1">${customer.last_order_date ? formatDate(customer.last_order_date) : 'Never'}</div>
                                    <small class="text-muted">Last Order</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-light">
                    <h6 class="mb-0">Order History (${customerOrders.length} orders)</h6>
                </div>
                <div class="card-body p-0">
                    ${customerOrders.length > 0 ? `
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${customerOrders.map(order => `
                                        <tr>
                                            <td>#${order.id}</td>
                                            <td>${formatDate(order.created_at)}</td>
                                            <td>${order.items.length} items</td>
                                            <td>$${order.total.toFixed(2)}</td>
                                            <td>
                                                <span class="status-badge ${getOrderStatusClass(order.status)}">
                                                    ${capitalizeFirst(order.status)}
                                                </span>
                                            </td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary" onclick="viewOrderDetails(${order.id})">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <div class="text-center py-4">
                            <p class="text-muted">No orders yet</p>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        modal.show();
    }
    
    function viewCustomerOrders(customerId) {
        // Switch to orders tab and filter by customer
        switchTab('orders');
        document.querySelector('.navbar-nav .nav-link[data-tab="orders"]').classList.add('active');
        document.querySelectorAll('.navbar-nav .nav-link:not([data-tab="orders"])').forEach(link => link.classList.remove('active'));
        
        // Filter orders by customer email
        const customer = customers.find(c => c.id === customerId);
        if (customer) {
            setTimeout(() => {
                document.getElementById('searchOrder').value = customer.email;
                applyOrderFilters();
                renderOrdersTable();
                renderOrdersPagination();
            }, 100);
        }
    }
    
    function resetCustomerFilters() {
        document.getElementById('searchCustomer').value = '';
        document.getElementById('filterCustomerStatus').value = '';
        document.getElementById('sortCustomers').value = 'name';
        applyCustomerFilters();
        renderCustomersTable();
        renderCustomersPagination();
    }
    
    function exportCustomers() {
        const dataStr = JSON.stringify(customers, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'customers_export.json';
        link.click();
        URL.revokeObjectURL(url);
        showToast('Customers exported successfully!', 'success');
    }
    
    // ===== UTILITY FUNCTIONS =====
    function saveData() {
        localStorage.setItem('admin_products', JSON.stringify(products));
        localStorage.setItem('admin_categories', JSON.stringify(categories));
        localStorage.setItem('admin_sizes', JSON.stringify(sizes));
        localStorage.setItem('admin_colors', JSON.stringify(colors));
        localStorage.setItem('admin_orders', JSON.stringify(orders));
        localStorage.setItem('admin_customers', JSON.stringify(customers));
    }
    
    function resetFilters() {
        document.getElementById('searchProduct').value = '';
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterStatus').value = '';
        applyFilters();
        renderProductsTable();
        renderPagination();
    }
    
    function exportProducts() {
        const dataStr = JSON.stringify(products, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'products_export.json';
        link.click();
        URL.revokeObjectURL(url);
        showToast('Products exported successfully!', 'success');
    }
    
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <div class="rounded me-2" style="width: 12px; height: 12px; background-color: ${getToastColor(type)};"></div>
                    <strong class="me-auto">Admin Panel</strong>
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
    
    function getOrderStatusClass(status) {
        const statusClasses = {
            'pending': 'status-out-of-stock',
            'processing': 'status-out-of-stock', 
            'shipped': 'status-available',
            'delivered': 'status-available',
            'cancelled': 'status-out-of-stock'
        };
        return statusClasses[status] || 'status-out-of-stock';
    }
    
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    // ===== EVENT LISTENERS =====
    function initializeEventListeners() {
        // Search and filter
        const searchInput = document.getElementById('searchProduct');
        const categoryFilter = document.getElementById('filterCategory');
        const statusFilter = document.getElementById('filterStatus');
        
        if (searchInput) {
            searchInput.addEventListener('input', debounce(() => {
                applyFilters();
                renderProductsTable();
                renderPagination();
            }, 300));
        }
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                applyFilters();
                renderProductsTable();
                renderPagination();
            });
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', () => {
                applyFilters();
                renderProductsTable();
                renderPagination();
            });
        }
        
        // Select all checkbox
        const selectAll = document.getElementById('selectAll');
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('#productsTableBody input[type="checkbox"]');
                checkboxes.forEach(cb => cb.checked = this.checked);
            });
        }
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ===== GLOBAL FUNCTIONS =====
    window.openProductModal = openProductModal;
    window.saveProduct = saveProduct;
    window.editProduct = editProduct;
    window.deleteProduct = deleteProduct;
    window.changePage = changePage;
    window.resetFilters = resetFilters;
    window.exportProducts = exportProducts;
    
    window.openCategoryModal = openCategoryModal;
    window.saveCategory = saveCategory;
    window.editCategory = editCategory;
    window.deleteCategory = deleteCategory;
    
    window.openSizeModal = openSizeModal;
    window.saveSize = saveSize;
    window.deleteSize = deleteSize;
    window.openColorModal = openColorModal;
    window.saveColor = saveColor;
    window.deleteColor = deleteColor;
    
    window.loadOrders = loadOrders;
    window.resetOrderFilters = resetOrderFilters;
    window.exportOrders = exportOrders;
    window.updateOrderStatus = updateOrderStatus;
    window.updateOrderStatusQuick = updateOrderStatusQuick;
    window.viewOrderDetails = viewOrderDetails;
    window.changeOrderPage = changeOrderPage;

    window.loadCustomers = loadCustomers;
    window.resetCustomerFilters = resetCustomerFilters;
    window.exportCustomers = exportCustomers;
    window.viewCustomerDetails = viewCustomerDetails;
    window.changeCustomerPage = changeCustomerPage;
    
    // ===== INITIALIZATION =====
    function initialize() {
        console.log('🔧 Admin Panel initializing...');
        initializeTabs();
        initializeEventListeners();
        
        // Load initial tab (products)
        loadProducts();
        
        console.log('✅ Admin Panel initialized successfully');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();

// Admin Dashboard JavaScript

// ===== GLOBAL VARIABLES =====
let products = [];
let orders = [];
let customers = [];
let categories = [];
let sizes = [];
let colors = [];
let filteredProducts = [];
let filteredOrders = [];
let filteredCustomers = [];
let currentPage = 1;
const itemsPerPage = 10;

// Chart instances
let revenueChart = null;
let orderStatusChart = null;
let customerGrowthChart = null;

// Dashboard data
let dashboardData = {
    period: 30,
    chartType: 'daily'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    initializeSampleData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load dashboard by default
    switchTab('dashboard');
    
    // Initialize dashboard
    initializeDashboard();
    
    showToast('Admin dashboard loaded successfully!', 'success');
});

// ===== DASHBOARD FUNCTIONS =====
function initializeDashboard() {
    updateDashboardStats();
    initializeCharts();
    updateTopProducts();
    updateRecentOrders();
    
    // Setup dashboard period change listener
    document.getElementById('dashboardPeriod').addEventListener('change', function() {
        dashboardData.period = parseInt(this.value);
        refreshDashboard();
    });
}

function updateDashboardStats() {
    const period = dashboardData.period;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - period);
    
    // Filter data by period
    const periodOrders = orders.filter(order => new Date(order.created_at) >= cutoffDate);
    const periodCustomers = customers.filter(customer => new Date(customer.created_at) >= cutoffDate);
    
    // Calculate revenue
    const totalRevenue = periodOrders.reduce((sum, order) => sum + order.total, 0);
    const previousPeriodOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at);
        const previousCutoff = new Date();
        previousCutoff.setDate(previousCutoff.getDate() - (period * 2));
        return orderDate >= previousCutoff && orderDate < cutoffDate;
    });
    const previousRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.total, 0);
    const revenueChange = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue * 100) : 0;
    
    // Calculate orders
    const totalOrders = periodOrders.length;
    const ordersChange = previousPeriodOrders.length > 0 ? 
        ((totalOrders - previousPeriodOrders.length) / previousPeriodOrders.length * 100) : 0;
    
    // Calculate customers
    const newCustomers = periodCustomers.length;
    const previousPeriodCustomers = customers.filter(customer => {
        const joinDate = new Date(customer.created_at);
        const previousCutoff = new Date();
        previousCutoff.setDate(previousCutoff.getDate() - (period * 2));
        return joinDate >= previousCutoff && joinDate < cutoffDate;
    });
    const customersChange = previousPeriodCustomers.length > 0 ? 
        ((newCustomers - previousPeriodCustomers.length) / previousPeriodCustomers.length * 100) : 0;
    
    // Update UI
    document.getElementById('dashboardRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
    document.getElementById('dashboardOrders').textContent = totalOrders;
    document.getElementById('dashboardCustomers').textContent = newCustomers;
    document.getElementById('dashboardProducts').textContent = products.length;
    
    // Update change indicators
    updateChangeIndicator('revenueChange', revenueChange);
    updateChangeIndicator('ordersChange', ordersChange);
    updateChangeIndicator('customersChange', customersChange);
    
    // Set products change to static value
    document.getElementById('productsChange').textContent = '+2 new';
}

function updateChangeIndicator(elementId, change) {
    const element = document.getElementById(elementId);
    const absChange = Math.abs(change);
    
    element.textContent = `${change >= 0 ? '+' : '-'}${absChange.toFixed(1)}%`;
    element.className = change >= 0 ? 'change-positive' : 'change-negative';
}

function initializeCharts() {
    initializeRevenueChart();
    initializeOrderStatusChart();
    initializeCustomerGrowthChart();
}

function initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    // Generate revenue data based on period and chart type
    const revenueData = generateRevenueData();
    
    if (revenueChart) {
        revenueChart.destroy();
    }
    
    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: revenueData.labels,
            datasets: [{
                label: 'Revenue',
                data: revenueData.data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Revenue: $${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initializeOrderStatusChart() {
    const ctx = document.getElementById('orderStatusChart');
    if (!ctx) return;
    
    // Calculate order status distribution
    const statusCounts = {
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length
    };
    
    const totalOrders = orders.length;
    const completedOrders = statusCounts.delivered;
    const processingOrders = statusCounts.pending + statusCounts.processing + statusCounts.shipped;
    
    // Update percentages
    document.getElementById('completedOrdersPercent').textContent = 
        totalOrders > 0 ? `${Math.round((completedOrders / totalOrders) * 100)}%` : '0%';
    document.getElementById('pendingOrdersPercent').textContent = 
        totalOrders > 0 ? `${Math.round((processingOrders / totalOrders) * 100)}%` : '0%';
    
    if (orderStatusChart) {
        orderStatusChart.destroy();
    }
    
    orderStatusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled'],
            datasets: [{
                data: [statusCounts.delivered, statusCounts.shipped, statusCounts.processing, statusCounts.pending, statusCounts.cancelled],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444',
                    '#6b7280'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const percentage = totalOrders > 0 ? 
                                Math.round((context.parsed / totalOrders) * 100) : 0;
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function initializeCustomerGrowthChart() {
    const ctx = document.getElementById('customerGrowthChart');
    if (!ctx) return;
    
    // Generate customer growth data
    const growthData = generateCustomerGrowthData();
    
    if (customerGrowthChart) {
        customerGrowthChart.destroy();
    }
    
    customerGrowthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: growthData.labels,
            datasets: [{
                label: 'New Customers',
                data: growthData.data,
                backgroundColor: 'rgba(79, 172, 254, 0.8)',
                borderColor: '#4facfe',
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function generateRevenueData() {
    const period = dashboardData.period;
    const chartType = dashboardData.chartType;
    const labels = [];
    const data = [];
    
    if (chartType === 'daily') {
        // Generate daily data for the last N days
        for (let i = period - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            
            // Calculate revenue for this day
            const dayRevenue = orders
                .filter(order => {
                    const orderDate = new Date(order.created_at);
                    return orderDate.toDateString() === date.toDateString();
                })
                .reduce((sum, order) => sum + order.total, 0);
            
            // Add some variation for demo purposes
            const variation = (Math.random() - 0.5) * 200;
            data.push(Math.max(0, dayRevenue + variation));
        }
    } else if (chartType === 'weekly') {
        // Generate weekly data
        const weeks = Math.ceil(period / 7);
        for (let i = weeks - 1; i >= 0; i--) {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - (i * 7) - 6);
            const endDate = new Date();
            endDate.setDate(endDate.getDate() - (i * 7));
            
            labels.push(`Week ${weeks - i}`);
            
            const weekRevenue = orders
                .filter(order => {
                    const orderDate = new Date(order.created_at);
                    return orderDate >= startDate && orderDate <= endDate;
                })
                .reduce((sum, order) => sum + order.total, 0);
            
            const variation = (Math.random() - 0.5) * 500;
            data.push(Math.max(0, weekRevenue + variation));
        }
    } else if (chartType === 'monthly') {
        // Generate monthly data
        const months = Math.ceil(period / 30);
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
            
            const monthRevenue = orders
                .filter(order => {
                    const orderDate = new Date(order.created_at);
                    return orderDate.getMonth() === date.getMonth() && 
                           orderDate.getFullYear() === date.getFullYear();
                })
                .reduce((sum, order) => sum + order.total, 0);
            
            const variation = (Math.random() - 0.5) * 1000;
            data.push(Math.max(0, monthRevenue + variation));
        }
    }
    
    return { labels, data };
}

function generateCustomerGrowthData() {
    const labels = [];
    const data = [];
    
    // Generate data for the last 12 months
    for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
        
        // Calculate new customers for this month
        const monthCustomers = customers.filter(customer => {
            const joinDate = new Date(customer.created_at);
            return joinDate.getMonth() === date.getMonth() && 
                   joinDate.getFullYear() === date.getFullYear();
        }).length;
        
        // Add some variation for demo purposes
        const baseValue = monthCustomers > 0 ? monthCustomers : Math.floor(Math.random() * 10) + 2;
        data.push(baseValue);
    }
    
    return { labels, data };
}

function updateRevenueChart(type) {
    dashboardData.chartType = type;
    initializeRevenueChart();
}

function updateTopProducts() {
    const tableBody = document.getElementById('topProductsTable');
    if (!tableBody) return;
    
    // Calculate product sales from orders
    const productSales = {};
    
    orders.forEach(order => {
        order.items.forEach(item => {
            if (!productSales[item.product_id]) {
                productSales[item.product_id] = {
                    sales: 0,
                    revenue: 0,
                    product: products.find(p => p.id === item.product_id)
                };
            }
            productSales[item.product_id].sales += item.quantity;
            productSales[item.product_id].revenue += item.price * item.quantity;
        });
    });
    
    // Sort by revenue and get top 5
    const topProducts = Object.values(productSales)
        .filter(item => item.product)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
    
    if (topProducts.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-muted py-4">No sales data available</td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = topProducts.map(item => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="../${item.product.image}" alt="${item.product.name}" 
                         class="product-image me-3" style="width: 40px; height: 40px;">
                    <div>
                        <div class="fw-semibold">${item.product.name}</div>
                        <small class="text-muted">${capitalizeFirst(item.product.category)}</small>
                    </div>
                </div>
            </td>
            <td>
                <span class="fw-semibold">${item.sales}</span>
                <small class="text-muted d-block">units sold</small>
            </td>
            <td>
                <span class="fw-semibold text-success">$${item.revenue.toFixed(2)}</span>
            </td>
        </tr>
    `).join('');
}

function updateRecentOrders() {
    const container = document.getElementById('recentOrdersList');
    if (!container) return;
    
    // Get 5 most recent orders
    const recentOrders = orders
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
    
    if (recentOrders.length === 0) {
        container.innerHTML = `
            <div class="list-group-item text-center text-muted py-4">
                No recent orders
            </div>
        `;
        return;
    }
    
    container.innerHTML = recentOrders.map(order => {
        const customer = customers.find(c => c.id === order.customer_id);
        return `
            <div class="list-group-item list-group-item-action">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="order-info">
                        <div class="order-id">#${order.id}</div>
                        <div class="order-customer">${customer ? customer.name : 'Unknown Customer'}</div>
                        <small class="text-muted">${formatDate(order.created_at)}</small>
                    </div>
                    <div class="text-end">
                        <div class="order-amount">$${order.total.toFixed(2)}</div>
                        <span class="status-badge ${getOrderStatusClass(order.status)} order-status">
                            ${capitalizeFirst(order.status)}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function refreshDashboard() {
    updateDashboardStats();
    initializeCharts();
    updateTopProducts();
    updateRecentOrders();
    showToast('Dashboard refreshed!', 'success');
}

// ===== EXISTING CODE CONTINUES =====