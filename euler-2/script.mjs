function fib(num) {
    if (num === 1 || num === 2) {
        return 1
    }

    return fib(num - 1) + fib(num - 2)
}

function fibBetterRecursive(num) {
    const memorize = {};

    function helper(num) {
        if (num in memorize) return memorize[num];
        if (num < 3) return 1;
        return memorize[num] = helper(num - 1) + helper(num - 2);
    }

    return helper(num);
}
console.time('fib')
let total = 0;
let current = 0;
let count = 1;

while(current < 4_000_000){
    current = fib(count)
    if(current % 2 === 0){
        total += current
    }
    count++;
}

console.log(total)
console.timeEnd('fib')