console.log('tt')
function recursive(num){
    if(num === 0){
        return num
    }
    console.log(num)
    return recursive(num - 1)
}
//console.log(recursive(5))

function findSolution(target) {
    function find(current, history) {
        if (current == target) {
            return history;
        } else if (current > target) {
            return null;
        } else {
             return find(current + 5, `(${history} + 5)`) ||
                    find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}  
// console.log(findSolution(24));

// Excercise: count for char in str
function charCount(str, char){
    if(str === char){
        return 1
    }
    if(str.length === 1){
        return null;
    }
    if(str[0] === char){
        return charCount(str.substring(1), char) + 1
    }

    return charCount(str.substring(1), char)
}
//console.log(charCount('jaba', 'a'))

// Excercise: reverse string
function reverseString(str){
    if(str === ""){
        return str
    }
    return reverseString(str.slice(1)) + str[0]
}
//console.log(reverseString('freeCodeCamp'))
