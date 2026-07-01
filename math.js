function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a > b && a != 0) {
        return a / b;
    } else if (a < b && b != 0) {
        return b / a;
    } else {
        return "Invalid input";
    }
}


module.exports = {
    add,
    subtract,
    multiply,
    divide
};