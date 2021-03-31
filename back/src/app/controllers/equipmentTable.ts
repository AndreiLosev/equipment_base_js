import {Request, Response} from 'express'
import {DB} from '../../lib/sql'
import {TEquipment, TatableName, Search_by_num, Search_by_str} from '../models'
import {Result} from '../../lib/result'

export class EquipmentTable {

    private static sender = <T>(res: Response, sql_result: Result<T>) => {
        if (sql_result.isOk()) res.status(200).json(sql_result.get_as_Ok())
        else res.status(500).json({err: sql_result.get_as_Err()})   
    }

    static create_table = (conn: DB) =>
        (req: Request<unknown, unknown, unknown, TatableName>, res: Response<null>) => {
            EquipmentTable.sender(res, conn.create_table(req.query.table_name))
        }

    static get_tabels = (conn: DB) => (req: Request, res: Response<string[]>) => {
        EquipmentTable.sender(res, conn.get_tables())
    }

    static get = (conn: DB) =>
        (req: Request<unknown, unknown, unknown, TatableName>, res: Response<TEquipment[]>) => {
            EquipmentTable.sender(res, conn.get(req.query.table_name))
        }

    static set = (conn: DB) =>
        (req: Request<unknown, unknown, TEquipment, TatableName>, res: Response<null>) => {
            EquipmentTable.sender(res, conn.set(req.query.table_name, req.body))
        }

    static update = (conn: DB) =>
        (req: Request<unknown, unknown, TEquipment, TatableName>, res: Response<null>) => {
            EquipmentTable.sender(res, conn.update(req.query.table_name, req.body))
        }

    static del = (conn: DB) =>
        (req: Request<unknown, unknown, {id: number}, TatableName>, res: Response<null>) => {
            EquipmentTable.sender(res, conn.delete(req.query.table_name, req.body.id))
        }

    static get_by_num = (conn: DB) =>
        (req: Request<unknown, unknown, unknown, Search_by_num>, res: Response<TEquipment[]>) => {
            const {table_name, column, value, mode} = req.query
            EquipmentTable.sender(res, conn.get_by_num(table_name, column, mode, value))
        }

    static get_by_str = (conn: DB) =>
        (req: Request<unknown, unknown, unknown, Search_by_str>, res: Response<TEquipment[]>) => {
            const {table_name, column, pattern} = req.query
            EquipmentTable.sender(res, conn.get_by_str(table_name, column, pattern))
        }
}