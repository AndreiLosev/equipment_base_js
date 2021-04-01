import {readFileSync, writeFileSync} from 'fs'
import {DB} from './sql'
import sqlite from 'better-sqlite3'

export const init_app = (app_config_path: string) => {
    const {
        host, port, db_path, frontend, err_log_path, log_path,
    } = JSON.parse(readFileSync(app_config_path).toString()) as {
        host: string,
        port: number,
        db_path: string,
        frontend: string,
        err_log_path: string,
        log_path: string,
    }

    create_log_file(log_path)
    create_log_file(err_log_path)

    const conn = new DB(new sqlite(db_path))
    
    return {conn, host, port, frontend, err_log_path, log_path}
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