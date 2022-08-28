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
    a = Number(a);
    b = Number(b);
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

const display = document.querySelector(".screen")
const previousNumberDiv = document.querySelector(".previousNumber")
const currentNumberDiv = document.querySelector(".currentNumber")
let calculated = false;
let pressedOperator = null;
let shouldclear = false;


const equalsButton = document.querySelector(".equals")
equalsButton.addEventListener("click", calculate)

const delButton = document.querySelector(".delbtn")

const numButtons = document.querySelectorAll(".number")
numButtons.forEach(button => {
    button.addEventListener("click", updateDisplay)
})

const operatorButtons = document.querySelectorAll(".operator")
operatorButtons.forEach(button => {
    button.addEventListener("click", operatorPressed)
})

function operatorPressed(e) {
    if (pressedOperator != null) { 
        calculate()
    }
    if (currentNumberDiv.textContent == "" || currentNumberDiv.textContent == null) {
        pressedOperator = e.target.textContent;
        console.log(pressedOperator);
        return;
    }

    pressedOperator = e.target.textContent;
    numberOne = currentNumberDiv.textContent
    shouldclear = true;
    previousNumberDiv.textContent = currentNumberDiv.textContent + ' ' + `${pressedOperator}`;
    currentNumberDiv.textContent = calculation;
}

function calculate() {
    if (pressedOperator == null) {
        return;
    }
    numberTwo = currentNumberDiv.textContent
    if (pressedOperator == "/" && numberTwo == 0) {
        currentNumberDiv.textContent = "Good try. Now reset!";
        return;
    }
    let calculation = operate(pressedOperator, numberOne, numberTwo)
    currentNumberDiv.textContent = calculation
    previousNumberDiv.textContent = `${numberOne} ${pressedOperator} ${numberTwo}` + ' =';
    pressedOperator = null;
    shouldclear = false;
}

delButton.addEventListener("click", function() {
    currentNumberDiv.textContent = currentNumberDiv.textContent.substring(0, currentNumberDiv.textContent.length -1)
})

const clearButton = document.querySelector(".clearbtn")
clearButton.addEventListener("click", function() {
    previousNumberDiv.textContent = null
    currentNumberDiv.textContent = null
    pressedOperator = null
    numberOne = null
    numberTwo = null
})

function updateDisplay (button) {
    if (shouldclear == true) {
        currentNumberDiv.textContent = null;
        shouldclear = false;
    }
    currentNumberDiv.textContent += button.target.textContent
}