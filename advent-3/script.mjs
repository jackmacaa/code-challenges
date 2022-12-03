import { data } from './data.mjs'
const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
// PART 1
const prioritys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ruckSacks = data.split('\n')

const letters = [];
for (const bag of ruckSacks) {
    const start  = bag.slice(0, bag.length / 2)
    const end = bag.slice(bag.length / 2, bag.length)

    for(let i = 0; i < start.length; i++) {
        if(end.includes(start[i])) {
            letters.push(start[i])
            break;
        }
    }

}
const calculatePriorityScore = (letters) => {
    let score = 0;
    for (const letter of letters) {
        score += (prioritys.indexOf(letter) + 1)
    }
    return score
}

console.log(`day 1: ${calculatePriorityScore(letters)}`)

// PART 2
const input2 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const letters2 = [];
const ruckSacks2 = data.split('\n')

for(let i = 0; i < ruckSacks2.length; i+=3) {

    for(let j = 0; j < ruckSacks2[i].length; j++) {
        if(ruckSacks2[i+2]) {
            if(ruckSacks2[i+1].includes(ruckSacks2[i][j]) && ruckSacks2[i+2].includes(ruckSacks2[i][j])) {
                letters2.push(ruckSacks2[i][j]);
                break;
            }
        }
    }
}

console.log(`day 2: ${calculatePriorityScore(letters2)}`)