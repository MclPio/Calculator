function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(a,b,operator) {
    if (operator === "+") {
        return add(a,b);
    } else if (operator === "-") {
        return subtract(a,b);
    } else if (operator === "×") {
        return multiply(a,b);
    } else if (operator === "÷") {
        return divide(a,b);
    }
}

const numberButtons = document.querySelectorAll('.number');
const display = document.querySelector('.display');
let input = '';
let userInput = numberButtons.forEach((item) => {
    item.addEventListener('click', () => {
    input+=item.textContent
    display.textContent = input;
})});