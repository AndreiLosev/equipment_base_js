import express from 'express'


const test_foo =(req: express.Request, res: express.Response) => {
    res.json({
        name: req.params,
        metod: req.method,
    })
}

export const routes = (app: express.Express) => {
    app.get('/existing_tables ', test_foo)
    app.post('/create_new_table', test_foo)
    app.post('/create_new_castom_table', test_foo)
    app.get('/table/:table_name/:query', test_foo)
    app.post('/table/:table_name', test_foo)
    app.put('/table/:table_name', test_foo)
    app.delete('/table/:table_name', test_foo)
}
