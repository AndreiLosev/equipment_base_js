"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var better_sqlite3_1 = __importDefault(require("better-sqlite3"));
var conn = better_sqlite3_1.default('equipments.db');
var sql = function (table_name) { return "\nCREATE VIRTUAL TABLE " + table_name + " (\n\t\"id\"\tINTEGER NOT NULL UNIQUE,\n\t\"No\"\tINTEGER NOT NULL,\n\t\"validation_cost\"\tINTEGER,\n\t\"last_verification_date\"\tINTEGER,\n\t\"checking_manometers\"\tINTEGER,\n\t\"next_verification_date\"\tINTEGER,\n\t\"actual\" INTEGER,\n\tPRIMARY KEY(\"id\" AUTOINCREMENT)\n);\n\nCREATE VIRTUAL TABLE v_" + table_name + " USING fts5(\n\tid, doc_title, manufacturer, validation_place,\n\tinventory_number, k_v_a, no_certificate, notes\n);\n"; };
var sql1 = 'SELECT name FROM sqlite_master WHERE type="table"';
// conn.run(sql2('virtual_test'), err => console.log(err))
// const sql3 = `
// CREATE TABLE test_table (
// "id"	INTEGER NOT NULL UNIQUE,
// "param1" INTEGER,
// "param2" TEXT,
// PRIMARY KEY("id" AUTOINCREMENT)
// );
// `
// const sql4 = `
// INSERT INTO test_table (param1, param2)
// VALUES ('2000', 'hello')
// `
// const sql5 = `
// 	SELECT * FROM test_table
// `
var xx = conn.prepare(sql('test_v')).run();
console.log(xx);
// conn.all(sql1, (err, result) => {
// 	let x = result.filter(i => i.name !== 'sqlite_sequence')
// 	console.log(x)
// })
conn.close();
