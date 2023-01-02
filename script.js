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
    let x;
    if (operator === "+") {
        x = add(a,b);
    } else if (operator === "-") {
        x = subtract(a,b);
    } else if (operator === "×") {
        x = multiply(a,b);
    } else if (operator === "÷") {
        x = divide(a,b);
    }
    x = Math.round((x+Number.EPSILON)*1000000)/1000000; 
    return x;
}

let n1;
let n2;
let o1;
let resultExist;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operators');
const display = document.querySelector('.display');
const AC = document.querySelector('.AC');
const DEL = document.querySelector('.DEL');
const keyList = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','.','Enter','Backspace', 'Escape','Delete']

function updateDisplay(content) {
    display.textContent = content;
}

function checkRepeat(string) {
    let count = (string.match(/\./g) || []).length
    return count;
}

function checkLength(value) {
    return value.length < 15;
}

numberButtons.forEach(number => number.addEventListener('click', () => {
    if (!n1) {
        n1 = number.textContent;
        updateDisplay(n1);
    } else if (n1 && !o1 && !resultExist && (checkRepeat(n1) === 0 || number.textContent !== '.') && checkLength(n1)) {
        n1 += number.textContent;
        updateDisplay(n1);
    } else if (n1 && o1 && !n2) {
        n2 = number.textContent;
        updateDisplay(n2);
    } else if (n1 && o1 && n2 && (checkRepeat(n2) === 0 || number.textContent !== '.') && checkLength(n2)) {
        n2 += number.textContent;
        updateDisplay(n2);
    }
    number.classList.toggle('clicked')
    function changeClass() {number.classList.toggle('clicked')};
    setTimeout(changeClass,100);
    
}));

operatorButtons.forEach(operator => operator.addEventListener('click', () => {
    if (operator.textContent === "=") {
        if (n1 && n2 && o1) {
            n1 = operate(n1,n2,o1);
            n2 = null;
            o1 = null;
            updateDisplay(n1);
            resultExist = true;
        }
    } else if (operator.textContent === "+" || operator.textContent === "-" || operator.textContent === "×" || 
    operator.textContent === "÷") {
        if (n1 && !o1) {
            o1 = operator.textContent;
        } else if (n1 && o1 && n2) {
            n1 = operate(n1,n2,o1);
            o1 = operator.textContent;
            n2 = null;
            updateDisplay(n1);
        }
    }
    operator.classList.toggle('clickedOperator')
    function changeClass() {operator.classList.toggle('clickedOperator')};
    setTimeout(changeClass,100);
}))

AC.addEventListener('click', () => {
    updateDisplay(0);
    n1 = null;
    n2 = null;
    o1 = null;
    resultExist = false;
    AC.classList.toggle('clickedAC')
    function changeClass() {AC.classList.toggle('clickedAC')};
    setTimeout(changeClass,100);
})

DEL.addEventListener('click', () => {
    if (display.textContent === n1) {
        if (n1.length > 1) {
            n1 = n1.slice(0,-1);
            updateDisplay(n1);
        } else if (n1.length = 1) {
            n1 = 0;
            updateDisplay(n1);
        }  
    } else if (display.textContent === n2) {
        if (n2.length > 1) {
            n2 = n2.slice(0,-1);
            updateDisplay(n2);
        } else if (n2.length = 1) {
            n2 = 0;
            updateDisplay(n2);
        }  
    }
    DEL.classList.toggle('clickedDEL')
    function changeClass() {DEL.classList.toggle('clickedDEL')};
    setTimeout(changeClass,100);
})

document.addEventListener('keydown', (event) => {
    console.log(event.key);
    numberButtons.forEach(number => {
        if (event.key === number.textContent) {
            number.click()
        }});
    operatorButtons.forEach(operator => {
        if (event.key === operator.textContent) {
            operator.click();
        } else if (event.key === 'Enter' && operator.textContent === '=') {
            operator.click();
        } else if (event.key === '*' && operator.textContent === '×') {
            operator.click();
        } else if (event.key === '/' && operator.textContent === '÷') {
            operator.click();
        }
    });
    if (event.key === 'Backspace' || event.key === 'Delete'){
        DEL.click();
    } else if (event.key === 'Escape') {
        AC.click()
    }
});