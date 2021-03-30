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
    id: 15,
    No: 5,
    validation_cost: 1369,
    last_verification_date: Date.now() - 2589,
    checking_manometers: 999989,
    next_verification_date: Date.now() + 15896,
    actual: 1,
};
let v_data = {
    doc_title: 'kyrimetr!',
    manufacturer: 'diapro!ector',
    validation_place: 'rog!achev',
    inventory_number: '0000!!159',
    k_v_a: 'k/v/a',
    no_certificate: 'ssags159',
    notes: 'hello world!!'
};
let x = conn.set_data(table_name, data, v_data);
console.log(x);
