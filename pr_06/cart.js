// Ініціалізація сторінки корзини
function init() {
    displayCart();
    updateCartCount();
}

// Відображення товарів у корзині
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Корзина порожня</h3>
                <p>Додайте товари до корзини, щоб продовжити покупки</p>
            </div>
        `;
        document.getElementById('totalPrice').textContent = '0';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="cart-item-quantity">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity} шт</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
            </div>
            <div class="cart-item-price">${itemTotal} грн</div>
            <button class="cart-item-remove" onclick="removeItem(${index})">Видалити</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    document.getElementById('totalPrice').textContent = total;
}

// Збільшити кількість товару
function increaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Зменшити кількість товару
function decreaseQuantity(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    } else {
        removeItem(index);
    }
}

// Видалити товар з корзини
function removeItem(index) {
    if (confirm('Ви впевнені, що хочете видалити цей товар?')) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

// Оновити лічильник корзини
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length;
    document.getElementById('cartCount').textContent = count;
}

// Відкрити корзину (перезавантажити сторінку)
function openCart() {
    location.reload();
}

// Оформити замовлення
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Корзина порожня!');
        return;
    }
    
    document.getElementById('checkoutModal').style.display = 'block';
}

// Закрити модальне вікно оплати та очистити корзину
function closeCheckout() {
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

// Закрити модальне вікно при кліку поза ним
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Запуск при завантаженні сторінки
init();