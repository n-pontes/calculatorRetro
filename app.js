// Selects all buttons
const calcBtn = document.querySelectorAll('.btn, .operator-btn');

// Create variable to hold display value, create variable of display area and populate
const displayArea = document.querySelector('#display');

// Stores the current value that is being displayed
displayArea.value = ''; // Use value instead of innerHTML for input

// Operator variable
let operator = null;

// Operator numbers
let num1 = null;
let num2 = null;

// Result
let result = null;

// Memory variable
let memory = 0;

// Displays the number clicked
const displayValue = () => {
    const outputText = (num1 !== null ? num1 : '') + 
                       (operator !== null ? ' ' + operator : '') + 
                       (num2 !== null ? '' + num2 : '');
    displayArea.value = outputText; // Correct for input
};

const operateBtn = (e) => {
    const btn = e.target.textContent;

    if (btn >= '0' && btn <= '9') {
        // If no operator, we're dealing with num1
        if (operator === null) {
            if (num1 === null) {
                num1 = parseInt(btn);
            } else {
                num1 = num1 * 10 + parseInt(btn);
            }
        } else {
            // If there's an operator, we're dealing with num2
            if (num2 === null) {
                num2 = parseInt(btn);
            } else {
                num2 = num2 * 10 + parseInt(btn);
            }
        }
        displayValue();
    } else if (btn === 'AC') {
        // Reset all values
        num1 = null;
        num2 = null;
        operator = null;
        memory = 0; // Clear memory on AC
        displayArea.value = ''; // Clear display
    } else if (btn === '=') {
        if (num1 !== null && num2 !== null && operator !== null) {
            result = operate(operator, num1, num2);
            displayArea.value = result; // Show result in display
            // Prepare for the next calculation
            num1 = result; 
            num2 = null;
            operator = null;
        }
    } else if (btn === 'DEL') {
        // Remove last digit logic
        if (num2 !== null) {
            num2 = Math.floor(num2 / 10);
        } else if (operator === null && num1 !== null) {
            num1 = Math.floor(num1 / 10);
        }
        displayValue();
    } else if (btn === '√') {
        if (operator === null && num1 !== null) {
            num1 = Math.sqrt(num1);
            displayArea.value = num1;
        } else if (num2 !== null) {
            num2 = Math.sqrt(num2);
            displayValue();
        }
    } else if (btn === '%') {
        if (num1 !== null && operator === null) {
            num1 = num1 / 100;
        } else if (num2 !== null) {
            num2 = (num2 / 100) * (num1 !== null ? num1 : 1);
        }
        displayValue();
    } else if (btn === 'MC') {
        memory = 0; // Clear memory
        console.log('Memory cleared');
    } else if (btn === 'MR') {
        displayArea.value = memory; // Recall memory
        // Reset for further calculations
        num1 = null;
        num2 = null;
        operator = null;
    } else if (btn === 'M-') {
        // Subtract the current display value from memory
        if (num1 !== null) {
            memory -= num1;
        } else if (num2 !== null) {
            memory -= num2;
        }
    } else if (btn === 'M+') {
        // Add the current display value to memory
        if (num1 !== null) {
            memory += num1;
        } else if (num2 !== null) {
            memory += num2;
        }
        // Reset num1, num2, and operator for next input
        num1 = null; 
        num2 = null;
        operator = null; 
        displayArea.value = ''; // Clear display after memory addition
    } else {
        operator = btn;
        displayValue();
    }
};

calcBtn.forEach((btn) => {
    btn.addEventListener("click", operateBtn);
});

// Addition function
const add = (num1, num2) => num1 + num2;

// Subtraction function
const sub = (num1, num2) => num1 - num2;

// Multiply function
const multiply = (num1, num2) => num1 * num2;

// Division function with zero check
const divide = (num1, num2) => {
    if (num2 === 0) {
        return "Cannot divide by zero";
    }
    return num1 / num2;
};

// Operate function - determines how calculator operates
const operate = (operator, num1, num2) => {
    let result;
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = sub(num1, num2);
            break;
        case '×':
            result = multiply(num1, num2);
            break;
        case '÷':
            result = divide(num1, num2);
            break;
        default:
            return "Invalid operator";
    }
    return result;
};

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    // Map the keys to their respective button actions
    if ('0123456789'.includes(key)) {
        operateBtn({ target: { textContent: key } });
    } else if (key === 'Enter' || key === '=') {
        operateBtn({ target: { textContent: '=' } });
    } else if (key === 'Backspace') {
        operateBtn({ target: { textContent: 'DEL' } });
    } else if (key === 'Escape') {
        operateBtn({ target: { textContent: 'AC' } });
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operateBtn({ target: { textContent: key === '*' ? '×' : key } });
    }
});