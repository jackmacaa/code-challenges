function findTrailingZeros(n) { // https://mathworld.wolfram.com/Factorial.html
    if(n < 0) return -1; 
    let count = 0;

    for (let i = 5; Math.floor(n / i) > 0; i *= 5) {
        console.log( Math.floor(n / i))
        console.log(n / i)
        count += Math.floor(n / i);
    }
 
    return count;
}
console.log(findTrailingZeros(1001))