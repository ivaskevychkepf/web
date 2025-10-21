// === Практична робота: Методи масивів (ІІ рівень 7–9 балів) ===
// Автор: Ivaskevych Rostyslav, група PI-22-03

// ===== Завдання 3. Статистичний аналіз працівників =====

// Масив працівників
const employees = [
  { name: "Олена", position: "Менеджер", salary: 25000, years: 5 },
  { name: "Андрій", position: "Розробник", salary: 40000, years: 3 },
  { name: "Ірина", position: "Тестувальник", salary: 30000, years: 4 },
  { name: "Петро", position: "Дизайнер", salary: 28000, years: 6 },
  { name: "Михайло", position: "Розробник", salary: 45000, years: 7 }
];

// 1. Функція для обчислення середньої зарплати (reduce)
function getAverageSalary() {
  const total = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avg = total / employees.length;
  return avg.toFixed(2);
}

// 2. Функція для знаходження працівника з найбільшим досвідом
function findMostExperiencedEmployee() {
  return employees.reduce((max, emp) => emp.years > max.years ? emp : max);
}

// Демонстрація результатів
console.log("=== Завдання 3: Працівники ===");
console.log("Середня зарплата:", getAverageSalary());
console.log("Найдосвідченіший працівник:", findMostExperiencedEmployee());



// ===== Завдання 4. Аналіз даних про книги =====

const books = [
  { title: "Гаррі Поттер і філософський камінь", author: "Дж. Роулінг", year: 1997, rating: 4.8, isRead: true },
  { title: "Володар перснів", author: "Дж. Р. Р. Толкін", year: 1954, rating: 4.9, isRead: false },
  { title: "Хоббіт", author: "Дж. Р. Р. Толкін", year: 1937, rating: 4.7, isRead: true },
  { title: "1984", author: "Джордж Орвелл", year: 1949, rating: 4.6, isRead: false },
  { title: "Маленький принц", author: "Антуан де Сент-Екзюпері", year: 1943, rating: 4.5, isRead: true },
  { title: "Кобзар", author: "Тарас Шевченко", year: 1840, rating: 4.9, isRead: false }
];

// 1. Повертає масив назв непрочитаних книг
function getUnreadBooks() {
  return books
    .filter(book => !book.isRead)
    .map(book => book.title);
}

// 2. Повертає книги певного автора, відсортовані за роком
function getBooksByAuthor(authorName) {
  return books
    .filter(book => book.author === authorName)
    .sort((a, b) => a.year - b.year);
}

// 3. Повертає топові книги з рейтингом > 4
function getTopRatedBooks() {
  return books
    .filter(book => book.rating > 4)
    .sort((a, b) => b.rating - a.rating);
}

// Демонстрація роботи
console.log("\n=== Завдання 4: Книги ===");
console.log("Непрочитані книги:", getUnreadBooks());
console.log("Книги Толкіна:", getBooksByAuthor("Дж. Р. Р. Толкін"));
console.log("Найрейтинговіші книги:", getTopRatedBooks());



// ===== Підключення до HTML =====

// Щоб функції були доступні для кнопок на сторінці
window.getAverageSalary = getAverageSalary;
window.findMostExperiencedEmployee = findMostExperiencedEmployee;
window.getUnreadBooks = getUnreadBooks;
window.getBooksByAuthor = getBooksByAuthor;
window.getTopRatedBooks = getTopRatedBooks;
