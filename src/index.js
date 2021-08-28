function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    console.log(expr);
    //formatting string
    let formattedStr = '';
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '+' ||
            expr[i] === '-' ||
            expr[i] === '*' ||
            expr[i] === '/' ||
            expr[i] === '(' ||
            expr[i] === ')'
        ) {
            formattedStr += ` ${expr[i]} `;
        } else {
            formattedStr += expr[i];
        };
    }

    const strArr = formattedStr.split(' ');
    strArr.unshift('#');
    strArr.push('#');

    const filterStrArr = strArr.filter(item => item.length > 0);

    const formattedArray = filterStrArr.map(el => {
        if (!isNaN(Number(el))) {
            return Number(el)
        } else {
            return el;
        }
    })

    const california = [];
    const texas = [];
    texas.push(formattedArray[0]);

    formattedArray.forEach(item => {
        if (typeof item === 'number') {
            california.push(item);
        } else if (item === '(') {
            texas.push(item);
        } else if (item === '+' || item === '-') {
            for (let i = texas.length - 1; i >= 0; i--) {
                if (texas[texas.length - 1] === '+' ||
                    texas[texas.length - 1] === '-' ||
                    texas[texas.length - 1] === '*' ||
                    texas[texas.length - 1] === '/') {
                    california.push(texas[texas.length - 1]);
                    texas.pop();
                } else {
                    texas.push(item);
                    break;
                }
            }
        } else if (item === '*' || item === '/') {
            for (let i = texas.length - 1; i >= 0; i--) {
                if (texas[texas.length - 1] === '*' ||
                    texas[texas.length - 1] === '/') {
                    california.push(texas[texas.length - 1]);
                    texas.pop();
                } else {
                    texas.push(item);
                    break;
                }
            }
        } else if (item === ')') {
            for (let i = texas.length - 1; i >= 0; i--) {
                if (texas[texas.length - 1] === '+' ||
                    texas[texas.length - 1] === '-' ||
                    texas[texas.length - 1] === '*' ||
                    texas[texas.length - 1] === '/') {
                    california.push(texas[texas.length - 1]);
                    texas.pop();
                } else if (texas[texas.length - 1] === '(') {
                    texas.pop();
                    break;
                } else {
                    throw 'ExpressionError: Brackets must be paired';
                }
            }
        } else if (item === '#') {
            for (let i = texas.length - 1; i >= 0; i--) {
                if (texas[texas.length - 1] === '+' ||
                    texas[texas.length - 1] === '-' ||
                    texas[texas.length - 1] === '*' ||
                    texas[texas.length - 1] === '/') {
                    california.push(texas[texas.length - 1]);
                    texas.pop();
                }
            }
            if (texas.length > 1) {
                throw 'ExpressionError: Brackets must be paired';
            }
        }
    })

    let result = [];
    california.forEach((item, i) => {
        if (typeof item === 'number') {
            result.push(item);
        } else if (item === '+') {
            let sum = 0;
            sum = result[result.length - 2] + result[result.length - 1];
            result.splice(result.length - 2, 2)
            result.push(sum);
        } else if (item === '-') {
            let sum = 0;
            sum = result[result.length - 2] - result[result.length - 1];
            result.splice(result.length - 2, 2)
            result.push(sum);
        } else if (item === '*') {
            let sum = 0;
            sum = result[result.length - 2] * result[result.length - 1];
            result.splice(result.length - 2, 2)
            result.push(sum);
        } else if (item === '/') {
            if (result[result.length - 1] === 0) throw 'TypeError: Division by zero.'
            let sum = 0;
            sum = result[result.length - 2] / result[result.length - 1];
            result.splice(result.length - 2, 2)
            result.push(sum);
        }
    })
    return result[0];
}

module.exports = {
    expressionCalculator
}