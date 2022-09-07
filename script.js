// initialise displays
const prevNumDisplay = document.querySelector('#previousNumberDisplay');
const currNumDisplay = document.querySelector('#currentNumberDisplay');

// this will be the object that will contain our operator, and the two numbers we want to operate with
let operation = {
    prevNum: null, 
    operator: null, 
    currNum: null
}
let calculated = false;

// initialise buttons
// delBtn's work is very simple, so I used an arrow function
const delBtn = document.querySelector('#delBtn');
delBtn.addEventListener('click', () =>
    currNumDisplay.textContent = currNumDisplay.textContent.substring(0, currNumDisplay.textContent.length - 1)
);

const clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', clearScreen);
const equalsBtn = document.querySelector('#equalsBtn');
equalsBtn.addEventListener('click', handleEquals);
const decimalBtn = document.querySelector('#decimalBtn');
decimalBtn.addEventListener('click', handleDecimal);

const numberBtns = document.querySelectorAll('.number');
numberBtns.forEach(e => {
    e.addEventListener('click', handleNumber)
});

const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(e => {
    e.addEventListener('click', handleOperator)
});

/* 
FUNCTIONALITY STARTS FROM HERE
*/

// handles number input
function handleNumber(e) {
    var inputNumber = null;
    if(typeof e == 'number') {
        inputNumber = e;
    } else {
        inputNumber = e.target.textContent
    }
    if (inputNumber == "0" && currNumDisplay.textContent === "0") {
        return false
    }
    if (currNumDisplay.textContent === "0" || calculated) {
        clearScreen()
    }
    if (currNumDisplay.textContent.length < 15) {
        currNumDisplay.textContent += inputNumber;
        operation.currNum = currNumDisplay.textContent;
    }

    console.log(operation)
};

//logic to handle the presses of +, -, /, and x
function handleOperator(e, keyboard) {
    var inputOperator = null;
    if(keyboard) {
        inputOperator = e;
    } else {
        inputOperator = e.target.textContent
    }
    calculated = false;
    // if there is no operator, no current number, no previous number, do nothing
    if (operation.operator === null && operation.currNum === null && operation.prevNum === null){
        return false;
    }
    // if there is a previous number, but no current number, update the operator
    if (operation.currNum === null && operation.prevNum !== null) {
        operation.operator = inputOperator;
        updateDisplay();
    }
    /* if there is a previous number AND there is a current number, 
        do the PREVIOUS operation with these and then update the operator */
    if (operation.prevNum !== null && operation.currNum !== null) {
        calculate();
        operation.operator = inputOperator;
        updateDisplay();
    }
    /* if there is no previous number, but there is a current number, 
        make the current number the previous one and update the operator */ 
    if (operation.prevNum === null && currNumDisplay.textContent != "") {
        operation.prevNum = currNumDisplay.textContent;
        currNumDisplay.textContent = "";
        operation.currNum = null;
        operation.operator = inputOperator;
        updateDisplay();
    }
    console.log(operation)
}

// updates the display with the current values
function updateDisplay(){
    currNumDisplay.textContent = operation.currNum
    prevNumDisplay.textContent = `${operation.prevNum} ${operation.operator}`
}

// do the calculation
function calculate() {
    if (operation.currNum === "0"){
        window.alert("Come on now... Resetting...")
        clearScreen()
    }
    if (operation.operator === "/") {
        operation.prevNum = Number(operation.prevNum) / Number(operation.currNum)
        operation.currNum = null
    }
    if (operation.operator === "x") {
        operation.prevNum = Number(operation.prevNum) * Number(operation.currNum)
        operation.currNum = null
    }
    if (operation.operator === "-") {
        operation.prevNum = Number(operation.prevNum) - Number(operation.currNum)
        operation.currNum = null
    }
    if (operation.operator === "+") {
        operation.prevNum = Number(operation.prevNum) + Number(operation.currNum)
        operation.currNum = null
    }
}

// clears the screen and sets the default values to all variables
function clearScreen(){
    currNumDisplay.textContent = "";
    prevNumDisplay.textContent = "";
    operation = {
        prevNum: null, 
        operator: null, 
        currNum: null
    }
    calculated = false;
};

// handles the equal button being pressed
function handleEquals() {
    if (currNumDisplay.textContent !== "" && !calculated && operation.prevNum !== null) {
        prevNumDisplay.textContent = `${operation.prevNum} ${operation.operator} ${operation.currNum} = `
        calculate();
        currNumDisplay.textContent = operation.prevNum
        calculated = true;
        operation.operator = null;
    }
};

//adds the decimal if the number doesn't already contain one
function handleDecimal() {
    if (currNumDisplay.textContent.includes('.')) {
        return false;
    }
    if (calculated) {
        calculated = false;
        prevNumDisplay.textContent = "";
        operation.prevNum = null;
    }
    if (currNumDisplay.textContent == "") {
        currNumDisplay.textContent = "0";
    }
    currNumDisplay.textContent += '.';
}

// add click animations to buttons and revoke them after a certain amount of time
const allBtns = document.querySelectorAll('.grid-item');
allBtns.forEach((btn) => {
    btn.addEventListener('click', animateButtons);
})

function animateButtons(e) {
    e.target.classList.add('clicked')
    setTimeout(() => {e.target.classList.remove('clicked')}, 50)
}

//keyboard functionality

document.addEventListener('keydown', (e) => {
    if (!isNaN(Number(e.key))){
        handleNumber(Number(e.key))
    }
    if (e.key === 'x' || e.key === '/' || e.key === '+' || e.key === '-') {
        handleOperator(e.key, true)
    }
    if (e.key === "=" || e.key === "Enter") {
        handleEquals()
    }
    if (e.key === ".") {
        handleDecimal()
    }
})