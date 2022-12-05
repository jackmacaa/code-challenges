import { data } from './data.mjs'

// PART 1
const sampleStacks = [
    ['Z', 'N'],
    ['M', 'C', 'D'],
    ['P']
]

const stacks = [
    ['B', 'G', 'S', 'C'],
    ['T', 'M', 'W', 'H', 'J', 'N', 'V', 'G'],
    ['M', 'Q', 'S'],
    ['B', 'S', 'L', 'T', 'W', 'N', 'M'],
    ['J', 'Z', 'F', 'T', 'V', 'G', 'W', 'P'],
    ['C', 'T', 'B', 'G', 'Q', 'H', 'S'],
    ['T', 'J', 'P', 'B', 'W'],
    ['G', 'D', 'C', 'Z', 'F', 'T', 'Q', 'M'],
    ['N', 'S', 'H', 'B', 'P', 'F']
]

const sampleMoves = 
`move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

// Generate moves to array
const sampleMovesArr = data.split('\n');
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

for (const moves of sampleMovesArrNums) {
    let amount = Number(moves[0]);
    const from = Number(moves[1]) - 1;
    const to = Number(moves[2]) - 1;

    while(amount > 0) {
        stacks[to].push((stacks[from].pop()));
        amount--;
    }
}

console.log(JSON.stringify(stacks))

