"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var better_sqlite3_1 = __importDefault(require("better-sqlite3"));
var conn = better_sqlite3_1.default('equipments.db');
var sql = function (table_name) { return "\nCREATE VIRTUAL TABLE " + table_name + " (\n\t\"id\"\tINTEGER NOT NULL UNIQUE,\n\t\"No\"\tINTEGER NOT NULL,\n\t\"doc_title\"\tTEXT NOT NULL,\n\t\"manufacturer\"\tTEXT,\n\t\"validation_place\"\tTEXT,\n\t\"validation_cost\"\tINTEGER,\n\t\"inventory_number\"\tTEXT NOT NULL,\n\t\"k_v_a\"\tTEXT,\n\t\"no_certificate\"\tTEXT,\n\t\"last_verification_date\"\tINTEGER,\n\t\"checking_manometers\"\tINTEGER,\n\t\"next_verification_date\"\tINTEGER,\n\t\"notes\"\tTEXT,\n\t\"actual\" INTEGER,\n\tPRIMARY KEY(\"id\" AUTOINCREMENT)\n);\n"; };
var sql2 = function (name) { return "\n\tCREATE VIRTUAL TABLE " + name + " \n\tUSING FTS5(doc_title,manufacturer,validation_place,inventory_number,k_v_a,no_certificate,notes);\n"; };
var sql1 = 'SELECT name FROM sqlite_master WHERE type="table"';
// conn.run(sql2('virtual_test'), err => console.log(err))
var sql3 = "\nCREATE TABLE test_table (\n\"id\"\tINTEGER NOT NULL UNIQUE,\n\"param1\" INTEGER,\n\"param2\" TEXT,\nPRIMARY KEY(\"id\" AUTOINCREMENT)\n);\n";
var sql4 = "\nINSERT INTO test_table (param1, param2)\nVALUES ('2000', 'hello')\n";
var sql5 = "\n\tSELECT * FROM test_table\n";
var xx = conn.prepare(sql5).all();
console.log(xx);
// conn.all(sql1, (err, result) => {
// 	let x = result.filter(i => i.name !== 'sqlite_sequence')
// 	console.log(x)
// })
conn.close();
