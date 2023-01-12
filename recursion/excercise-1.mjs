function recursive(num) {
    if (num === 0) {
        return num
    }
    console.log(num)
    return recursive(num - 1)
}
//console.log(recursive(5))

// Excercise: count for char in str
function charCount(str, char) {
    if (str === char) {
        return 1
    }
    if (str.length === 1) {
        return null;
    }
    if (str[0] === char) {
        return charCount(str.substring(1), char) + 1
    }

    return charCount(str.substring(1), char)
}
//console.log(charCount('jaba', 'a'))

// Excercise: reverse string
function reverseString(str) {
    if (str === "") {
        return str
    }
    return reverseString(str.slice(1)) + str[0]
}
//console.log(reverseString('freeCodeCamp'))

// Sum all numbers till given one
function sumTo(num) {
    if (num === 1) {
        return num
    }
    return sumTo(num - 1) + num;
}
//console.log(sumTo(5))

// Calculate factorial
// function factorial(num) {
//     if (num === 1) {
//         return num
//     }
//     return factorial(num - 1) * num;
// }
//console.log(factorial(5))

// Fibonacci Bad
console.time('FibBad')
function fibBad(num) {
    if (num === 1 || num === 2) {
        return 1
    }

    return fibBad(num - 1) + fibBad(num - 2)
}
// console.log(fibBad(45))
// console.timeEnd('FibBad')

// Fibonacci Better Recusive
// console.time('fibBetterRecursive')
function fibBetterRecursive(num) {
    const memorize = {};

    function helper(num) {
        if (num in memorize) return memorize[num];
        if (num < 3) return 1;
        return memorize[num] = helper(num - 1) + helper(num - 2);
    }

    return helper(num);
}
// console.log(fibBetterRecursive(45))
// console.timeEnd('fibBetterRecursive')

// Fibonacci Better Loop
// console.time('fibBetterLoop')
function fibBetter(n) {
    let a = 1;
    let b = 1;

    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }

    return b;
}
// console.log(fibBetter(45))
// console.timeEnd('fibBetterLoop')

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

// Print the linked list elements 1 by 1
function printList(list) {
    if (list.next === null) {
        return console.log(list.value)
    } else {
        return printList(list.next) + console.log(list.value)
    }
}
//printList(list)

function factorial(num) {
    if(num === 1) return num

    return factorial(num - 1) * num
}

//console.log(factorial(30))

