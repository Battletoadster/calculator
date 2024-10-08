let fstOperand;
let sndOperand;
let operator;

let display = document.querySelector("input");
let displayText = "";

const numberButtons = document.querySelectorAll(".number-btn");
const operationButtons = document.querySelectorAll(".operation-btn")
const zeroButton = document.querySelector(".zero-btn");
const equalsButton = document.querySelector(".equals-btn");
const clearButton = document.querySelector(".clear-btn");
const floatingButton = document.querySelector(".floating-point-btn")

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeDisplay(button);
    })
} );

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        //If there is already an operator in the display field, evaluate the first two operands first
        if(operator){
            sndOperand = parseFloat(displayText.split(operator)[1].trim());
            fstOperand = operate(fstOperand, sndOperand, operator);
            displayText = `${fstOperand.toFixed(8)}`;
            display.value = displayText;
        }
        fstOperand = parseFloat(display.value);
        operator = button.textContent;
        displayText = `${fstOperand} ${button.textContent} `;
        display.value = displayText;
    })
})

floatingButton.addEventListener("click", () => {
    if(!(display.value.includes('.'))){
        changeDisplay(floatingButton);
    }
})

clearButton.addEventListener("click", () => {
    clearCalculator();
});

zeroButton.addEventListener("click", () => {
    changeDisplay(zeroButton);
});

equalsButton.addEventListener("click", () => {
    sndOperand = parseFloat(displayText.split(operator)[1].trim());
    if(operator ==="/" && sndOperand === 0){
        display.value = "Nice try. Clear and try again.";
        return;
    }
    if(isNaN(fstOperand) || isNaN(sndOperand)|| operator === null){
        clearCalculator();
        return;
    }
    display.value = operate(fstOperand, sndOperand, operator).toFixed(8);
    operator = null;
    sndOperand = null;
});


function clearCalculator() {
    fstOperand = "";
    sndOperand = "";
    operator = "";
    display.value = "0";
    displayText = "";
}

function changeDisplay(button){
    displayText += button.textContent;
    display.value = displayText;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(fstOperand, sndOperand, operator) {
    switch (operator) {
        case "+":
            return add(fstOperand, sndOperand);

        case "-":
            return subtract(fstOperand, sndOperand)

        case "*":
            return multiply(fstOperand, sndOperand);

        case "/":
            return divide(fstOperand, sndOperand);

        default:
            return "INVALID INPUT";
    }
}