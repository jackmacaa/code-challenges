// Recursive function to find correct folder child to create new files/folders in
const findSelected = (folders, previous) => {
    let found = folders.child.find(element => element.name === previous)
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

export const buildTree = (input) => {
// PART 1
    const commands = input.split('\n')
    let folders = []
    let current = '';
    let previous = '';
    const regex$ = new RegExp(/[$]/)
    const regexCd = new RegExp(/[cd]/)
    const regexCdName = new RegExp(/[a-z]+$/)
    const regexCmdSlash = new RegExp(/[\/]+$/)
    for(const cmd of commands) {
        if(regex$.test(cmd)) {
            if(regexCd.test(cmd)) {
                const folderName = cmd.match(regexCdName)
                    // when cd x is found swaps current to x
                    // To add to folder level
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
                            // When cd .. moves back a folder level
                            const remove = previous.split('/')
                            const len =  remove.length - 1;
                            previous = previous.replace('/' + remove[len], '')
                        }
                    }
                    
            } else {
                // $ LS command, do nothing
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
            }  
        }
    }
    return folders[0]

}
