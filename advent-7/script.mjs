import { data, input } from './data.mjs'

// PART 1
const commands = data.split('\n')
let folders = []
let current = '';
let previous = '';
let count = 0;

for(const cmd of commands) {
    const regex$ = new RegExp(/[$]/gm)
    const regexCd = new RegExp(/[cd]/gm)
    const regexCdName = new RegExp(/[a-z]+$/gm)
    const regexCmdSlash = new RegExp(/[\/]+$/gm)

    if(regex$.test(cmd)) {
        if(regexCd.test(cmd)) {
            // finds letters
            const folderName = cmd.match(regexCdName)
            //console.log('cd dir ' + JSON.stringify(folderName))
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
                    //console.log('cd cmd ' + JSON.stringify(command))
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
        let selected = '';
        if(count === 0){
            selected = folders.find(element => element.name === current);
        } else if(count === 1) {
            //console.log({count})
            //console.log({current})
            selected = folders[0].child.find(element => element.name === current); 
        } else if( count === 2){
            //console.log({count})
            //console.log({current})
            selected = folders[0].child[0].child.find(element => element.name === current); 
        } else if( count === 3){
            //console.log({count})
            //console.log({current})
            selected = folders[0].child[0].child[0].child.find(element => element.name === current); 
        } else if( count === 4){
            console.log({count})
            console.log({current})
            selected = folders[0].child[0].child[0].child[0].child.find(element => element.name === current); 
        }
        
        console.log('selected found ' + selected)
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
                    size: files[0],
                    child : [],
                    parent: previous
                })
            }
        }  
    }

}

const calculateFolders = (file) => {
    if(file.child.length === 0){
        const retVal = [Number(file.isFolder ? 0 : file.size), file.isFolder];
        console.log(JSON.stringify(retVal), ',');
        return retVal;
    }

    const childSizes = file.child.map(child => {
        const value = calculateFolders(child);
        return value[0];
    });

    let childTotals = 0;
    for (let i = 0; i < childSizes.length; i++) {
        childTotals += childSizes[i];
    }

    const currentSize = file.isFolder ? 0 : Number(file.size);
    const retVal = [currentSize + childTotals, file.isFolder];
    console.log(JSON.stringify(retVal), ',');
    return retVal;

}
console.log('[');
calculateFolders(folders[0]);
console.log(']');

const arr = [
    [290515,false] ,
    [102897,false] ,
    [102897,true] ,
    [122034,false] ,
    [12680,false] ,
    [49534,false] ,
    [0,true] ,
    [0,true] ,
    [315267,false] ,
    [294364,false] ,
    [0,true] ,
    [76621,false] ,
    [285948,false] ,
    [155914,false] ,
    [0,true] ,
    [1128114,true] ,
    [18557,false] ,
    [1724331,true] ,
    [0,true] ,
    [176761,false] ,
    [176761,true] ,
    [0,true] ,
    [266338,false] ,
    [287488,false] ,
    [211569,false] ,
    [231144,false] ,
    [260476,false] ,
    [1257015,true] ,
    [0,true] ,
    [0,true] ,
    [0,true] ,
    [213313,false] ,
    [0,true] ,
    [0,true] ,
    [1614,false] ,
    [0,true] ,
    [0,true] ,
    [0,true] ,
    [214927,true] ,
    [298050,false] ,
    [0,true] ,
    [0,true] ,
    [0,true] ,
    [0,true] ,
    [51178,false] ,
    [0,true] ,
    [0,true] ,
    [0,true] ,
    [0,true] ,
    [0,true] ,
    [0,true] ,
    [51178,true] ,
    [3722262,true] ,
    ]
// count = 0;
// for(let i = 0; i < arr.length; i++){
//     if(arr[i][0] < 100000 && arr[i][1] === true){
//         count+= arr[i][0]
//     }
// }
// console.log(count)
// console.log('[', calculateFolders(folders[0]), ']');

//console.log(JSON.stringify(folders) + ' ' + current)

