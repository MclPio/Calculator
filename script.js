function add(a,b) {
    return +a + +b;
}

function subtract(a,b) {
    return +a - +b;
}

function multiply(a,b) {
    return +a * +b;
}

function divide(a,b) {
    return +a / +b;
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

let n1;
let n2;
let o1;
let o2;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operators');

//console.log(n1,n2,o1,o2,numberButtons,operatorButtons);

numberButtons.forEach(number => number.addEventListener('click', () => {
    if (!n1) {
        n1 = number.textContent;
    } else if (n1 && !o1) {
        n1 += number.textContent;
    } else if (n1 && o1 && !n2) {
        n2 = number.textContent;
    } else if (n1 && o1 && n2) {
        n2 += number.textContent;
    }
    console.log(n1,n2);
}));

operatorButtons.forEach(operator => operator.addEventListener('click', () => {
    if (operator.textContent === "=") {
        if (n1 && n2 && o1) {
            n1 = operate(n1,n2,o1);
            n2 = null;
            o1 = null;
        }
    } else if (operator.textContent === "+" || operator.textContent === "-" || operator.textContent === "×" || 
    operator.textContent === "÷") {
        if (n1 && !o1) {
            o1 = operator.textContent;
        } else if (n1 && o1 && n2) {
            n1 = operate(n1,n2,o1);
            o1 = operator.textContent;
            n2 = null;
        }
    }
    console.log(n1,n2,o1);
}))