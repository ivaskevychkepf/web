// Глобальна змінна для зберігання ID спостереження
let watchId = null;

// Координати Коледжу (приблизні координати для прикладу)
const collegeLatitude = 49.4094;
const collegeLongitude = 24.9935;

// Функція для отримання місцезнаходження
function getMyLocation() {
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };
        
        navigator.geolocation.getCurrentPosition(
            displayLocation,
            displayError,
            options
        );
    } else {
        alert("На жаль, ваш браузер не підтримує Geolocation API");
    }
}

// Обробник успішного отримання координат
function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    
    const div = document.getElementById("location");
    div.innerHTML = `Ви знаходитесь за координатами:<br>
                     Широта: ${latitude.toFixed(6)}<br>
                     Довгота: ${longitude.toFixed(6)}`;
    
    // Розрахунок відстані до Коледжу
    const km = computeDistance(latitude, longitude, collegeLatitude, collegeLongitude);
    const distance = document.getElementById("distance");
    distance.innerHTML = `Відстань до Коледжу: ${km.toFixed(2)} км`;
    
    // Відображення точності
    const accuracyDiv = document.getElementById("accuracy");
    accuracyDiv.innerHTML = `Точність визначення: ${accuracy.toFixed(2)} метрів`;
}

// Обробник помилок
function displayError(error) {
    const errorTypes = {
        0: "Невідома помилка",
        1: "Доступ до геолокації заборонено",
        2: "Позиція недоступна",
        3: "Перевищено час очікування"
    };
    
    let errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    
    const div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

// Функція обчислення відстані за формулою гаверсинуса
function computeDistance(startLat, startLon, endLat, endLon) {
    const R = 6371; // Радіус Землі в кілометрах
    
    const dLat = toRadians(endLat - startLat);
    const dLon = toRadians(endLon - startLon);
    
    const lat1 = toRadians(startLat);
    const lat2 = toRadians(endLat);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * 
              Math.cos(lat1) * Math.cos(lat2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
}

// Функція конвертації градусів у радіани
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Обробник для кнопки Watch position
function watchLocation() {
    watchId = navigator.geolocation.watchPosition(
        displayLocation,
        displayError,
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Обробник для кнопки Clear watch
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        
        document.getElementById("location").innerHTML = 
            "Відслідковування зупинено";
        document.getElementById("distance").innerHTML = "";
        document.getElementById("accuracy").innerHTML = "";
    }
}

// Ініціалізація при завантаженні сторінки
window.onload = function() {
    // Початкове отримання місцезнаходження
    getMyLocation();
    
    // Додавання обробників подій до кнопок
    const watchButton = document.getElementById("watchButton");
    watchButton.onclick = watchLocation;
    
    const clearWatchButton = document.getElementById("clearWatchButton");
    clearWatchButton.onclick = clearWatch;
};