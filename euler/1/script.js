const checkMultiple = (num) => {
  if (num % 3 === 0 || num % 5 === 0) {
    return true;
  }
  return false;
};

const sumOfMultiples = (num) => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (checkMultiple(i)) {
      sum += i;
    }
  }
  return sum;
};
console.log(sumOfMultiples(1000));
