// Отримання всіх необхідних елементів по їх id
const rtl = document.getElementById('rtl');
const rtr = document.getElementById('rtr');
const rbr = document.getElementById('rbr');
const rbl = document.getElementById('rbl');
const ttl = document.getElementById('ttl');
const ttr = document.getElementById('ttr');
const tbr = document.getElementById('tbr');
const tbl = document.getElementById('tbl');
const fontStyle = document.getElementById('fontStyle');
const letterSpacing = document.getElementById('letterSpacing');
const letterSpacingValue = document.getElementById('letterSpacingValue');
const block = document.getElementById('block');
const cssOutput = document.getElementById('cssOutput');

// Функція генерації CSS
function generate() {
    // Додаємо значення з повзунків у кожний input
    ttl.value = rtl.value;
    ttr.value = rtr.value;
    tbr.value = rbr.value;
    tbl.value = rbl.value;
    letterSpacingValue.value = letterSpacing.value;

    // Застосування border-radius до блоку
    block.style.borderRadius = rtl.value + "px " + rtr.value + "px " + rbr.value + "px " + rbl.value + "px";
    
    // Застосування font-style до блоку
    block.style.fontStyle = fontStyle.value;
    
    // Застосування letter-spacing до блоку
    block.style.letterSpacing = letterSpacing.value + "px";

    // Генерація CSS коду для виведення в textarea
    let cssCode = `.element {\n`;
    cssCode += `  border-radius: ${rtl.value}px ${rtr.value}px ${rbr.value}px ${rbl.value}px;\n`;
    cssCode += `  font-style: ${fontStyle.value};\n`;
    cssCode += `  letter-spacing: ${letterSpacing.value}px;\n`;
    cssCode += `}`;

    // Виведення CSS коду в textarea
    cssOutput.value = cssCode;
}

// Функція копіювання CSS коду в буфер обміну
function copyCss() {
    // Вибір тексту в textarea
    cssOutput.select();
    
    // Копіювання в буфер обміну
    document.execCommand('copy');
    
    // Зміна тексту кнопки для підтвердження копіювання
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✅ Скопійовано!';
    btn.style.background = '#28a745';
    
    // Повернення початкового тексту кнопки через 2 секунди
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '#667eea';
    }, 2000);
}

// Ініціалізація при завантаженні сторінки
window.onload = function() {
    generate();
};