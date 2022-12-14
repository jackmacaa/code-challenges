import { buildTree } from "../lib.mjs";
import { data, input } from './data.mjs'

const tree = buildTree(input);
//console.log(tree)

// FUNCTIONS to count folder sizes - MINE
const addFolderSizes = (folders) => {
    if(folders.child.length === 0){
        return folders.size;
    } else {
        let sum = 0;
        for(let key in folders.child){
            sum += addFolderSizes(folders.child[key])
            const retVal = [sum, folders.child[key].isFolder, folders.child[key].name]
            if(retVal[1] && retVal[0] <= 100_000){
                console.log(retVal, ',')
            }
        }
        return sum
    }
}
// console.log('[');
// addFolderSizes(tree)
// console.log(']');

// Ash
const calculateFolders = (files) => {
    if(files.child.length === 0){
        const retVal = [files.isFolder ? 0 : files.size, files.isFolder]
        //console.log(JSON.stringify(retVal), ',');
        return retVal;
    }
    const childSizes = files.child.map(child => {
        const value = calculateFolders(child);
        if(value.includes(true)){
            if(value[1] < 100000 && value[1] > 2){
               //console.log(value)
            }
            return value[1];
        } else {
            return value[0]
        }
        
    });
    let childTotals = 0;
    for (let i = 0; i < childSizes.length; i++) {
        childTotals += childSizes[i];
    }
    const currentSize = files.isFolder ? 0 : files.size
    const retVal = [currentSize, childTotals, files.isFolder];
   // if(childTotals < 100000){
        console.log(JSON.stringify(retVal), ',');
    //}
    return retVal;
}
// console.log('[');
// calculateFolders(tree)
// console.log(']');

// Todds
function getFolderSize(item) {
    let size = item.size;
    console.log('size '+ item.size)
    size += item.child.reduce((acc, i) => {
        const folderSize = getFolderSize(i)
        return acc + folderSize
    },0);  

    return size
} 
// console.log('[');
// getFolderSize(tree)
// console.log(']');

// Array from finding folders sizes
const arr = [
    [ 98160, true ],
    [ 74360, true ],
    [ 79064, true ],
    [ 42692, true ],
    [ 17467, true ],
    [ 4415, true ],
    [ 34049, true ],
    [ 95526, true ],
    [ 27749, true ],
    [ 99990, true ],
    [ 7520, true ],
    [ 98780, true ],
    [ 98780, true ]
]

// counting up folder totals
//console.log(arr.reduce((sum, a) => sum + a[0], 0))

// console.log(sum)
// let count2 = 0;
// for(let i = 0; i < arr.length; i++){
//     count2 += arr[i][0]
// }
//console.log(count2)
