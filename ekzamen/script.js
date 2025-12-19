const input = document.getElementById('num');

input.addEventListener('blur', function() {
    const value = input.value;
    
    // Обчислення суми цифр
    let sum = 0;
    
    for (let i = 0; i < value.length; i++) {
        const digit = parseInt(value[i]);
        if (!isNaN(digit)) {
            sum += digit;
        }
    }
    
    // Створення елемента <p> і запис результату
    const p = document.createElement('p');
    p.textContent = `Сума цифр: ${sum}`;
    document.body.appendChild(p);
});