const ONE = document.querySelector('.one');
const TWO = document.querySelector('.two');
const THREE = document.querySelector('.three');
const FOUR = document.querySelector('.four');
const FIVE = document.querySelector('.five');
const SIX = document.querySelector('.six');
const SEVEN = document.querySelector('.seven');
const EIGHT = document.querySelector('.eight');
const NINE = document.querySelector('.nine');
const ZERO = document.querySelector(".zero");
const DELETE = document.querySelector('.delete');
const RESET = document.querySelector('.reset');
const EQUAL = document.querySelector('.equal');
const POINT = document.querySelector('.point');
const PLUS = document.querySelector('.plus');
const MINUS = document.querySelector('.minus');
const MULTIPLICATION = document.querySelector('.multiplication');
const DIVISION = document.querySelector('.division');
const OUTPUT =  document.querySelector('.output-area');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
numbers.forEach(element => {
    element.addEventListener('click', function() {
        if (parseInt(OUTPUT.innerHTML.charAt(0)) == 0) {
            clearOutputIncludingZero();
        }
        OUTPUT.innerHTML += element.innerHTML;
    }) 
});

DELETE.addEventListener('click', function() {
    OUTPUT.innerHTML = OUTPUT.innerHTML.slice(0, -1);
})

POINT.addEventListener('click', function() {
    OUTPUT.innerHTML += '.';
})

operators.forEach(element => {
    let output = OUTPUT.innerHTML.split('');
    if (output.includes('-') || output.includes('+') || output.includes('x') || output.includes('/')) {
        OUTPUT.innerHTML = calculate();
    }
    element.addEventListener('click', function() {
        if (!handleTwoOperatorsRow()) {
            return;
        }
        OUTPUT.innerHTML += element.innerHTML;
    })
})

EQUAL.addEventListener('click', function() {
    OUTPUT.innerHTML = calculate();
})

RESET.addEventListener('click', clearOutput)

function calculate() {
    let str = OUTPUT.innerHTML; 
    let variables = [];
    let whereItLeftOff = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '+' || str[i] == "-" || str[i] == 'x' || str[i] == '/') {
            let variable = parseFloat(str.substring(whereItLeftOff, i));
            whereItLeftOff = i + 1;
            variables.push(variable);
        }
        if (i == str.length - 1) {
            let variable = parseFloat(str.substring(whereItLeftOff, str.length));
            variables.push(variable);
        }
    }
    if (str.includes('-')) {
        return variables[0] - variables[1];
    } 
    if (str.includes('+')) {
        return variables[0] + variables[1];
    }
    if (str.includes('x')) {
        return variables[0] * variables[1];
    }
    if (str.includes('/')) {
        return variables[0] / variables[1];
    }
    
}

function handleTwoOperatorsRow() {
    const str = OUTPUT.innerHTML;
    let charBeforeLast = isOperator(str.charAt(str.length - 1)) ? str.charAt(str.length - 1) : 0;
    if (isOperator(charBeforeLast)) {
        return false;
    } else {
        return true;
    }
}

function isOperator(char) {
    if (char === '-' || char === '+' || char === '/' || char === 'x') {
        return true;
    } else {
        return false;
    }
}

function clearOutput() {
    OUTPUT.innerHTML = '0';
}

function clearOutputIncludingZero() {
    OUTPUT.innerHTML = '';
}