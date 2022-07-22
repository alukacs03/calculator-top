function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator == "+") {
        return add(a,b);
    } else if (operator == "-") {
        return subtract(a,b);
    } else if (operator == "x") {
        return multiply(a,b);
    } else if (operator == "/") {
        return divide(a,b);
    } else {
        console.log("Please use a proper operator as first argument");
    }
}

let pressedOperator = null
let numberOne = null
let numberTwo = null

const display = document.querySelector(".screen")
console.log(display)

const numButtons = document.querySelectorAll(".number")
numButtons.forEach(button => {
    button.addEventListener("click", updateDisplay)
})

const operatorButtons = document.querySelectorAll(".operator")
operatorButtons.forEach(button => {
    button.addEventListener("click", operatorPressed)
})

function operatorPressed(e) {
    pressedOperator = e.target.textContent
    numberOne = display.textContent
    display.textContent = null
}

const equalsButton = document.querySelector(".equals")
equalsButton.addEventListener("click", calculate)

function calculate(e) {
    numberTwo = display.textContent
    let calculation = operate(pressedOperator, numberOne, numberTwo)
    display.textContent = calculation
}

const delButton = document.querySelector(".delbtn")
delButton.addEventListener("click", function() {
    display.textContent = display.textContent.substring(0, display.textContent.length -1)
})

const clearButton = document.querySelector(".clearbtn")
clearButton.addEventListener("click", function() {
    display.textContent = null
    pressedOperator = null
    numberOne = null
    numberTwo = null
})

function updateDisplay (button) {
    display.textContent += button.target.textContent
}