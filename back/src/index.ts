import expres from 'express'
import {readFileSync} from 'fs'
import {routes} from './routes'


const config = JSON.parse(readFileSync('app_config.json').toString()) as {
    host: string,
    port: number,
    db_path: string,
    err_log_path: string,
    log_path: string,
}

const app = expres()
app.use(expres.json())
// app.use(expres.static('front/build'))
routes(app)
app.listen(config.port, config.host, () => {
    console.log(`listen ${config.host}:${config.port}`)
})