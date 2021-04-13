import express from 'express'
import {EquipmentTable} from './app/controllers/equipmentTable'


export const routes = (app: express.Express) => {
    app.get('/existing_tables', EquipmentTable.get_tabels)
    app.post('/create_new_table', EquipmentTable.create_table)
    app.get('/table', EquipmentTable.get)
    app.post('/table', EquipmentTable.set)
    app.put('/table', EquipmentTable.update)
    app.delete('/table', EquipmentTable.del)
    app.get('/table/from_num', EquipmentTable.get_by)
}
