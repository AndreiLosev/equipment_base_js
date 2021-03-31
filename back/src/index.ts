import expres from 'express'
import {readFileSync} from 'fs'
import {routes} from './routes'
import {DB} from './lib/sql'
import sqlite from 'better-sqlite3'
import {logging} from './app/middleware/log'


const config = JSON.parse(readFileSync('app_config.json').toString()) as {
    host: string,
    port: number,
    db_path: string,
    frontend: string,
    err_log_path: string,
    log_path: string,
}

const app = expres()

app.use(expres.json())

app.use(expres.static(config.frontend))

routes(app, new DB(new sqlite(config.db_path)))

app.use(logging(config.log_path, config.err_log_path))

app.listen(config.port, config.host, () => {
    console.log(`listen ${config.host}:${config.port}`)
})