// Масив для зберігання завдань
let tasks = [];

// Завантаження завдань з localStorage при старті
window.onload = function() {
    loadTasksFromStorage();
    renderTasks();
    
    // Додавання обробника для input
    const taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });
};

// Функція для додавання нового завдання
function addTask(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date()
    };
    
    tasks.push(task);
    saveTasksToStorage();
    renderTasks();
}

// Функція для відображення завдань
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

// Функція для створення елементу завдання
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    
    if (task.completed) {
        li.classList.add('completed');
    }
    
    // Checkbox (показується тільки для невиконаних завдань)
    if (!task.completed) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            toggleTaskComplete(task.id);
        });
        li.appendChild(checkbox);
    }
    
    // Контент завдання
    const content = document.createElement('div');
    content.className = 'task-content';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'task-text';
    textDiv.textContent = task.text;
    
    // Подвійний клік для редагування
    textDiv.addEventListener('dblclick', function() {
        startEditTask(task.id, textDiv);
    });
    
    const dateDiv = document.createElement('div');
    dateDiv.className = 'task-date';
    dateDiv.textContent = formatDate(task.createdAt);
    
    content.appendChild(textDiv);
    content.appendChild(dateDiv);
    li.appendChild(content);
    
    // Кнопка видалення
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id);
    });
    li.appendChild(deleteBtn);
    
    return li;
}

// Функція для форматування дати
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

// Функція для позначення завдання як виконаного
function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        saveTasksToStorage();
        renderTasks();
    }
}

// Функція для видалення завдання
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasksToStorage();
    renderTasks();
}

// Функція для початку редагування завдання
function startEditTask(taskId, textDiv) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-edit-input';
    input.value = task.text;
    
    // Заміна тексту на input
    textDiv.style.display = 'none';
    textDiv.parentNode.insertBefore(input, textDiv);
    input.focus();
    input.select();
    
    // Обробник натискання Enter
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            finishEditTask(taskId, input.value.trim(), input, textDiv);
        }
    });
    
    // Обробник втрати фокусу
    input.addEventListener('blur', function() {
        finishEditTask(taskId, input.value.trim(), input, textDiv);
    });
}

// Функція для завершення редагування завдання
function finishEditTask(taskId, newText, input, textDiv) {
    if (newText === '') {
        // Якщо текст порожній, відновлюємо старий текст
        input.remove();
        textDiv.style.display = 'block';
        return;
    }
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.text = newText;
        saveTasksToStorage();
        renderTasks();
    }
}

// Функція для збереження завдань у localStorage
function saveTasksToStorage() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Функція для завантаження завдань з localStorage
function loadTasksFromStorage() {
    const stored = localStorage.getItem('todoTasks');
    if (stored) {
        tasks = JSON.parse(stored);
        // Перетворюємо рядки дат назад у об'єкти Date
        tasks.forEach(task => {
            task.createdAt = new Date(task.createdAt);
        });
    }
}