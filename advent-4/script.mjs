import { data } from './data.mjs'

// PART 1
const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
12-80,12-81`;

const pairs = sample.split('\n');
const createElfSequence = (elf) => {
    const elf1Seq = [];
    for(let i = elf[0]; i <= elf[1]; i++){
        elf1Seq.push(i)
    }
    return elf1Seq
}

let count = 0;
for (const pair of pairs) {
    const elves = pair.split(',')
    const elf1 = elves[0].split('-');
    const elf2 = elves[1].split('-');

    const elf1Seq = createElfSequence(elf1);
    const elf2Seq = createElfSequence(elf2);
   // console.log(`elf1: ${elf1}`)
    //console.log(`elf2: ${elf2}`)
    let checkElf = false;
    // check if nums in elf1 are all in elf2
    for(let i = 0; i <= elf1Seq.length; i++) {
        if(!elf2Seq.includes(elf1Seq[i])) {
            break;
        }
        //console.log(`elf1: ${elf1}`)
        //console.log(`elf2: ${elf2}`)
        checkElf = true;
    }

    // check if nums in elf2
    for(let i = 0; i <= elf2Seq.length; i++) {
        if(!elf1Seq.includes(elf2Seq[i])) {
            break;
        }
        checkElf = true;
    }

    if(checkElf){
            console.log(`elf1: ${elf1}`)
    console.log(`elf2: ${elf2}`)
        count++;
    }
    
}
console.log(count)



// let count = 0;
// for (const pair of pairs) {
//     const elf = pair.split(',')
//     const elve1 = elf[0].split('-');
//     const elve2 = elf[1].split('-');

//     if(elve1[0] <= elve2[0] && elve1[1] >= elve2[1]){
//         count++;
//         console.log(elf)
//         continue;
//     }
//     if(elve2[0] <= elve1[0] && elve2[1] >= elve1[1]){
//         count++;
//         console.log(elf)
//         continue;
//     }
// }
// console.log(count)