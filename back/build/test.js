"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("./app/controllers/sql");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const conn = new sql_1.DB(better_sqlite3_1.default('test_db.db'));
const table_name = 'test_table';
// let x = conn.create_table(table_name)
// let x = conn.get_tables()
let data = {
    id: 3,
    No: 45,
    validation_cost: 100,
    last_verification_date: Date.now() - 11,
    checking_manometers: 12,
    next_verification_date: Date.now() + 13,
    actual: 1,
    doc_title: 'cdfff',
    manufacturer: 'ghiff',
    validation_place: 'aagkl',
    inventory_number: 'aamno',
    k_v_a: 'pqr!!',
    no_certificate: 'suv',
    notes: 'wxy!!',
};
// let x = conn.set(table_name, data)
// let x = conn.update(table_name, data)
// let x = conn.delete(table_name, data.id)
// let x = conn.get_by_str(table_name, 'doc_title', 'df')
// console.log({
//     err_mes: x.get_as_Err().message,
//     as_ok: x.get_as_Ok(),
//     is_ok: x.isOk(),
// })
