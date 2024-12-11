import { data, stacksP1, stacksP2 } from './data.mjs'

const sampleStacks = [
    ['Z', 'N'],
    ['M', 'C', 'D'],
    ['P']
]

const sampleMoves = 
`move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

// Generate moves to array
const generateSampleMovesArr = (sample) => {
    const sampleMovesArr = sample.split('\n');
    const sampleMovesArrNums = [];
    for (const move of sampleMovesArr){
        const letters = move.split(' ');
        const count = [];
        for (const letter of letters) {
            const converted = parseInt(letter)
            if(!isNaN(converted)){
                count.push(converted)
            }
        }
        sampleMovesArrNums.push(count)
    }
    return sampleMovesArrNums
}
const sampleMovesArrNums = generateSampleMovesArr(data)

// PART 1
for (const moves of sampleMovesArrNums) {
    let amount = Number(moves[0]);
    const from = Number(moves[1]) - 1;
    const to = Number(moves[2]) - 1;

    while(amount > 0) {
        stacksP1[to].push((stacksP1[from].pop()));
        amount--;
    }
}
console.log(`Part 1: ${JSON.stringify(stacksP1)}`)

// PART 2
for (const moves of sampleMovesArrNums) {
    let amount = Number(moves[0]);
    const from = Number(moves[1]) - 1;
    const to = Number(moves[2]) - 1;

    const pickedUp = stacksP2[from].splice(-amount, amount);
    stacksP2[to].splice(stacksP2[to].length, 0, ...pickedUp )      
}

console.log(`Part 2: ${JSON.stringify(stacksP2)}`);