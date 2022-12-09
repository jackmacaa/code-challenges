import { data, input } from './data.mjs'

// PART 1
const commands = input.split('\n')

let folders = []
for(const cmd of commands) {
    const regex$ = new RegExp(/[$]/gm)
    const regexCd = new RegExp(/[cd]/gm)
    const regexCdName = new RegExp(/[a-z]$/gm)
    const regexSlash = new RegExp(/[/]/gm)
    const regexLs = new RegExp(/[ls]/gm)

    if(regex$.test(cmd)) {
        if(regexCd.test(cmd)) {
            if(regexSlash.test(cmd)) {
                folders.push('/')
            }
            const folderName = cmd.match(regexCdName)
            if(folderName) {
                folders.push(folderName)
            }
        }
    }

    if(!regex$.test(cmd)){
        folders.push(cmd + 'here')
    }
}
console.log(JSON.stringify(folders))