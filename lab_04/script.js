// === Колекція марок (варіант 8) ===

// Приклад одного об'єкта
const stamp = {
  country: "Україна",
  year: 2005,
  value: 2.5,
  theme: "Фауна",
  isExchanged: false,

  stampInfo() {
    console.log(`Країна: ${this.country}, Рік: ${this.year}, Номінал: ${this.value} грн, Тема: ${this.theme}, Обміняна: ${this.isExchanged ? "Так" : "Ні"}`);
  },

  markAsExchanged() {
    this.isExchanged = true;
  }
};

// Демонстрація
console.log('--- Приклад однієї марки ---');
stamp.stampInfo();
stamp.markAsExchanged();
stamp.stampInfo();


// === Масив об'єктів ===
const collection = [
  {
    country: "Україна",
    year: 2005,
    value: 2.5,
    theme: "Фауна",
    isExchanged: false,
    stampInfo() {
      console.log(`Країна: ${this.country}, Рік: ${this.year}, Номінал: ${this.value} грн, Тема: ${this.theme}, Обміняна: ${this.isExchanged ? "Так" : "Ні"}`);
    },
    markAsExchanged() { this.isExchanged = true; }
  },
  {
    country: "Польща",
    year: 2010,
    value: 3,
    theme: "Архітектура",
    isExchanged: true,
    stampInfo() {
      console.log(`Країна: ${this.country}, Рік: ${this.year}, Номінал: ${this.value} грн, Тема: ${this.theme}, Обміняна: ${this.isExchanged ? "Так" : "Ні"}`);
    },
    markAsExchanged() { this.isExchanged = true; }
  },
  {
    country: "Німеччина",
    year: 1998,
    value: 1.8,
    theme: "Історія",
    isExchanged: false,
    stampInfo() {
      console.log(`Країна: ${this.country}, Рік: ${this.year}, Номінал: ${this.value} грн, Тема: ${this.theme}, Обміняна: ${this.isExchanged ? "Так" : "Ні"}`);
    },
    markAsExchanged() { this.isExchanged = true; }
  }
];

function displayCollection() {
  console.log("=== Колекція марок ===");
  collection.forEach((s, i) => {
    console.log(`#${i + 1}`);
    s.stampInfo();
  });
}

function calculateAverageYear() {
  const totalYears = collection.reduce((sum, s) => sum + s.year, 0);
  return (totalYears / collection.length).toFixed(1);
}

console.log("Середній рік випуску:", calculateAverageYear());

// Робимо функції глобальними для доступу з index.html
window.collection = collection;
window.displayCollection = displayCollection;
window.calculateAverageYear = calculateAverageYear;
