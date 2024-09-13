const input = document.getElementById("inputBox");
const buttons = document.querySelectorAll(".button");
let expression = "";
let currentResult = "";

const maxLength = 12;

const onClickBtn = (value) => {
  if (value === "=") {
    try {
      if (expression.trim() === "") {
        return;
      }
      if (currentResult) {
        expression = `${currentResult}${expression}`;
      }
      currentResult = eval(expression);

      if (currentResult.toString().length > maxLength) {
        currentResult = currentResult.toString().slice(0, maxLength);
      }

      input.value = currentResult;
      expression = "";
    } catch (error) {
      input.value = "Error";
      expression = "";
      currentResult = "";
    }
  } else if (value === "AC") {
    expression = "";
    currentResult = "";
    input.value = "";
  } else if (value === "DE") {
    expression = expression.slice(0, -1);
    input.value = expression;
  } else {
    if (expression.length < maxLength) {
      expression += value;
      input.value = expression;
    }
  }
};

const onKeyPress = (e) => {
  const key = e.key;
  if (/^[0-9+\-*/.]$/.test(key)) {
    if (expression.length < maxLength) {
      expression += key;
      input.value = expression;
    }
  } else if (key === "Enter") {
    e.preventDefault();
    onClickBtn("=");
  } else if (key === "Backspace") {
    e.preventDefault();
    onClickBtn("DE");
  } else if (key === "Escape") {
    e.preventDefault();
    onClickBtn("AC");
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    onClickBtn(e.target.value);
  });
});

document.addEventListener("keydown", onKeyPress);
