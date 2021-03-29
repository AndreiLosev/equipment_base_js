const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('equipment_base_js.db')

// db.run(`
//  CREATE TABLE "npl_base" (
// 	"id"	INTEGER NOT NULL UNIQUE,
// 	"ordinal_number"	INTEGER NOT NULL,
// 	"title_of_the_document"	TEXT NOT NULL,
// 	"manufacturer"	TEXT,
// 	"instrument_calibration_place"	TEXT,
// 	"calibration_cost"	INTEGER,
// 	"SN"	TEXT NOT NULL,
// 	"inventory_number"	TEXT NOT NULL,
// 	"k_v_a"	TEXT,
// 	"No_certificate_number"	TEXT,
// 	"last_verification_calibration_date"	INTEGER,
// 	"checking_manometers"	INTEGER,
// 	"next_verification_calibration_date"	INTEGER,
// 	"notes"	TEXT,
//	"actual" INTEGER NOT NULL,
// 	PRIMARY KEY("id" AUTOINCREMENT)
// );
// `)


db.close()
