let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if(isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null) {
                return
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1) {
                buffer = '0';
            }
            else {buffer = buffer.substring(0, buffer.length - 1);}
            break;
        case '.':
            if(buffer === '0') {
                buffer = '0.';
            } else if(buffer.indexOf('.') === -1) {
                buffer += '.';
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
        case '%':
        case '√': 
            handleMath(symbol);
            break;
    }
}


function handleMath(symbol) {
    if(buffer === '0') {
        return;
    }
    const flBuffer = parseFloat(buffer);
    if(runningTotal === 0) {
        runningTotal = flBuffer;
    }
    else {
        flushOperation(flBuffer)
    }
    previousOperator = symbol;
    buffer = '';
}


function flushOperation(flBuffer) {
    if (previousOperator === '+') {
        runningTotal += flBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= flBuffer;
    } else if(previousOperator === '×') {
        runningTotal *= flBuffer
    } else if (previousOperator === '÷'){
            runningTotal /= flBuffer
    } else if (previousOperator === '%') {
        runningTotal = runningTotal / 100 * flBuffer;
    } else if (previousOperator === '√') {
        runningTotal = runningTotal ** (1 / flBuffer);
    }
    runningTotal = parseFloat(runningTotal.toFixed(4));
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else if(buffer.length <= 15){
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}
init();