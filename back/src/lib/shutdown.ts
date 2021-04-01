import {Server} from 'http'
import {DB} from './sql'

export const shutdown = (server: Server, conn: DB) => {
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.')
        console.log('Closing http server.')
        server.close(() => {
            console.log('Http server closed.')
            setTimeout(() => conn.close(), 1000)
        });
    });
}