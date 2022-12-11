import { data, input } from './data.mjs'

const findSelected = (folders, current) => {
    //console.log({current})
    //console.log('selected ' + JSON.stringify(folders))
    
    let found = folders.child.find(element => element.name === current)
   // console.log('FOUND ' + JSON.stringify(found))
    if(found){
        if(found.isFolder === true){
            //console.log('HERE')
            return found
        }
    }

    for(let key in folders.child){
      // console.log('key' + JSON.stringify(folders.child[key]))
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
let count = 0;
let selected = '';

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
                    count++;
                } else {
                    // finds symbols like / or ..
                    const command = cmd.match(regexCmdSlash)
                    if(command){
                        folders.push({
                            name: command[0],
                            isFolder: true,
                            parent: '',
                            child : []  
                        })
                        current = command[0]
                        previous += current
                    } else {
                        //console.log({previous})
                        const remove = previous.split('/')
                        const len =  remove.length - 1;
                        previous = previous.replace('/' + remove[len], '')
                        count--;
                    }
                }
                
        } else {
            //console.log('found command ' + cmd)
        }

    } else {
        //console.log('CURRENT ' + current)
        let selected = folders.find(element => element.name === current)
       // console.log('SELLL '+ JSON.stringify(selected))
        if(!selected) {
            selected = findSelected(folders[0], current);
        }
       // console.log('TOO')
       // console.log('FODLERS '+ JSON.stringify(folders))
       // console.log('OUTSIDE '+ JSON.stringify(selected))
        // checking if is dir or file
        if(cmd.startsWith('dir')){
            // creates folder in current dir
            const folder = cmd.match(regexCdName)
            if(selected){
                selected.child.push({
                    name: folder[0],
                    isFolder: true,
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
console.log('FOLDERS ' + JSON.stringify(folders))

const calculateFolders = (file) => {
    if(file.child.length === 0){
        const retVal = [Number(file.isFolder ? 0 : file.size), file.isFolder, file.name];
        //console.log(JSON.stringify(retVal), ',');
        return retVal;
    }

    const childSizes = file.child.map(child => {
        const value = calculateFolders(child);
        return value[0];
    });
    console.log(childSizes)

    let childTotals = 0;
    for (let i = 0; i < childSizes.length; i++) {
        childTotals += childSizes[i];
    }

    const currentSize = file.isFolder ? 0 : Number(file.size);
    const retVal = [currentSize, childTotals, file.isFolder, file.name];
    console.log(JSON.stringify(retVal), ',');
    return retVal;

}
console.log('[');
calculateFolders(folders[0]);
console.log(']');

const arr = [
    [0,584,true,"e"] ,
    [0,94269,true,"a"] ,
    [0,24933642,true,"d"] ,
    [0,23352670,true,"/"] ,
    ]  
let count2 = 0;
for(let i = 0; i < arr.length; i++){
    if(arr[i][1] < 100000){
        console.log(arr[i][1])
    }

}
console.log(count2)
//console.log('[', calculateFolders(folders[0]), ']');

//console.log(JSON.stringify(folders) + ' ' + current)

