import express from 'express'
import {DB} from './lib/sql'
import {EquipmentTable} from './app/controllers/equipmentTable'


export const routes = (app: express.Express, conn: DB) => {
    app.get('/existing_tables', EquipmentTable.get_tabels(conn))
    app.post('/create_new_table', EquipmentTable.create_table(conn))
    app.get('/table', EquipmentTable.get(conn))
    app.post('/table', EquipmentTable.set(conn))
    app.put('/table', EquipmentTable.update(conn))
    app.delete('/table', EquipmentTable.del(conn))
    app.get('/table/from_num', EquipmentTable.get_by_num(conn))
    app.get('/table/from_str', EquipmentTable.get_by_str(conn))
}
