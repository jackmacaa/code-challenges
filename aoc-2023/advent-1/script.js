import { food, foodSmall }  from './data.js'

const findMostFood = (food) => {
    const elves = food.split('\n');

    let calories = 0;
    let count = 0;
    
    for (const elf of elves) {
    
        if(elf === ""){
            count = 0;
            continue;    
        }
        count += Number(elf);
    
        if(count > calories){
            calories = count;
        }
    }
    return calories
}
console.log(`Most food: ${findMostFood(food)}`);

const findTopFewFood = function (food) {
    const elves = food.split('\n');
    const arr = [];
    let count = 0;
    for (const elf of elves) {
        if(elf === ""){
            arr.push(count)
            count = 0;
            continue;    
        }
        count += Number(elf);
    }
    const sortedArr = arr.sort().reverse();
    
    return sortedArr[0] + sortedArr[1] + sortedArr[2];
};

console.log(`Top 3 food: ${findTopFewFood(food)}`);