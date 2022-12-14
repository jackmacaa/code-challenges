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

const addFolderSizes = (folders) => {
    //console.log(JSON.stringify(folders))
    //console.log(folders)
    if(folders.child.length === 0){
        return folders.size;
    } else {
        let sum = 0;
        for(let key in folders.child){
            //console.log(folders.child[key])
            sum += addFolderSizes(folders.child[key])
            const retVal = [sum, folders.child[key].isFolder, folders.child[key].name]
            if(retVal[1] && retVal[0] <= 100_000){
                console.log(retVal, ',')
            }
           
        }
        return sum
    }

}
console.log('[');
addFolderSizes(folders[0])
console.log(']');

const calculateFolders = (files) => {
    if(files.child.length === 0){
        const retVal = [files.isFolder ? 0 : files.size, files.isFolder]
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

console.log(arr.reduce((sum, a) => sum + a[0], 0))
// const sum = arr.reduce((acc, curr, i) => acc + curr[1], 0)
// console.log(sum)

// let count2 = 0;
// for(let i = 0; i < arr.length; i++){
//     count2 += arr[i][0]
// }
//console.log(count2)
//console.log('[', calculateFolders(folders[0]), ']');

//console.log(JSON.stringify(folders) + ' ' + current)

