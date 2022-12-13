import { data, input } from './data.mjs'

const findSelected = (folders, current) => {
    let found = folders.child.find(element => element.name === current)
    if(found){
        if(found.isFolder === true){
            return found
        }
    }

    for(let key in folders.child){
        if(folders.child.length > 0){
           found =  findSelected(folders.child[key], current)
        }
        if(found){
            return found
        }
    }
}
// PART 1
const commands = input.split('\n')
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
            selected = findSelected(folders[0], current);
        }
        // checking if is dir or file
        if(cmd.startsWith('dir')){
            // creates folder in current dir
            const folder = cmd.match(regexCdName)
            if(selected){
                selected.child.push({
                    name: folder[0],
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
                    name: files[1],
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
    const retVal = ['size ' + currentSize, childTotals, files.isFolder, files.name];
    console.log(JSON.stringify(retVal), ',');
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

console.log('[');
getFolderSize(folders[0])
console.log(']');

const arr = [
    [ 0, 42692, true, 'fpb' ],
    [ 0, 34049, true, 'spsz' ],
    [ 0, 34049, true, 'fgbqzm' ],
    [ 0, 84883, true, 'phf' ],
    [ 0, 11720, true, 'jsdbnwrc' ],
    [ 0, 67639, true, 'ssq' ],
    [ 0, 27749, true, 'nhq' ],
    [ 0, 27749, true, 'stbczmlq' ],
    [ 0, 9583, true, 'qzmz' ],
    [ 0, 99990, true, 'nlwwrz' ],
    [ 0, 7520, true, 'hbpps' ],
    [ 0, 7521, true, 'zhmwl' ],
    [ 0, 56573, true, 'pqm' ],
    [ 0, 64573, true, 'fhrfrbqg' ],
    [ 0, 99770, true, 'mvh' ],
    [ 0, 98160, true, 'ndrcgmd' ],
    [ 0, 98160, true, 'lfhgjw' ],
    [ 0, 74360, true, 'dtgnbb' ],
    [ 0, 80203, true, 'gcq' ],
    [ 0, 11300, true, 'nts' ],
    [ 0, 4415, true, 'lngc' ],
    [ 0, 81223, true, 'qtblb' ],
    ]
      
//const sum = arr.reduce((acc, i) => acc + i, 0)
let count2 = 0;
for(let i = 0; i < arr.length; i++){
    if(arr[i][1] > 3){
        count2 += arr[i][1]
    }

}
console.log(count2)
//console.log('[', calculateFolders(folders[0]), ']');

//console.log(JSON.stringify(folders) + ' ' + current)

