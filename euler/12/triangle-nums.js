const divisor = (num) => {
    let div = 2;
    let count = 1;

    while(num > 1) {
        let exp = 0;

        while(num % div === 0) {
            num /= div;
            exp++;
        }
        count *= (exp + 1);
        div++;
    }
    return count;
}

const generateTriangleNums = () => {
    for(let i = 1; ; i++) {
        const trig = (i * (i + 1)) / 2;
        
          if(divisor(trig) > 500 ) {
            return trig;
         }
    }
};

const triangleNums = generateTriangleNums();

console.log(triangleNums);

