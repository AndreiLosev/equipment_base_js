import {Server} from 'http'
import {DB} from './sql'

const x = (server: Server, conn: DB) => {
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        console.log('Closing http server.');
        server.close(() => {
            console.log('Http server closed.');
            conn.close()
        });
    });
}