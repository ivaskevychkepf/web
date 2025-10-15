function startGreetingTimer(message, seconds, callback) {
  console.log(`Таймер запущено. Повідомлення з’явиться через ${seconds} секунд...`);
  setTimeout(() => {
    console.log(message);
    callback();
  }, seconds * 1000);
}

function runGreetingTimer() {
  startGreetingTimer("Hello, user! Welcome to JavaScript!", 3, () => alert("Time is up!"));
}

function calculate(a, b, operation) {
  switch (operation) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Division by zero!';
    default: return 'Invalid operation';
  }
}

function showResult() {
  const a = parseFloat(prompt("Введіть перше число:"));
  const b = parseFloat(prompt("Введіть друге число:"));
  const operation = prompt("Введіть операцію (+, -, *, /):");

  const result = calculate(a, b, operation);
  alert(`Результат: ${result}`);
}

function createClickCounter() {
  let count = 0;
  return function() {
    count++;
    console.log(`Кількість кліків: ${count}`);
    alert(`Кількість кліків: ${count}`);
  };
}

const counter = createClickCounter();

function runClickCounter() {
  counter();
}
