import {readFileSync, writeFileSync} from 'fs'


export const init_app = (app_config_path: string) => {
    const config = JSON.parse(readFileSync(app_config_path).toString()) as {
        host: string,
        port: number,
        db_path: string,
        frontend: string,
        err_log_path: string,
        log_path: string,
    }

    create_log_file(config.log_path)
    create_log_file(config.err_log_path)
}

const create_log_file = (path: string) => {
    try {
        const check_file = readFileSync(path).toString()
        if (check_file.length > 0) {
            writeFileSync(path, '')
        }
    } catch (err) {
        if ((err as Error).message.includes(`no such file or directory`))
            writeFileSync(path, '')
        else 
            throw err
    }
}