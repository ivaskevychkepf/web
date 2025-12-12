// Елементи DOM
const loader = document.getElementById('loader');
const result = document.getElementById('result');
const checkBtn = document.getElementById('checkBtn');
const randomBtn = document.getElementById('randomBtn');
const numberInput = document.getElementById('numberInput');

// Функції для керування лоадером та результатом
function showLoader() {
    loader.style.display = 'block';
    result.style.display = 'none';
    result.className = 'result';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showResult(message, type = 'info') {
    result.textContent = message;
    result.className = `result ${type} show`;
    result.style.display = 'block';
}

// ============================================
// ЗАВДАННЯ 2: Перевірка числа
// ============================================

/**
 * Функція checkNumber(num) - повертає Promise
 * Якщо num > 10 - виконується успішно
 * Інакше - відхиляється
 */
function checkNumber(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num > 10) {
                resolve(`✅ Число ${num} більше 10`);
            } else {
                reject(`❌ Число ${num} менше або дорівнює 10`);
            }
        }, 1000); // Затримка 1 секунда для демонстрації
    });
}

// Обробник для кнопки перевірки числа
checkBtn.addEventListener('click', function() {
    const num = parseFloat(numberInput.value);
    
    if (isNaN(num)) {
        showResult('⚠️ Будь ласка, введіть коректне число!', 'error');
        return;
    }
    
    // Показуємо лоадер
    showLoader();
    
    // Викликаємо checkNumber з обробкою через then і catch
    checkNumber(num)
        .then(message => {
            // Успіх - число більше 10
            hideLoader();
            showResult(message, 'success');
        })
        .catch(error => {
            // Помилка - число менше або дорівнює 10
            hideLoader();
            showResult(error, 'error');
        });
});

// Додаємо можливість натискання Enter в полі вводу
numberInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkBtn.click();
    }
});

// ============================================
// ЗАВДАННЯ 3: Випадкове число
// ============================================

/**
 * Функція randomNumber() - повертає Promise
 * Виконується через випадковий час (1-3 секунди)
 * Повертає випадкове число від 1 до 100
 */
function randomNumber() {
    return new Promise((resolve) => {
        // Випадковий час від 1000 до 3000 мс (1-3 секунди)
        const randomTime = Math.floor(Math.random() * 2000) + 1000;
        
        // Запам'ятовуємо час початку
        const startTime = Date.now();
        
        setTimeout(() => {
            // Випадкове число від 1 до 100
            const randomNum = Math.floor(Math.random() * 100) + 1;
            
            // Розраховуємо фактичний час виконання
            const executionTime = Date.now() - startTime;
            
            resolve({
                number: randomNum,
                time: executionTime
            });
        }, randomTime);
    });
}

// Обробник для кнопки генерації випадкового числа
randomBtn.addEventListener('click', function() {
    // Показуємо лоадер
    showLoader();
    
    // Викликаємо randomNumber та обробляємо результат
    randomNumber()
        .then(data => {
            // Ховаємо лоадер
            hideLoader();
            
            // Формуємо повідомлення з результатом
            const message = `🎲 Випадкове число: ${data.number}\n⏱️ Час виконання: ${data.time} мс (${(data.time / 1000).toFixed(2)} секунд)`;
            
            showResult(message, 'info');
        });
});

// ============================================
// ТЕСТУВАННЯ ЗАВДАННЯ 2 з різними значеннями
// ============================================

// Розкоментуйте для автоматичного тестування при завантаженні
/*
console.log('=== Тестування checkNumber ===');

// Тест 1: число більше 10
checkNumber(15)
    .then(msg => console.log('Тест 1:', msg))
    .catch(err => console.log('Тест 1:', err));

// Тест 2: число менше 10
checkNumber(5)
    .then(msg => console.log('Тест 2:', msg))
    .catch(err => console.log('Тест 2:', err));

// Тест 3: число дорівнює 10
checkNumber(10)
    .then(msg => console.log('Тест 3:', msg))
    .catch(err => console.log('Тест 3:', err));

// Тест 4: від'ємне число
checkNumber(-5)
    .then(msg => console.log('Тест 4:', msg))
    .catch(err => console.log('Тест 4:', err));
*/