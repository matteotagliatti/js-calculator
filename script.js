// THEME TOGGLE

const toggleLightTheme = document.getElementById('toggleLightTheme')
const toggleDarkTheme = document.getElementById('toggleDarkTheme')

toggleLightTheme.onclick = () => setTheme('light')
toggleDarkTheme.onclick = () => setTheme('dark')

function setTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
        toggleLightTheme.classList.remove('active');
        toggleDarkTheme.classList.add('active');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        window.localStorage.setItem('theme', 'light');
        toggleDarkTheme.classList.remove('active');
        toggleLightTheme.classList.add('active');
    }
}

let theme = localStorage.getItem('theme');
theme = theme || (window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'light');
setTheme(theme);

function modeSwitcher() {
    let currentMode = document.documentElement.getAttribute('data-theme');
    if (currentMode === "dark") {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Calculator

let firstOperand = ''
let secondOperand = ''
let currentOperation = ''

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const currentOperationScreen = document.getElementById('currentOperationScreen')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const equalBtn = document.getElementById('equalBtn')

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalBtn.addEventListener('click', evaluate);

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => evaluate(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0') {
        currentOperationScreen.textContent = ''
    }

    currentOperationScreen.textContent += number;
}

// Clear
function clear() {
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = '0'
    firstOperand = ''
    secondOperand = ''
}

// Delete
function deleteNumber() {
    if (currentOperationScreen.textContent < 10) {
        currentOperationScreen.textContent = '0'
    }
    if (currentOperationScreen.textContent >= 10) {
        currentOperationScreen.textContent = currentOperationScreen.textContent.slice(0, -1)
    }
}

// Evaluate
function evaluate(operator) {
    if (firstOperand === '') {
        currentOperation = operator;
        firstOperand = currentOperationScreen.textContent;
        currentOperationScreen.textContent = '0';
        lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    } else {
        secondOperand = currentOperationScreen.textContent;
        currentOperationScreen.textContent = operate(currentOperation, firstOperand, secondOperand)
        lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
        firstOperand = ''
        secondOperand = ''
    }


}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '−':
            return subtract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            return divide(a, b)
    }
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}