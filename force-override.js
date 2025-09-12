// Force Override Script - Đảm bảo sử dụng design mới
(function() {
    'use strict';
    
    // Xóa tất cả products hiện tại
    function clearProducts() {
        const grid = document.getElementById('productsGrid');
        if (grid) {
            grid.innerHTML = '';
        }
    }
    
    // Force render với design mới
    function forceRenderNewDesign() {
        const grid = document.getElementById('productsGrid');
        if (grid && typeof createProductDetailCard === 'function' && typeof sampleProducts !== 'undefined') {
            grid.innerHTML = sampleProducts.map(product => 
                `<div class="col">${createProductDetailCard(product)}</div>`
            ).join('');
            console.log('✅ Successfully rendered', sampleProducts.length, 'products with new design');
        } else {
            console.log('❌ Failed to render - missing dependencies');
        }
    }
    
    // Override window.renderProducts hoàn toàn
    Object.defineProperty(window, 'renderProducts', {
        value: forceRenderNewDesign,
        writable: false,
        configurable: false
    });
    
    // Chạy ngay khi DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(forceRenderNewDesign, 200);
        });
    } else {
        setTimeout(forceRenderNewDesign, 200);
    }
    
    // Chạy lại sau 500ms để chắc chắn override mọi script khác
    setTimeout(function() {
        clearProducts();
        forceRenderNewDesign();
    }, 500);
    
    // Chạy lại sau 1s để chắc chắn hoàn toàn
    setTimeout(function() {
        clearProducts(); 
        forceRenderNewDesign();
    }, 1000);
    
    console.log('🚀 Force override script loaded - sẽ áp dụng design mới trong 1 giây');
})();