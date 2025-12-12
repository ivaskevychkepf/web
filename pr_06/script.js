// Масив товарів
const products = [
    {
        id: 1,
        name: "Моторна олива 5W-40",
        description: "Синтетична моторна олива преміум класу",
        price: 450,
        image: "🛢️"
    },
    {
        id: 2,
        name: "Гальмівні колодки",
        description: "Передні гальмівні колодки для легкових автомобілів",
        price: 850,
        image: "🔧"
    },
    {
        id: 3,
        name: "Повітряний фільтр",
        description: "Високоякісний повітряний фільтр двигуна",
        price: 320,
        image: "🌬️"
    },
    {
        id: 4,
        name: "Акумулятор 60Ah",
        description: "Автомобільний акумулятор 12V 60Ah",
        price: 2500,
        image: "🔋"
    },
    {
        id: 5,
        name: "Свічки запалювання",
        description: "Комплект свічок запалювання (4 шт)",
        price: 380,
        image: "⚡"
    },
    {
        id: 6,
        name: "Амортизатор передній",
        description: "Газомаслянний амортизатор передньої підвіски",
        price: 1200,
        image: "🔩"
    },
    {
        id: 7,
        name: "Диски гальмівні",
        description: "Передні гальмівні диски, комплект 2 шт",
        price: 1800,
        image: "⚙️"
    },
    {
        id: 8,
        name: "Паливний фільтр",
        description: "Фільтр очищення палива",
        price: 250,
        image: "⛽"
    }
];

let selectedProduct = null;

// Ініціалізація сторінки
function init() {
    displayProducts();
    updateCartCount();
}

// Відображення товарів
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${product.price} грн</div>
            <button class="btn btn-primary" onclick="showQuantityModal(${product.id})">
                Додати у корзину
            </button>
        `;
        grid.appendChild(card);
    });
}

// Показати модальне вікно для вибору кількості
function showQuantityModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    document.getElementById('quantityInput').value = 1;
    document.getElementById('quantityModal').style.display = 'block';
}

// Додати товар до корзини
function addToCart() {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    
    if (quantity < 1) {
        alert('Кількість повинна бути більше 0');
        return;
    }
    
    // Отримуємо корзину з localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Перевіряємо чи товар вже є в корзині
    const existingItem = cart.find(item => item.id === selectedProduct.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: quantity
        });
    }
    
    // Зберігаємо корзину
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Закриваємо модальне вікно кількості
    closeModal('quantityModal');
    
    // Показуємо підтвердження
    document.getElementById('confirmModal').style.display = 'block';
    
    // Оновлюємо лічильник
    updateCartCount();
}

// Оновити лічильник корзини
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length; // Кількість найменувань
    document.getElementById('cartCount').textContent = count;
}

// Відкрити корзину
function openCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        document.getElementById('emptyCartModal').style.display = 'block';
    } else {
        window.location.href = 'cart.html';
    }
}

// Перейти до корзини
function goToCart() {
    window.location.href = 'cart.html';
}

// Закрити модальне вікно
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
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