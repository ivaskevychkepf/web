// ===== ЗАВДАННЯ 1: Конвертер температур =====
function initTemperatureConverter() {
    const fahrenheitInput = document.getElementById('fahrenheit');
    const celsiusInput = document.getElementById('celsius');

    fahrenheitInput.addEventListener('input', function() {
        const f = parseFloat(this.value);
        if (!isNaN(f)) {
            const c = (5 / 9) * (f - 32);
            celsiusInput.value = c.toFixed(2);
        } else {
            celsiusInput.value = '';
        }
    });

    celsiusInput.addEventListener('input', function() {
        const c = parseFloat(this.value);
        if (!isNaN(c)) {
            const f = (c * 9 / 5) + 32;
            fahrenheitInput.value = f.toFixed(2);
        } else {
            fahrenheitInput.value = '';
        }
    });
}

// ===== ЗАВДАННЯ 2: Таблиця множення =====
function initMultiplicationGame() {
    let score = 0;
    let currentAnswer = 0;

    const scoreDisplay = document.getElementById('score');
    const questionDisplay = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const resultDisplay = document.getElementById('result');
    const nextTaskBtn = document.getElementById('nextTask');
    const checkBtn = document.getElementById('checkAnswer');

    function generateTask() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        currentAnswer = num1 * num2;
        questionDisplay.textContent = `${num1} × ${num2} = ?`;
        answerInput.value = '';
        resultDisplay.textContent = '';
        resultDisplay.className = 'result';
    }

    nextTaskBtn.addEventListener('click', generateTask);

    checkBtn.addEventListener('click', function() {
        const userAnswer = parseInt(answerInput.value);
        if (isNaN(userAnswer)) {
            resultDisplay.textContent = 'Введіть відповідь!';
            resultDisplay.className = 'result';
            return;
        }

        if (userAnswer === currentAnswer) {
            score++;
            resultDisplay.textContent = 'Правильно! 🎉';
            resultDisplay.className = 'result correct';
        } else {
            resultDisplay.textContent = `Неправильно. Правильна відповідь: ${currentAnswer}`;
            resultDisplay.className = 'result incorrect';
        }
        scoreDisplay.textContent = score;
    });

    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkBtn.click();
        }
    });
}

// ===== ЗАВДАННЯ 3: Таблиця множення з радіокнопками =====
function initMultiplicationRadio() {
    let score = 0;
    let currentAnswer = 0;
    let answered = false;

    const scoreDisplay = document.getElementById('scoreRadio');
    const questionDisplay = document.getElementById('questionRadio');
    const optionsContainer = document.getElementById('radioOptions');
    const resultDisplay = document.getElementById('resultRadio');
    const nextTaskBtn = document.getElementById('nextTaskRadio');

    function generateTask() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        currentAnswer = num1 * num2;
        answered = false;

        questionDisplay.textContent = `${num1} × ${num2} = ?`;
        resultDisplay.textContent = '';
        resultDisplay.className = 'result';

        // Генеруємо варіанти відповідей
        const options = [currentAnswer];
        while (options.length < 4) {
            const wrongAnswer = Math.floor(Math.random() * 100) + 1;
            if (!options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
        }

        // Перемішуємо варіанти
        options.sort(() => Math.random() - 0.5);

        // Створюємо радіокнопки
        optionsContainer.innerHTML = '';
        options.forEach((option, index) => {
            const div = document.createElement('div');
            div.className = 'radio-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = option;
            radio.id = `option${index}`;

            const label = document.createElement('label');
            label.htmlFor = `option${index}`;
            label.textContent = option;

            div.appendChild(radio);
            div.appendChild(label);

            div.addEventListener('click', function() {
                if (!answered) {
                    radio.checked = true;
                    checkAnswer(option);
                }
            });

            optionsContainer.appendChild(div);
        });
    }

    function checkAnswer(userAnswer) {
        if (answered) return;
        answered = true;

        const options = optionsContainer.querySelectorAll('.radio-option');
        options.forEach(opt => opt.classList.add('disabled'));

        if (userAnswer === currentAnswer) {
            score++;
            resultDisplay.textContent = 'Правильно! 🎉';
            resultDisplay.className = 'result correct';
        } else {
            resultDisplay.textContent = `Неправильно. Правильна відповідь: ${currentAnswer}`;
            resultDisplay.className = 'result incorrect';
        }
        scoreDisplay.textContent = score;
    }

    nextTaskBtn.addEventListener('click', generateTask);
}

// ===== ЗАВДАННЯ 4: Ротатор фотографій =====
function initPhotoRotator(containerId, imagesArray) {
    const container = document.getElementById(containerId);
    let currentIndex = 0;

    // Створюємо структуру
    const rotatorDiv = document.createElement('div');
    rotatorDiv.className = 'photo-rotator';

    // Лічильник
    const counter = document.createElement('div');
    counter.className = 'rotator-counter';
    rotatorDiv.appendChild(counter);

    // Навігація
    const navigation = document.createElement('div');
    navigation.className = 'rotator-navigation';

    const prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.textContent = 'Назад';
    prevLink.id = 'prevLink';

    const nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.textContent = 'Вперед';
    nextLink.id = 'nextLink';

    navigation.appendChild(prevLink);
    navigation.appendChild(nextLink);
    rotatorDiv.appendChild(navigation);

    // Зображення
    const image = document.createElement('img');
    image.className = 'rotator-image';
    image.alt = 'Фото';
    rotatorDiv.appendChild(image);

    // Інформація
    const info = document.createElement('div');
    info.className = 'rotator-info';

    const title = document.createElement('div');
    title.className = 'rotator-title';

    const description = document.createElement('div');
    description.className = 'rotator-description';

    info.appendChild(title);
    info.appendChild(description);
    rotatorDiv.appendChild(info);

    container.appendChild(rotatorDiv);

    function updateDisplay() {
        const current = imagesArray[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${imagesArray.length}`;
        image.src = current.path;
        title.textContent = current.title;
        description.textContent = current.description;

        // Показуємо/ховаємо посилання
        prevLink.className = currentIndex === 0 ? 'hidden' : '';
        nextLink.className = currentIndex === imagesArray.length - 1 ? 'hidden' : '';
    }

    prevLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            updateDisplay();
        }
    });

    nextLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentIndex < imagesArray.length - 1) {
            currentIndex++;
            updateDisplay();
        }
    });

    updateDisplay();
}

// ===== ЗАВДАННЯ 5: CAPTCHA =====
function initCaptcha(digitsCount) {
    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaInput = document.getElementById('captchaInput');
    const checkBtn = document.getElementById('checkCaptcha');
    const refreshBtn = document.getElementById('refreshCaptcha');
    const resultDisplay = document.getElementById('captchaResult');

    let currentCaptcha = '';

    // Шаблони цифр (пікселі для відображення)
    const digitPatterns = {
        '0': [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
        '1': [[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,1,1]],
        '2': [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],
        '3': [[1,1,1],[0,0,1],[1,1,1],[0,0,1],[1,1,1]],
        '4': [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
        '5': [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
        '6': [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],
        '7': [[1,1,1],[0,0,1],[0,1,0],[0,1,0],[0,1,0]],
        '8': [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],
        '9': [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]]
    };

    function generateCaptcha() {
        currentCaptcha = '';
        for (let i = 0; i < digitsCount; i++) {
            currentCaptcha += Math.floor(Math.random() * 10);
        }
        displayCaptcha();
        captchaInput.value = '';
        resultDisplay.textContent = '';
        resultDisplay.className = 'result';
    }

    function displayCaptcha() {
        captchaDisplay.innerHTML = '';
        
        for (let digit of currentCaptcha) {
            const digitContainer = document.createElement('div');
            digitContainer.className = 'captcha-digit';
            
            const pattern = digitPatterns[digit];
            for (let row = 0; row < pattern.length; row++) {
                for (let col = 0; col < pattern[row].length; col++) {
                    if (pattern[row][col] === 1) {
                        const pixel = document.createElement('span');
                        pixel.className = 'captcha-pixel';
                        pixel.style.left = (col * 10) + 'px';
                        pixel.style.top = (row * 10) + 'px';
                        digitContainer.appendChild(pixel);
                    }
                }
            }
            
            captchaDisplay.appendChild(digitContainer);
        }
    }

    checkBtn.addEventListener('click', function() {
        const userInput = captchaInput.value;
        if (userInput === currentCaptcha) {
            resultDisplay.textContent = 'Правильно! ✓';
            resultDisplay.className = 'result correct';
        } else {
            resultDisplay.textContent = 'Неправильно! Спробуйте ще раз.';
            resultDisplay.className = 'result incorrect';
        }
    });

    refreshBtn.addEventListener('click', generateCaptcha);

    generateCaptcha();
}

// ===== ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ =====
document.addEventListener('DOMContentLoaded', function() {
    // Завдання 1
    initTemperatureConverter();

    // Завдання 2
    initMultiplicationGame();

    // Завдання 3
    initMultiplicationRadio();

    // Завдання 4 - Масив зображень фруктів
    const imagesArray = [
        {
            path: 'images/apple.jpg',
            title: 'Яблуко',
            description: 'Соковите червоне яблуко'
        },
        {
            path: 'images/banana.jpg',
            title: 'Банан',
            description: 'Стиглий жовтий банан'
        },
        {
            path: 'images/orange.jpg',
            title: 'Апельсин',
            description: 'Свіжий апельсин'
        },
        {
            path: 'images/strawberry.jpg',
            title: 'Полуниця',
            description: 'Солодка полуниця'
        },
        {
            path: 'images/watermelon.jpg',
            title: 'Кавун',
            description: 'Великий смачний кавун'
        }
    ];

    initPhotoRotator('rotator', imagesArray);

    // Завдання 5 - CAPTCHA з 5 цифрами
    initCaptcha(5);
});