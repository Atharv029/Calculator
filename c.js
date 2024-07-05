const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === 'AC') {
            clearAll();
        } else if (value === 'DEL') {
            deleteLastChar();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            handleOperator(value);
        } else {
            appendNumber(value);
        }

        updateDisplay();
    });
});

function clearAll() {
    currentValue = '';
    operator = '';
    previousValue = '';
}

function deleteLastChar() {
    currentValue = currentValue.slice(0, -1);
}

function appendNumber(number) {
    if (number === '.' && currentValue.includes('.')) return;
    currentValue += number;
}

function handleOperator(op) {
    if (currentValue === '') return;
    if (previousValue !== '') {
        calculate();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate() {
    if (previousValue === '' || currentValue === '') return;
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = (prev / 100) * current;
            break;
        default:
            return;
    }
    currentValue = result.toString();
    operator = '';
    previousValue = '';
}

function updateDisplay() {
    display.value = currentValue;
}