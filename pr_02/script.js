// ===== ЗАВДАННЯ 1: Годинник з додаванням нулів =====
function addZero(value) {
    return value < 10 ? '0' + value : value;
}

function updateClock1() {
    const now = new Date();
    const hours = addZero(now.getHours());
    const minutes = addZero(now.getMinutes());
    const seconds = addZero(now.getSeconds());
    
    const timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('clock1').value = timeString;
    
    setTimeout(updateClock1, 1000);
}

// ===== ЗАВДАННЯ 2.2: Годинник з оновленням кожні 5 сек і закриттям через 30 сек =====
let secondsRemaining = 30;

function updateClock2() {
    const now = new Date();
    const hours = addZero(now.getHours());
    const minutes = addZero(now.getMinutes());
    const seconds = addZero(now.getSeconds());
    
    const timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('clock2').value = timeString;
}

function startClock2() {
    // Оновлюємо час одразу
    updateClock2();
    
    // Оновлення часу кожні 5 секунд
    const clockInterval = setInterval(updateClock2, 5000);
    
    // Зворотній відлік
    const countdownInterval = setInterval(function() {
        secondsRemaining--;
        document.getElementById('countdown').textContent = secondsRemaining;
        
        if (secondsRemaining <= 0) {
            clearInterval(clockInterval);
            clearInterval(countdownInterval);
            
            // Спроба закрити вікно
            alert('30 секунд минуло! Сторінка буде закрита.');
            window.close();
            
            // Якщо window.close() не спрацював (браузер блокує)
            // показуємо повідомлення
            setTimeout(function() {
                document.body.innerHTML = '<div style="text-align:center; padding:50px; font-size:2em;">Час вичерпано! Ви можете закрити це вікно вручну.</div>';
            }, 100);
        }
    }, 1000);
}

// ===== ЗАВДАННЯ 3А: Друкарська машинка через setInterval() =====
function typewriterInterval() {
    const text = document.getElementById('userText1').value;
    if (!text) {
        alert('Введіть текст для друку!');
        return;
    }
    
    const output = document.getElementById('outputInterval');
    output.textContent = '';
    output.classList.remove('finished');
    
    let index = 0;
    
    const interval = setInterval(function() {
        if (index < text.length) {
            output.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            output.classList.add('finished');
        }
    }, 100); // Друкуємо по 1 символу кожні 100 мс
}

// ===== ЗАВДАННЯ 3Б: Друкарська машинка через setTimeout() =====
function typewriterTimeout() {
    const text = document.getElementById('userText2').value;
    if (!text) {
        alert('Введіть текст для друку!');
        return;
    }
    
    const output = document.getElementById('outputTimeout');
    output.textContent = '';
    output.classList.remove('finished');
    
    let index = 0;
    
    function typeNextChar() {
        if (index < text.length) {
            output.textContent += text[index];
            index++;
            setTimeout(typeNextChar, 100); // Друкуємо по 1 символу через 100 мс
        } else {
            output.classList.add('finished');
        }
    }
    
    typeNextChar();
}

// ===== ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ =====
document.addEventListener('DOMContentLoaded', function() {
    // Запускаємо годинник 1
    updateClock1();
    
    // Запускаємо годинник 2
    startClock2();
    
    // Обробники для друкарської машинки
    document.getElementById('startInterval').addEventListener('click', typewriterInterval);
    document.getElementById('startTimeout').addEventListener('click', typewriterTimeout);
});