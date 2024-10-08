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
const backspcButton = document.querySelector(".backspc-btn");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        changeDisplay(button);
    })
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        //If there is already an operator in the display field, evaluate the first two operands first
        if (operator) {
            sndOperand = parseFloat(displayText.split(operator)[1].trim());
            fstOperand = operate(fstOperand, sndOperand, operator);
            if (fstOperand.toString().length > 8) {
                displayText = `${fstOperand.toFixed(8)}`;
            } else {
                displayText = `${fstOperand}`;
            }
            display.value = displayText;
        }
        fstOperand = parseFloat(display.value);
        operator = button.textContent;
        displayText = `${fstOperand} ${button.textContent} `;
        display.value = displayText;
    })
})

backspcButton.addEventListener("click", () => {
    if (display.value === "") return; // Prevent further action if display is empty

    // Remove the last character
    displayText = displayText.substring(0, displayText.length - 1);
    display.value = displayText;

    // If an operator has been removed, reset the operator
    if (operator && !displayText.includes(operator)) {
        operator = null;
    }

    // Handle fstOperand and sndOperand updates accordingly
    if (operator) {
        sndOperand = parseFloat(displayText.split(operator)[1].trim());
    } else {
        fstOperand = parseFloat(displayText.trim());
    }
});

floatingButton.addEventListener("click", () => {
    if (display.value === "0" || operator === null && fstOperand === null) {
        displayText = "0."; // Start with 0.
        display.value = displayText;
        fstOperand = 0;
        return;
    }

    if (operator) {
        if (!(display.value.split(operator)[1].trim().includes('.'))) {
            changeDisplay(floatingButton);
        }
    } else {
        if (!(display.value.includes('.'))) {
            changeDisplay(floatingButton);
        }
    }

});

clearButton.addEventListener("click", () => {
    clearCalculator();
});

zeroButton.addEventListener("click", () => {
    changeDisplay(zeroButton);
});

equalsButton.addEventListener("click", () => {
    sndOperand = parseFloat(displayText.split(operator)[1]);
    if (operator === "/" && sndOperand === 0) {
        display.value = "Nice try. Clear and try again.";
        return;
    }
    if (isNaN(fstOperand) || isNaN(sndOperand) || operator === null || 
    fstOperand === null || sndOperand === null) {
        clearCalculator();
        return;
    }
    fstOperand = operate(fstOperand, sndOperand, operator);
    if (fstOperand.toString().length > 8) {
        display.value = fstOperand.toFixed(8);
    } else {
        display.value = fstOperand;
    }
    operator = null;
    sndOperand = null;
});


function clearCalculator() {
    fstOperand = null;
    sndOperand = null;
    operator = null;
    display.value = "0";
    displayText = "";
}

function changeDisplay(button) {
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