import {Request, Response, NextFunction} from 'express'
import {DB} from '../../lib/sql'
import {TEquipment, TatableName, Search_by_num, Search_by_str} from '../models'
import {Result} from '../../lib/result'


export class EquipmentTable {

    private static sender = <T>(res: Response, sql_result: Result<T>, next: NextFunction) => {
        if (sql_result.isOk()) {
            res.status(200).json(sql_result.get_as_Ok())
            res.locals.last_send = sql_result.get_as_Ok()
        } else {
            res.status(500).json({err: sql_result.get_as_Err().message})
            res.locals.last_send = sql_result.get_as_Err()
        }   
        next()
    }

    static create_table = (
        req: Request<unknown, unknown, unknown, TatableName>,
        res: Response<null>, next: NextFunction,
    ) => {
            const conn = res.app.locals as DB
            EquipmentTable.sender(res, conn.create_table(req.query.table_name), next)
    }

    static get_tabels = (req: Request, res: Response<string[]>, next: NextFunction) => {
        const conn = req.app.locals.connect_db as DB
        EquipmentTable.sender(res, conn.get_tables(), next)
    }

    static get = (
        req: Request<unknown, unknown, unknown, TatableName>,
        res: Response<TEquipment[]>, next: NextFunction,
    ) => {
        const conn = req.app.locals.connect_db as DB        
        EquipmentTable.sender(res, conn.get(req.query.table_name), next)
    }

    static set = (
        req: Request<unknown, unknown, TEquipment, TatableName>,
        res: Response<null>, next: NextFunction,
    ) => {
            const conn = req.app.locals.connect_db as DB
            EquipmentTable.sender(res, conn.set(req.query.table_name, req.body), next)
        }

    static update = (
        req: Request<unknown, unknown, TEquipment, TatableName>,
        res: Response<null>, next: NextFunction
    ) => {
            const conn = req.app.locals.connect_db as DB
            EquipmentTable.sender(res, conn.update(req.query.table_name, req.body), next)
        }

    static del = (
        req: Request<unknown, unknown, {id: number}, TatableName>,
        res: Response<null>, next: NextFunction,
    ) => {
            const conn = req.app.locals.connect_db as DB
            EquipmentTable.sender(res, conn.delete(req.query.table_name, req.body.id), next)
        }

    static get_by_num = (
        req: Request<unknown, unknown, unknown, Search_by_num>,
        res: Response<TEquipment[]>, next: NextFunction,
    ) => {
            const conn = req.app.locals.connect_db as DB
            const {table_name, column, value, mode} = req.query
            EquipmentTable.sender(res, conn.get_by_num(table_name, column, mode, value), next)
        }

    static get_by_str = (
        req: Request<unknown, unknown, unknown, Search_by_str>,
        res: Response<TEquipment[]>, next: NextFunction,
    ) => {
            const conn = req.app.locals.connect_db as DB
            const {table_name, column, pattern} = req.query
            EquipmentTable.sender(res, conn.get_by_str(table_name, column, pattern), next)
        }
}