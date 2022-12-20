
function multiples(num) {
    if(num === 3){
        return 3
    }
    if(num % 3 === 0 || num % 5 === 0){
        return multiples(num - 1) + num
    }
    return multiples(num - 1)
}
console.log(multiples(999))
