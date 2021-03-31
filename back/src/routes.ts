import express from 'express'
import {DB} from './lib/sql'
import {EquipmentTable} from './app/controllers/equipmentTable'


export const routes = (app: express.Express, conn: DB) => {
    app.get('/existing_tables ', EquipmentTable.get_tabels(conn))
    app.post('/create_new_table', EquipmentTable.create_table(conn))
    app.get('/table/:table_name', EquipmentTable.get(conn))
    app.post('/table/:table_name', EquipmentTable.set(conn))
    app.put('/table/:table_name', EquipmentTable.update(conn))
    app.delete('/table/:table_name', EquipmentTable.del(conn))
    app.get('/table/from_num/:query', EquipmentTable.get_by_num(conn))
    app.get('/table/from_str/:query', EquipmentTable.get_by_str(conn))
}
