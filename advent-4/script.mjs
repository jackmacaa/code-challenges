import { data } from './data.mjs'

// PART 1
const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
12-80,12-81`;

const pairs = data.split('\n');

let count = 0;
for (const pair of pairs) {
    const elf = pair.split(',')
    const elve1 = elf[0].split('-');
    const elve2 = elf[1].split('-');

    if(elve1[0] <= elve2[0] && elve1[1] >= elve2[1]){
        count++;
        console.log(elf)
        continue;
    }
    if(elve2[0] <= elve1[0] && elve2[1] >= elve1[1]){
        count++;
        console.log(elf)
        continue;
    }
}
console.log(count)