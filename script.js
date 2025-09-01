const previousDisplay = document.getElementById("previous");
const currentDisplay = document.getElementById("current");
let currentInput = "0";
let previousInput = "";
let operator = null;

function updateDisplay() {
  previousDisplay.textContent = previousInput + (operator || "");
  currentDisplay.textContent = currentInput;
}

function appendNumber(number) {
  if (currentInput === "0" || currentInput === "Error") {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === "Error") return;
  if (operator !== null) calculateResult();
  previousInput = currentInput;
  operator = op;
  currentInput = "0";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  updateDisplay();
}

function backspace() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

function calculateResult() {
  if (operator === null || previousInput === "") return;
  try {
    let expression = previousInput + operator + currentInput;
    currentInput = eval(expression).toString();
    previousInput = "";
    operator = null;
  } catch {
    currentInput = "Error";
  }
  updateDisplay();
}

// ✅ Keyboard Support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    appendNumber(e.key);
  } else if (["+", "-", "*", "/","%"].includes(e.key)) {
    appendOperator(e.key);
  } else if (e.key === "Enter") {
    calculateResult();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "Escape") {
    clearDisplay();
  } else if (e.key === ".") {
    appendNumber(".");
  }
});
