import sqlite, {Database} from 'better-sqlite3'
import {Result} from './result'
import {TEquipment, NumKeys, StrKeys} from '../app/models'

export class DB {
    constructor(
        private db: Database
    ) {}

    private get_columns_and_values_for_sql_query(
        data: TEquipment, id: "id_add" | 'id_remove' | 'nothing',
    ) {
        const columns = id == 'id_remove'
            ? Object.keys(data).filter(i => i !== 'id')
            : id == 'id_add' ? [...Object.keys(data), 'id'] : Object.keys(data)
        const values = columns.map(i => `@${i}`)
        return {columns, values}
    }

    public get_tables() {
        return Result.try<string[]>(() => {
            return this.db.prepare<{name: string}[]>(`SELECT name FROM sqlite_master WHERE type='table'`)
                .all().map((i: {name: string}) => i.name)
                .filter(i => !(i == 'sqlite_sequence'))
            })

    }

    public create_table(table_name: string) {
        return Result.try(() => {
            this.db.prepare(`
                CREATE TABLE ${table_name} (
                    "id"	INTEGER NOT NULL UNIQUE,
                    "No"	INTEGER NOT NULL,
                    "validation_cost"	INTEGER,
                    "last_verification_date"	INTEGER,
                    "checking_manometers"	INTEGER,
                    "next_verification_date"	INTEGER,
                    "actual" INTEGER,
                    "doc_title" TEXT NOT NULL,
                    "manufacturer" TEXT,
                    "validation_place" TEXT,
                    "inventory_number" TEXT NOT NULL,
                    "k_v_a" TEXT,
                    "no_certificate" TEXT,
                    "notes" TEXT,
                    PRIMARY KEY("id" AUTOINCREMENT)
                    );
                `).run()
            return {}
        })
    }

    public set(table_name: string, data: TEquipment) {
        return Result.try(() => {
            const {columns, values} = this.get_columns_and_values_for_sql_query(data, 'id_remove')
            this.db.prepare(`INSERT INTO ${table_name} (${columns.toString()}) VALUES (${values.toString()})`).run(data)
            return {}
        })
    }

    public update(table_name: string, data: TEquipment) {
        return Result.try(() => {
            const id = data.id
            const {columns, values} = this.get_columns_and_values_for_sql_query(data, 'id_remove')
            const for_query = columns.map((_, i) => `${columns[i]} = ${values[i]}`)
            let x = this.db.prepare(`UPDATE ${table_name} SET ${for_query.toString()} WHERE ${table_name}.id = ${id}`).run(data)
            return {}
        })
    }

    public delete(table_name: string, id: number) {
        return Result.try(() => {
            this.db.prepare(`DELETE FROM ${table_name} WHERE ${table_name}.id = ${id};`).run()
            return {}
        })
    }

    public get_by_num(table_name: string, column: typeof NumKeys[number], mode: '<=' | '>=' | '=', value: number) {
        return Result.try(() => {
            return this.db.prepare(
                `SELECT * FROM ${table_name} WHERE  ${table_name}.${column} ${mode} ${value}`
            ).all() as TEquipment[]                
        })
    }

    public get_by_str(table_name: string, column: typeof StrKeys[number], pattern: string) {
        return Result.try(() => {
            console.log({pattern})
            return this.db.prepare(
                `SELECT * FROM ${table_name} WHERE ${table_name}.${column} like '%${pattern}%'`
            ).all() as TEquipment[]
        })
    }
}
 