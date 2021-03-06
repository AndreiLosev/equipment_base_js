import {Request, Response, NextFunction} from 'express'
import {DB} from '../../lib/sql'
import {TEquipment, TatableName, Search_by} from '../models'
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
        req: Request<unknown, unknown, TatableName, unknown>,
        res: Response<null>, next: NextFunction,
    ) => {
            const conn = res.app.locals.connect_db as DB
            EquipmentTable.sender(res, conn.create_table(req.body.table_name), next)
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
        req: Request<unknown, unknown, TatableName & {eq: TEquipment}, unknown>,
        res: Response<null>, next: NextFunction,
    ) => {
            const conn = req.app.locals.connect_db as DB
            EquipmentTable.sender(res, conn.set(req.body.table_name, req.body.eq), next)
        }

    static update = (
        req: Request<unknown, unknown, TatableName & {eq: TEquipment}>,
        res: Response<null>, next: NextFunction
    ) => {
            const conn = req.app.locals.connect_db as DB
            EquipmentTable.sender(res, conn.update(req.body.table_name, req.body.eq), next)
        }

    static del = (
        req: Request<unknown, unknown, TatableName & {id: number}>,
        res: Response<null>, next: NextFunction,
    ) => {
            const conn = req.app.locals.connect_db as DB
            EquipmentTable.sender(res, conn.delete(req.body.table_name, req.body.id), next)
        }

    static get_by = (
        req: Request<unknown, unknown, unknown, Search_by>,
        res: Response<TEquipment[]>, next: NextFunction,
    ) => {
            const conn = req.app.locals.connect_db as DB
            const {table_name, columns_and_conditions} = req.query
            EquipmentTable.sender(res, conn.get_by(table_name, columns_and_conditions), next)
        }

}