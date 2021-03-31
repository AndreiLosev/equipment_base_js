import express from 'express'
import {DB} from './lib/sql'
import {Equipments} from './app/controllers/equipments'


export const routes = (app: express.Express, conn: DB) => {
    app.get('/existing_tables ', Equipments.get_tabels(conn))
    app.post('/create_new_table', Equipments.create_table(conn))
    app.get('/table/:table_name', Equipments.get(conn))
    app.post('/table/:table_name', Equipments.set(conn))
    app.put('/table/:table_name', Equipments.update(conn))
    app.delete('/table/:table_name', Equipments.del(conn))
    app.get('/table/from_num/:query', Equipments.get_by_num(conn))
    app.get('/table/from_str/:query', Equipments.get_by_str(conn))
}
