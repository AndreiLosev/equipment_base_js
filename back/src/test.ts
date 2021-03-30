import {DB} from './app/controllers/sql'
import sqlite from 'better-sqlite3'
import {TEquipmentNumber, TEquipmentString} from './app/models'


const conn = new DB(sqlite('test_db.db'))
const table_name = 'test_table'
// let x = conn.create_table(table_name)
// let x = conn.get_tables()
let data: TEquipmentNumber = {
    id: 10,
    No: 5,
    validation_cost: 6,
    last_verification_date: Date.now() - 7,
    checking_manometers: 8,
    next_verification_date: Date.now() + 9,
    actual: 1,
}

let v_data: TEquipmentString = {
    doc_title: 'abc',
    manufacturer: 'dfg',
    validation_place: 'hig',
    inventory_number: 'klm',
    k_v_a: 'nop',
    no_certificate: 'qrs',
    notes: 'uvw',
}

// let x = conn.set(table_name, data, v_data)
// let x = conn.update(table_name, data, v_data)
let x = conn.delete(table_name, data.id)
console.log({
    err_mes: x.get_as_Err().message,
    as_ok: x.get_as_Ok(),
    is_ok: x.isOk(),
})
