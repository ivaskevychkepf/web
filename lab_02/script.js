// ===== Завдання 1 =====
function calculate() {
  let result = 10;
  console.log("Зовнішня змінна result =", result);

  if (true) {
    let result = 20; // нова змінна в межах блоку
    console.log("Внутрішня змінна result у if =", result);
  }

  console.log("Після if зовнішня змінна result =", result);
}

// ===== Завдання 2 =====
function guessNumber() {
  const journalNumber = 8; // ← тут підстав свій номер у журналі
  const secretNumber = journalNumber % 10;

  let userInput = prompt("Введіть число від 0 до 9:");
  if (userInput === null) return; // якщо натиснув "Відміна"

  if (parseInt(userInput) === secretNumber) {
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
}

// ===== Завдання 3 =====
function sumNumbers() {
  let name = prompt("Введіть своє ім’я:");
  let num1 = parseInt(prompt("Введіть перше число:"));
  let num2 = parseInt(prompt("Введіть друге число:"));

  let sum = num1 + num2;
  console.log("Hello, " + name + "! The sum of " + num1 + " and " + num2 + " is " + sum);
}
