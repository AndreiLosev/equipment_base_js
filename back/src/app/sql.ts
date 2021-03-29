import sqlite from 'better-sqlite3'

const conn = sqlite('equipments.db')

const sql = (table_name: string) => `
CREATE VIRTUAL TABLE ${table_name} (
	"id"	INTEGER NOT NULL UNIQUE,
	"No"	INTEGER NOT NULL,
	"doc_title"	TEXT NOT NULL,
	"manufacturer"	TEXT,
	"validation_place"	TEXT,
	"validation_cost"	INTEGER,
	"inventory_number"	TEXT NOT NULL,
	"k_v_a"	TEXT,
	"no_certificate"	TEXT,
	"last_verification_date"	INTEGER,
	"checking_manometers"	INTEGER,
	"next_verification_date"	INTEGER,
	"notes"	TEXT,
	"actual" INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
`

const sql2 = (name: string) => `
	CREATE VIRTUAL TABLE ${name} 
	USING FTS5(doc_title,manufacturer,validation_place,inventory_number,k_v_a,no_certificate,notes);
`

const sql1 = 'SELECT name FROM sqlite_master WHERE type="table"'

// conn.run(sql2('virtual_test'), err => console.log(err))

const sql3 = `
CREATE TABLE test_table (
"id"	INTEGER NOT NULL UNIQUE,
"param1" INTEGER,
"param2" TEXT,
PRIMARY KEY("id" AUTOINCREMENT)
);
`

const sql4 = `
INSERT INTO test_table (param1, param2)
VALUES ('2000', 'hello')
`

const sql5 = `
	SELECT * FROM test_table
`

const xx = conn.prepare(sql5).all()
console.log(xx)
// conn.all(sql1, (err, result) => {
// 	let x = result.filter(i => i.name !== 'sqlite_sequence')
// 	console.log(x)
// })


conn.close()

