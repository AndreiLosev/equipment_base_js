import express from 'express'
import {DB} from './lib/sql'


const test_foo = (conn: DB) => (req: express.Request, res: express.Response) => {
    res.json({
        name: req.params,
        metod: req.method,
    })
}

export const routes = (app: express.Express, conn: DB) => {
    app.get('/existing_tables ', test_foo(conn))
    app.post('/create_new_table', test_foo(conn))
    app.post('/create_new_castom_table', test_foo(conn))
    app.get('/table/:table_name/:query', test_foo(conn))
    app.post('/table/:table_name', test_foo(conn))
    app.put('/table/:table_name', test_foo(conn))
    app.delete('/table/:table_name', test_foo(conn))
}
