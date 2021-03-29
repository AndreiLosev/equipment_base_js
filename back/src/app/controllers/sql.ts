import sqlite, {Database} from 'better-sqlite3'
import {TEquipment} from '../models'


export class DB {
    constructor(
        private db: Database
    ) {}

    public get_tables(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const query = SqlQuery.get_tables()
            this.db.all(query, (err, result: {name: string}[]) => err
                ? reject(err)
                : resolve(result.filter(i => i.name !== 'sqlite_sequence').map(i => i.name))
            )
        })
    }

    public create_table(table_name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = SqlQuery.create_table(table_name)
            this.db.run(query, err => err ? reject(err) : resolve())
        })
    }

    public set_data(table_name: string, data: TEquipment): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = SqlQuery.set_data(table_name, data)
            this.db.run(query, err => err ? reject(err) : resolve())
        })
    }

    public update_data(table_name: string, data: TEquipment): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = SqlQuery.update_data(table_name, data)
            this.db.run(query, err => err ? reject(err) : resolve())
        })
    }

    public delete_data(table_name: string, data: TEquipment): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = SqlQuery.delete_data(table_name, data)
            this.db.run(query, err => err ? reject(err) : resolve())
        })
    }
}


export class SqlQuery {

    static get_tables = () => `SELECT name FROM sqlite_master WHERE type="table"`

    static create_table = (table_name: string) => `
    CREATE TABLE ${table_name} (
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
        PRIMARY KEY("id" AUTOINCREMENT)
    );
    `
    static set_data = (table_name: string, data: TEquipment) => {
        const {columns, values} = TEquipment_to_columns_and_values_without_id(data)
        return `INSERT INTO ${table_name} (${columns.toString()}) VALUES (${values.toString()})` 
    }

    static update_data = (table_name: string, data: TEquipment) => {
        const id = data.id
        const {columns, values} = TEquipment_to_columns_and_values_without_id(data)
        const result = columns.map((_, i) => `${columns[i]} = ${values[i]}`)
        return `UPDATE ${table_name} SET ${result.toString()} WHERE ${table_name}.id = ${id}`
    }

    static delete_data = (table_name: string, data: TEquipment) => {
        const id = data.id
        return `DELETE FROM ${table_name} WHERE ${table_name}.id = ${id};`
    }
}

const TEquipment_to_columns_and_values_without_id  = (data: TEquipment) => {
    const columns = Object.keys(data).filter(i => i !== 'id')
    const id_index = Object.keys(data).indexOf('id')
    const values = Object.values(data).filter((_, i) => i !== id_index)
    return {columns, values}
}