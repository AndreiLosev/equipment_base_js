import {Database} from 'better-sqlite3'
import {Result} from './result'
import {TEquipment, NumKeys, StrKeys, TEquipmentKeys} from '../app/models'

export class DB {
    
    private db: Database

    constructor(db: Database) {
        this.db = db
    }

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
            return this.db.prepare<{name: string}[]>(
                `SELECT name FROM sqlite_master WHERE type='table'`,
            ).all().map((i: {name: string}) => i.name)
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
                    "factory_number" TEXT,
                    "inventory_number" TEXT NOT NULL,
                    "k_v_a" TEXT,
                    "no_certificate" TEXT,
                    "notes" TEXT,
                    PRIMARY KEY("id" AUTOINCREMENT)
                    );
                `).run()
            return null
        })
    }

    public get(table_name: string) {
        return Result.try(
            () => this.db.prepare(`SELECT * FROM ${table_name}`).all() as TEquipment[]
        )
    }

    public set(table_name: string, data: TEquipment) {
        return Result.try(() => {
            const {columns, values} = this.get_columns_and_values_for_sql_query(data, 'id_remove')
            this.db.prepare(
                `INSERT INTO ${table_name} (${columns.toString()}) VALUES (${values.toString()})`,
            ).run(data)
            return null
        })
    }

    public update(table_name: string, data: TEquipment) {
        return Result.try(() => {
            const id = data.id
            const {columns, values} = this.get_columns_and_values_for_sql_query(data, 'id_remove')
            const for_query = columns.map((_, i) => `${columns[i]} = ${values[i]}`)
            this.db.prepare(
                `UPDATE ${table_name} SET ${for_query.toString()} WHERE ${table_name}.id = ${id}`,
            ).run(data)
            return null
        })
    }

    public delete(table_name: string, id: number) {
        return Result.try(() => {
            this.db.prepare(`DELETE FROM ${table_name} WHERE ${table_name}.id = ${id};`).run()
            return null
        })
    }

    public get_by(
        table_name: string,
        columns_and_conditions: {name: TEquipmentKeys, value: string | number, conditions: '<' | '>' | '=' | ''}[],
    ) {
        return Result.try(() => {
            const sql_conditions = columns_and_conditions.length !== 0
                ? columns_and_conditions.reduce((acc, item) => {
                    if (((v: any) => NumKeys.includes(v))(item.name)) {
                        const conditions = item.conditions === '=' ? '=' : `${item.conditions}=`
                        return `${acc} ${table_name}.${item.name} ${conditions} ${item.value} AND`
                    } else if (((v: any) => StrKeys.includes(v))(item.name)) {
                        return `${acc} ${table_name}.${item.name} like '%${item.value}%'`
                    } else {
                        throw new Error(`${item.name}??? -> there are no such columns in the table`)
                    }
                }, 'WHERE ').slice(0, -3)
                : ''
            return this.db.prepare(`SELECT * FROM ${table_name} ${sql_conditions}`).all() as TEquipment[]
        })
    }

    public close() {
        this.db.close()
    }
}
 
