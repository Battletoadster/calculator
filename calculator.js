let fstOperand;
let sndOperand;
let operator;

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