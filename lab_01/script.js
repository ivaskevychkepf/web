// ===== Завдання 1 =====
const myName = "Ростислав"; // ← заміни на своє ім’я
const nameList = document.getElementById("nameList");

for (let letter of myName) {
  let li = document.createElement("li");
  li.textContent = letter;
  li.onmouseover = () => alert(letter);
  nameList.appendChild(li);
}

// ===== Завдання 2 =====
function askNames() {
  let container = document.getElementById("output");
  while (true) {
    let input = prompt("Введіть прізвище та ім’я (або натисніть 'Відміна')");
    if (input === null) break;
    let p = document.createElement("p");
    p.textContent = input;
    container.appendChild(p);
  }
}

// ===== Завдання 3 =====
const surname = "Іваськевич"; // ← заміни на своє прізвище
const lettersContainer = document.getElementById("letters");
const btn = document.getElementById("showBlocksBtn");

btn.onclick = () => {
  if (lettersContainer.innerHTML !== "") {
    // Якщо вже є блоки – очищаємо
    lettersContainer.innerHTML = "";
  } else {
    for (let letter of surname) {
      let div = document.createElement("div");
      div.textContent = letter;
      div.onmouseover = () => alert(`Це літера ${letter}`);
      lettersContainer.appendChild(div);
    }
  }
};
