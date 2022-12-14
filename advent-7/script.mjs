import { buildTree } from "../lib.mjs";
import { data, input, crazy } from './data.mjs'

const tree = buildTree(crazy);
console.log(JSON.stringify(tree))

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
const arr2 = [];
const calculateFolders = (files) => {
    if(files.child.length === 0){
        const retVal = [files.isFolder ? 0 : files.size, files.isFolder]
        //console.log(JSON.stringify(retVal), ',');
        return retVal;
    }
    const childSizes = files.child.map(child => {
        const value = calculateFolders(child);
        //console.log({value})
        if(value.includes(true)){
            if(value[1] < 100000){
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
    const retVal = [currentSize, childTotals, files.isFolder, files.name];
    console.log(retVal)
    //if(childTotals < 100000){
        arr2.push(retVal);
    //}
    return retVal;
}
// console.log('[');
calculateFolders(tree)
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
    [0,98160,true,"/ddpgzpc/zffbmlbd/bqpwdh/lfhgjw/ndrcgmd"] ,
    [0,98160,true,"/ddpgzpc/zffbmlbd/bqpwdh/lfhgjw"] ,
    [0,74360,true,"/ddpgzpc/zffbmlbd/zfhnw/dtgnbb"] ,
    [0,69870,true,"/rglgbsq/rpz/zfhnw/vpdbrh"] ,
    [0,80203,true,"/wlqhpwqv/ffw/npgnwwf/gcq"] ,
    [0,79064,true,"/wlqhpwqv/lpzgcrd/gcwg/bqpwdh"] ,
    [0,11300,true,"/wlqhpwqv/lpzgcrd/gcwg/vqp/nts"] ,
    [0,42692,true,"/wlqhpwqv/lpzgcrd/gcwg/vqp/rlbhdgm/bzd/bqpwdh/btb/rqftrtb/pjqwq/fpb"] ,
    [0,42692,true,"/wlqhpwqv/lpzgcrd/gcwg/vqp/rlbhdgm/bzd/bqpwdh/btb/rqftrtb/pjqwq"] ,
    [0,17467,true,"/wlqhpwqv/lpzgcrd/gcwg/vqp/rlbhdgm/bzd/bqpwdh/btb/rqftrtb/zfhnw/bqpwdh"] ,
    [0,17467,true,"/wlqhpwqv/lpzgcrd/gcwg/vqp/rlbhdgm/bzd/bqpwdh/btb/rqftrtb/zfhnw"] ,
    [0,4415,true,"/wlqhpwqv/lpzgcrd/gcwg/vqp/rlbhdgm/bzd/wmtdbrqm/lngc"] ,
    [0,34049,true,"/wlqhpwqv/lpzgcrd/vpdbrh/pjqwq/fgbqzm/spsz"] ,
    [0,34049,true,"/wlqhpwqv/lpzgcrd/vpdbrh/pjqwq/fgbqzm"] ,
    [0,84883,true,"/wlqhpwqv/lpzgcrd/vpdbrh/pjqwq/phf"] ,
    [0,95526,true,"/wlqhpwqv/lszdbd/cpqpvbz/wmpsvm/bqpwdh"] ,
    [0,95526,true,"/wlqhpwqv/lszdbd/cpqpvbz/wmpsvm"] ,
    [0,11720,true,"/wlqhpwqv/pjqwq/jsdbnwrc"] ,
    [0,67639,true,"/wlqhpwqv/pjqwq/pcjfjsgs/ssq"] ,
    [0,27749,true,"/wlqhpwqv/pjqwq/pcjfjsgs/vpdbrh/qtj/szjtvcb/stbczmlq/nhq"] ,
    [0,27749,true,"/wlqhpwqv/pjqwq/pcjfjsgs/vpdbrh/qtj/szjtvcb/stbczmlq"] ,
    [0,99990,true,"/wlqhpwqv/pjqwq/vllzsh/nlwwrz"] ,
    [0,7520,true,"/wlqhpwqv/pjqwq/vllzsh/zhmwl/hbpps"] ,
    [0,56573,true,"/wlqhpwqv/ppf/drszpqf/pjqwq/pqm"] ,
    [0,81223,true,"/wlqhpwqv/ppf/drszpqf/qtblb"] ,
    [0,98780,true,"/wlqhpwqv/ppf/fbs/gpttw/bqpwdh"] ,
    [0,98780,true,"/wlqhpwqv/ppf/fbs/gpttw"] ,
    [0,98780,true,"/wlqhpwqv/ppf/fbs"] ,
    [0,64573,true,"/wlqhpwqv/ppf/tfjnj/vljqlw/pjqwq/vwp/fhrfrbqg"] ,
    [0,9583,true,"/wlqhpwqv/vpdbrh/qzmz"] ,
    [0,56885,true,"/wlqhpwqv/zfhnw/pmdsb/pjqwq"] ,
    ]

// counting up folder totals
console.log(arr2.reduce((sum, a) => sum + a[1], 0))

// console.log(sum)
// let count2 = 0;
// for(let i = 0; i < arr.length; i++){
//     count2 += arr[i][1]
// }
// console.log(count2)
