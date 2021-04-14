import expres from 'express'
import {init_app} from './lib/init_app'
import {routes} from './routes'
import {shutdown} from './lib/shutdown'
import {logging} from './app/middleware/log'

const {conn, frontend, log_path, err_log_path, host, port} = init_app('app_config.json')

const app = expres()

app.use(expres.json())

app.use(expres.static(frontend))
routes(app)

app.locals.connect_db = conn

app.use(logging(log_path, err_log_path))

const server = app.listen(port, host, () => {
    console.log(`listen ${host}:${port}`)
})

shutdown(server, conn)