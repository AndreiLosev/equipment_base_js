"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdown = void 0;
const shutdown = (server, conn) => {
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        console.log('Closing http server.');
        server.close(() => {
            console.log('Http server closed.');
            setTimeout(() => conn.close(), 1000);
        });
    });
};
exports.shutdown = shutdown;
