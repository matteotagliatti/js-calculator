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
const pointButton = document.getElementById('pointButton')

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint); // point button
window.addEventListener('keydown', handleKeyboardInput) // keyboard support

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
    resetOperand()
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
        if (operator === '=') return // remove error when press =
        currentOperation = operator;
        firstOperand = currentOperationScreen.textContent;
        currentOperationScreen.textContent = '0';
        lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    } else {
        if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
            alert("You can't divide by 0")
            return
        }
        secondOperand = currentOperationScreen.textContent;
        currentOperationScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
        lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`
        resetOperand()
    }
}

function resetOperand() {
    firstOperand = ''
    secondOperand = ''
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000 // 3 decimals
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

// Point Button
function appendPoint() {
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
}

// Keyboard Support
function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === 'Enter')
        evaluate(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === 'Enter') return '='
}