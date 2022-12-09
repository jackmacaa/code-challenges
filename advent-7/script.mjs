import { data, input } from './data.mjs'

// PART 1
const commands = input.split('\n')

let folders = [

]

let current = '';

for(const cmd of commands) {
    const regex$ = new RegExp(/[$]/gm)
    const regexCd = new RegExp(/[cd]/gm)
    const regexCdName = new RegExp(/[a-z]+$/gm)
    const regexCmd = new RegExp(/[\/]+$/gm)

    if(regex$.test(cmd)) {
        if(regexCd.test(cmd)) {
            const folderName = cmd.match(regexCdName)
                if(folderName) {
                    const selected = folders.find(element => element.name === current)
                    if(selected){
                        selected.child.push({
                            name: folderName,
                            isFolder: true,
                            size: 0,
                            child : []
                        })
                    }
                    console.log('maatched ' + folderName)
                } else {
                    const command = cmd.match(regexCmd)
                    if(command){
                        folders.push({
                            name: command,
                            isFolder: true,
                            size: 0,
                            child : []
                        })
                        current = command
                    }
                }
                
        } else {
            console.log('found command ' + cmd)
        }

    }

}
console.log(JSON.stringify(folders) + ' ' + current)