const input = document.getElementById("inputBox");
const buttons = document.querySelectorAll("input[type='button']");
let expression = "";
let currentResult = "";

const maxLength = 12;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.value;

    if (value === "=") {
      try {
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
      if (expression.length > maxLength) {
        expression = expression.slice(0, maxLength);
      }
      input.value = expression;
    } else {
      if (expression.length < maxLength) {
        expression += value;
        input.value = expression;
      }
    }
  });
});
