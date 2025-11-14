// ===== ТЕОРЕТИЧНА ЧАСТИНА =====

// 1. Різниця між датами (до Нового року)
function calculateNewYear() {
    const today = new Date();
    const newYear = new Date(today.getFullYear() + 1, 0, 1); // 1 січня наступного року
    
    // Метод 1: через getTime()
    const diffMs1 = newYear.getTime() - today.getTime();
    
    // Метод 2: пряме віднімання
    const diffMs2 = newYear - today;
    
    // Перевірка, що обидва методи дають однакові результати
    const verification = diffMs1 === diffMs2 ? '✓ Результати співпадають' : '✗ Результати різні';
    
    // Обчислення днів, годин, хвилин, секунд
    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    
    const days = Math.floor(diffMs1 / msInDay);
    const hours = Math.floor((diffMs1 % msInDay) / msInHour);
    const minutes = Math.floor((diffMs1 % msInHour) / msInMinute);
    const seconds = Math.floor((diffMs1 % msInMinute) / msInSecond);
    
    const output = document.getElementById('newYearOutput');
    output.innerHTML = `
        <strong>Сьогодні:</strong> ${today.toLocaleString('uk-UA')}<br>
        <strong>Новий рік:</strong> ${newYear.toLocaleString('uk-UA')}<br><br>
        <strong>Різниця через getTime():</strong> ${diffMs1} мілісекунд<br>
        <strong>Різниця через віднімання:</strong> ${diffMs2} мілісекунд<br>
        <span class="result">${verification}</span><br><br>
        <strong class="result">До Нового року залишилося:</strong><br>
        ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд
    `;
}

// 2. Дата у локальному форматі
function showLocalDate() {
    const now = new Date();
    
    // Різні варіанти форматування
    const format1 = now.toLocaleString('uk-UA');
    const format2 = now.toLocaleDateString('uk-UA');
    const format3 = now.toLocaleTimeString('uk-UA');
    
    // З параметрами options
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const formatWithOptions = now.toLocaleString('uk-UA', options);
    
    // Різні мови
    const enUS = now.toLocaleString('en-US', options);
    const deDE = now.toLocaleString('de-DE', options);
    const frFR = now.toLocaleString('fr-FR', options);
    
    const output = document.getElementById('localDateOutput');
    output.innerHTML = `
        <strong>toLocaleString():</strong> ${format1}<br>
        <strong>toLocaleDateString():</strong> ${format2}<br>
        <strong>toLocaleTimeString():</strong> ${format3}<br><br>
        <strong>З параметрами options (українська):</strong><br>
        ${formatWithOptions}<br><br>
        <strong>Англійська:</strong> ${enUS}<br>
        <strong>Німецька:</strong> ${deDE}<br>
        <strong>Французька:</strong> ${frFR}
    `;
}

// 3. П'ятниці 13-го у році
function findFriday13() {
    const year = parseInt(document.getElementById('yearInput').value);
    
    if (isNaN(year) || year < 1900 || year > 2100) {
        document.getElementById('friday13Output').innerHTML = '<span class="error">Введіть коректний рік!</span>';
        return;
    }
    
    const fridays = [];
    const monthNames = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 
                        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    
    for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 13);
        if (date.getDay() === 5) { // 5 = П'ятниця (0 = Неділя)
            fridays.push(`${monthNames[month]} ${year}`);
        }
    }
    
    const output = document.getElementById('friday13Output');
    if (fridays.length > 0) {
        output.innerHTML = `
            <strong>П'ятниці 13-го у ${year} році (знайдено ${fridays.length}):</strong>
            <div class="friday-list">
                ${fridays.map(f => `<div class="friday-item">🔴 ${f}</div>`).join('')}
            </div>
        `;
    } else {
        output.innerHTML = `<strong>У ${year} році немає п'ятниць 13-го</strong>`;
    }
}

// ===== ІНДИВІДУАЛЬНІ ЗАВДАННЯ =====

// Завдання 1: Створити об'єкт Date на дату: 20 лютого 2021, 3:12 ранку
function task1() {
    const date = new Date(2021, 1, 20, 3, 12); // місяць 1 = лютий (0-11)
    
    const output = document.getElementById('task1Output');
    output.innerHTML = `
        <strong>Створена дата:</strong> ${date}<br>
        <strong>У локальному форматі:</strong> ${date.toLocaleString('uk-UA')}<br>
        <strong>Повна інформація:</strong><br>
        Рік: ${date.getFullYear()}<br>
        Місяць: ${date.getMonth() + 1} (${['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'][date.getMonth()]})<br>
        День: ${date.getDate()}<br>
        Година: ${date.getHours()}<br>
        Хвилини: ${date.getMinutes()}<br>
        День тижня: ${['Неділя','Понеділок','Вівторок','Середа','Четвер','П\'ятниця','Субота'][date.getDay()]}
    `;
}

// Завдання 2: Функція getWeekDay(date) - короткий формат дня тижня
function getWeekDay(date) {
    const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}

function task2() {
    const dateInput = document.getElementById('task2Input').value;
    const date = new Date(dateInput);
    
    if (isNaN(date.getTime())) {
        document.getElementById('task2Output').innerHTML = '<span class="error">Введіть коректну дату!</span>';
        return;
    }
    
    const shortDay = getWeekDay(date);
    const fullDays = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
    
    const output = document.getElementById('task2Output');
    output.innerHTML = `
        <strong>Дата:</strong> ${date.toLocaleDateString('uk-UA')}<br>
        <strong>День тижня (короткий формат):</strong> <span class="result">${shortDay}</span><br>
        <strong>День тижня (повний формат):</strong> ${fullDays[date.getDay()]}
    `;
}

// Завдання 3: Функція getLastDayOfMonth(year, month)
function getLastDayOfMonth(year, month) {
    // Створюємо дату на 0-й день наступного місяця
    // JavaScript автоматично повертає останній день попереднього місяця
    const date = new Date(year, month + 1, 0);
    return date.getDate();
}

function task3() {
    const year = parseInt(document.getElementById('task3Year').value);
    const month = parseInt(document.getElementById('task3Month').value);
    
    if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
        document.getElementById('task3Output').innerHTML = '<span class="error">Введіть коректні дані! Місяць від 0 до 11.</span>';
        return;
    }
    
    const lastDay = getLastDayOfMonth(year, month);
    const monthNames = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 
                        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    
    // Перевірка на високосний рік
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const leapInfo = (month === 1 && isLeap) ? ' (високосний рік)' : '';
    
    const output = document.getElementById('task3Output');
    output.innerHTML = `
        <strong>Рік:</strong> ${year}<br>
        <strong>Місяць:</strong> ${monthNames[month]} (індекс: ${month})<br>
        <strong class="result">Останній день місяця: ${lastDay}${leapInfo}</strong>
    `;
}

// Завдання 4: Функція getSecondsToTomorrow()
function getSecondsToTomorrow() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = tomorrow - now;
    return Math.round(diff / 1000);
}

function task4() {
    const seconds = getSecondsToTomorrow();
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const output = document.getElementById('task4Output');
    output.innerHTML = `
        <strong>Поточний час:</strong> ${new Date().toLocaleTimeString('uk-UA')}<br>
        <strong class="result">До завтра залишилося: ${seconds} секунд</strong><br>
        <strong>Це приблизно:</strong> ${hours} годин, ${minutes} хвилин, ${secs} секунд
    `;
}

// Завдання 5: Функція formatDate(date)
function formatDate(date) {
    const now = new Date();
    const diff = now - date; // різниця в мілісекундах
    
    if (diff < 1000) {
        return 'прямо зараз';
    } else if (diff < 60000) { // менше хвилини
        const seconds = Math.floor(diff / 1000);
        return `${seconds} сек. назад`;
    } else if (diff < 3600000) { // менше години
        const minutes = Math.floor(diff / 60000);
        return `${minutes} хв. назад`;
    } else {
        // Повна дата у форматі DD.MM.YY HH:mm
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
}

function task5Test(type) {
    let testDate;
    let description;
    
    switch(type) {
        case 'now':
            testDate = new Date();
            description = 'Поточна дата та час';
            break;
        case 'sec':
            testDate = new Date(Date.now() - 30000); // 30 секунд назад
            description = 'Дата 30 секунд назад';
            break;
        case 'min':
            testDate = new Date(Date.now() - 5 * 60000); // 5 хвилин назад
            description = 'Дата 5 хвилин назад';
            break;
        case 'old':
            testDate = new Date(2021, 11, 31, 10, 0); // 31.12.2021 10:00
            description = 'Старша дата (31.12.2021 10:00)';
            break;
    }
    
    const formatted = formatDate(testDate);
    
    const output = document.getElementById('task5Output');
    output.innerHTML = `
        <strong>${description}:</strong><br>
        ${testDate.toLocaleString('uk-UA')}<br><br>
        <strong class="result">Результат formatDate(): ${formatted}</strong>
    `;
}

// ===== ІНІЦІАЛІЗАЦІЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Теоретична частина
    document.getElementById('calcNewYear').addEventListener('click', calculateNewYear);
    document.getElementById('showLocalDate').addEventListener('click', showLocalDate);
    document.getElementById('findFriday13').addEventListener('click', findFriday13);
    
    // Індивідуальні завдання
    document.getElementById('task1').addEventListener('click', task1);
    document.getElementById('task2').addEventListener('click', task2);
    document.getElementById('task3').addEventListener('click', task3);
    document.getElementById('task4').addEventListener('click', task4);
    
    // Завдання 5 - різні варіанти
    document.getElementById('task5Now').addEventListener('click', () => task5Test('now'));
    document.getElementById('task5Sec').addEventListener('click', () => task5Test('sec'));
    document.getElementById('task5Min').addEventListener('click', () => task5Test('min'));
    document.getElementById('task5Old').addEventListener('click', () => task5Test('old'));
});