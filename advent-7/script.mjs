import { data, input } from './data.mjs'

const findSelected = (folders, previous) => {
    //console.log({previous})
    let found = folders.child.find(element => element.name === previous)
    //console.log({found})
    if(found){
        if(found.isFolder === true){
            return found
        }
    }

    for(let key in folders.child){
        if(folders.child.length > 0){
           found =  findSelected(folders.child[key], previous)
        }
        if(found){
            return found
        }
    }
}
// PART 1
const commands = data.split('\n')
let folders = []
let current = '';
let previous = '';

for(const cmd of commands) {
    const regex$ = new RegExp(/[$]/gm)
    const regexCd = new RegExp(/[cd]/gm)
    const regexCdName = new RegExp(/[a-z]+$/gm)
    const regexCmdSlash = new RegExp(/[\/]+$/gm)
    if(regex$.test(cmd)) {
        if(regexCd.test(cmd)) {
            // finds letters
            const folderName = cmd.match(regexCdName)
                // when cd x is found swaps current to x
                if(folderName) {
                    //console.log({previous})
                    current = folderName[0]
                    if(previous === '/'){
                        previous += `${current}`
                    } else {
                        previous += `/${current}`
                    }
                } else {
                    // finds symbols like / or ..
                    const command = cmd.match(regexCmdSlash)
                    if(command){
                        folders.push({
                            name: command[0],
                            isFolder: true,
                            size: 0,
                            parent: '',
                            child : []  
                        })
                        current = command[0]
                        previous += current
                    } else {
                        const remove = previous.split('/')
                        const len =  remove.length - 1;
                        previous = previous.replace('/' + remove[len], '')
                    }
                }
                
        } else {
            //console.log('found command ' + cmd)
        }

    } else {
        let selected = folders.find(element => element.name === current)
        if(!selected) {
            selected = findSelected(folders[0], previous);
        }
        // checking if is dir or file
        if(cmd.startsWith('dir')){
            // creates folder in current dir
            const folder = cmd.match(regexCdName)
            if(selected){
                selected.child.push({
                    name: selected.name === '/' ? previous + folder[0] : previous + '/' + folder[0],
                    isFolder: true,
                    size: 0,
                    parent: previous,
                    child : [],
                })
            }
        } else {
            // creates file in current dir
            const files = cmd.split(' ');
            if(selected){
                selected.child.push({
                    name:  selected.name === '/' ? previous + files[1] : previous + '/' + files[1],
                    isFolder: false,
                    size: Number(files[0]),
                    child: [],
                    parent: previous
                })
            }
            //console.log(JSON.stringify(selected))
        }  
    }

}
//console.log('FOLDERS ' + JSON.stringify(folders[0]))

const calculateFolders = (files) => {
    if(files.child.length === 0){
        const retVal = [files.isFolder ? 0 : files.size, files.isFolder, files.name]
        //console.log(JSON.stringify(retVal), ',');
        return retVal;
    }

    const childSizes = files.child.map(child => {
        const value = calculateFolders(child);
        //console.log(child)
        if(value.includes(true)){
            if(value[1] < 100000 && value[1] > 2){
               //console.log(value)
            }
            return value[1];
        } else {
            return value[0]
        }
        
    });
    //console.log(childSizes , files.name)

    let childTotals = 0;
    for (let i = 0; i < childSizes.length; i++) {
        childTotals += childSizes[i];
    }
    //console.log(files.isFolder)

    const currentSize = files.isFolder ? 0 : files.size
    const retVal = [currentSize, childTotals, files.isFolder];
   // if(childTotals < 100000){
        console.log(JSON.stringify(retVal), ',');
    //}

    return retVal;
}

function getFolderSize(item) {
    let size = item.size;
    console.log('size '+ item.size)
    // if(item.isFolder){
    //     return size
    // }
    size += item.child.reduce((acc, i) => {
        const folderSize = getFolderSize(i)
        //console.log(folderSize, ',', item)
        return acc + folderSize
    },0);
    //if(size < 100000) console.log(size, ',')
    
    return size
  } 

// console.log('[');
// calculateFolders(folders[0])
// console.log(']');

const arr =[
    [0,102897,true] ,
    [0,190433,true] ,
    [0,98160,true] ,
    [0,98160,true] ,
    [0,815510,true] ,
    [0,1131772,true] ,
    [0,234394,true] ,
    [0,334790,true] ,
    [0,334790,true] ,
    [0,711861,true] ,
    [0,1038307,true] ,
    [0,184138,true] ,
    [0,2175544,true] ,
    [0,299311,true] ,
    [0,299311,true] ,
    [0,299311,true] ,
    [0,3492509,true] ,
    [0,178616,true] ,
    [0,178616,true] ,
    [0,135690,true] ,
    [0,833457,true] ,
    [0,74360,true] ,
    [0,249239,true] ,
    [0,6835091,true] ,
    [0,7431308,true] ,
    [0,116424,true] ,
    [0,293185,true] ,
    [0,101783,true] ,
    [0,1358798,true] ,
    [0,191594,true] ,
    [0,222384,true] ,
    [0,154286,true] ,
    [0,275256,true] ,
    [0,275314,true] ,
    [0,550570,true] ,
    [0,363923,true] ,
    [0,276258,true] ,
    [0,100504,true] ,
    [0,100504,true] ,
    [0,625922,true] ,
    [0,902180,true] ,
    [0,121117,true] ,
    [0,103619,true] ,
    [0,186274,true] ,
    [0,693581,true] ,
    [0,218938,true] ,
    [0,139398,true] ,
    [0,1812905,true] ,
    [0,484606,true] ,
    [0,295983,true] ,
    [0,69870,true] ,
    [0,3048336,true] ,
    [0,3613465,true] ,
    [0,226232,true] ,
    [0,226232,true] ,
    [0,847488,true] ,
    [0,7132763,true] ,
    [0,194389,true] ,
    [0,214846,true] ,
    [0,309790,true] ,
    [0,80203,true] ,
    [0,139171,true] ,
    [0,262693,true] ,
    [0,654488,true] ,
    [0,583574,true] ,
    [0,202111,true] ,
    [0,216516,true] ,
    [0,529956,true] ,
    [0,732067,true] ,
    [0,134552,true] ,
    [0,1450193,true] ,
    [0,2319527,true] ,
    [0,79064,true] ,
    [0,1084023,true] ,
    [0,437283,true] ,
    [0,545897,true] ,
    [0,11300,true] ,
    [0,256159,true] ,
    [0,42692,true] ,
    [0,42692,true] ,
    [0,17467,true] ,
    [0,17467,true] ,
    [0,316318,true] ,
    [0,316319,true] ,
    [0,676059,true] ,
    [0,182507,true] ,
    [0,278562,true] ,
    [0,278562,true] ,
    [0,278562,true] ,
    [0,233744,true] ,
    [0,4415,true] ,
    [0,145902,true] ,
    [0,790177,true] ,
    [0,1019966,true] ,
    [0,2858560,true] ,
    [0,239541,true] ,
    [0,505373,true] ,
    [0,505373,true] ,
    [0,3668874,true] ,
    [0,271019,true] ,
    [0,116832,true] ,
    [0,4613922,true] ,
    [0,6715631,true] ,
    [0,309983,true] ,
    [0,569889,true] ,
    [0,273185,true] ,
    [0,546578,true] ,
    [0,608081,true] ,
    [0,467190,true] ,
    [0,103799,true] ,
    [0,34049,true] ,
    [0,34049,true] ,
    [0,84883,true] ,
    [0,558606,true] ,
    [0,1318852,true] ,
    [0,119932,true] ,
    [0,1073747,true] ,
    [0,11384753,true] ,
    [0,262150,true] ,
    [0,95526,true] ,
    [0,95526,true] ,
    [0,357676,true] ,
    [0,170454,true] ,
    [0,170454,true] ,
    [0,1066912,true] ,
    [0,1595042,true] ,
    [0,331953,true] ,
    [0,11720,true] ,
    [0,441808,true] ,
    [0,67639,true] ,
    [0,190512,true] ,
    [0,27749,true] ,
    [0,27749,true] ,
    [0,121742,true] ,
    [0,121742,true] ,
    [0,312254,true] ,
    [0,1016747,true] ,
    [0,99990,true] ,
    [0,7520,true] ,
    [0,288919,true] ,
    [0,288919,true] ,
    [0,288919,true] ,
    [0,296439,true] ,
    [0,633722,true] ,
    [0,2161252,true] ,
    [0,351555,true] ,
    [0,421140,true] ,
    [0,522075,true] ,
    [0,56573,true] ,
    [0,999788,true] ,
    [0,81223,true] ,
    [0,1272403,true] ,
    [0,98780,true] ,
    [0,98780,true] ,
    [0,98780,true] ,
    [0,260447,true] ,
    [0,150713,true] ,
    [0,540148,true] ,
    [0,570920,true] ,
    [0,257441,true] ,
    [0,64573,true] ,
    [0,322014,true] ,
    [0,322014,true] ,
    [0,1210743,true] ,
    [0,3039257,true] ,
    [0,5049879,true] ,
    [0,9583,true] ,
    [0,485748,true] ,
    [0,119310,true] ,
    [0,263172,true] ,
    [0,56885,true] ,
    [0,320057,true] ,
    [0,312253,true] ,
    [0,312253,true] ,
    [0,475893,true] ,
    [0,843511,true] ,
    [0,1389721,true] ,
    [0,2051516,true] ,
    [0,2478168,true] ,
    [0,26403444,true] ,
    [0,42917548,true] ,
    ]
    
    
      
// const sum = arr.reduce((acc, curr, i) => acc + curr[1], 0)
// console.log(sum)
// let count2 = 0;
// for(let i = 0; i < arr.length; i++){
//     if(arr[i][1] < 100000){
//         count2 += arr[i][1]
//     }

// }
// console.log(count2)
//console.log('[', calculateFolders(folders[0]), ']');

//console.log(JSON.stringify(folders) + ' ' + current)

