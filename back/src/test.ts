import {DB} from './app/controllers/sql'
import sqlite from 'better-sqlite3'
import {TEquipmentNumber, TEquipmentString} from './app/models'


const conn = new DB(sqlite('test_db.db'))
const table_name = 'test_table'
// let x = conn.create_table(table_name)
// let x = conn.get_tables()
let data: TEquipmentNumber = {
    id: 15,
    No: 5,
    validation_cost: 1369,
    last_verification_date: Date.now()-2589,
    checking_manometers: 999989,
    next_verification_date: Date.now() +  15896,
    actual: 1,
}

let v_data: TEquipmentString = {
    doc_title: 'kyrimetr!',
    manufacturer: 'diapro!ector',
    validation_place: 'rog!achev',
    inventory_number: '0000!!159',
    k_v_a: 'k/v/a',
    no_certificate: 'ssags159',
    notes: 'hello world!!'
}

let x = conn.set_data(table_name, data, v_data)
console.log(x)
