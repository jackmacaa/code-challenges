// 1, 3, 6, 10
console.time("generateTriangleNums");

const divisor = (count, num, divisors) => {
  if(count > num) {
    return divisors;
  }

  if(num % count === 0) {
    divisors.push(count)
  }

  return divisor(count+1, num, divisors)
}

const triangleNums = [];
const generateTriangleNums = (num, triangleNums, count) => {
  if (count === num) {
    return;
  }
  let sum = 0;
  for (let i = 1; i <= count + 1; i++) {
    sum += i;
  }
  count++;
  if(divisor(1, sum, []).length > 30){
    triangleNums.push(sum);
  }
  return generateTriangleNums(num, triangleNums, count);
};

const trinums = generateTriangleNums(1000, triangleNums, 0);
console.log(triangleNums)

console.timeEnd("generateTriangleNums");
console.log("here");


//console.log(divisor(1, 6,[]));