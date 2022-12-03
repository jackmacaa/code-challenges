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

let score = 0;
for (const letter of letters) {
    score += (prioritys.indexOf(letter) + 1)
}
console.log(score)