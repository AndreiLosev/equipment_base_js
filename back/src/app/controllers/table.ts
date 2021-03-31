import {Request, Response} from 'express'
import {DB} from '../../lib/sql'
import {TEquipment, TCreate_table} from '../models'


const create_table = (conn: DB) => async (req: Request<any, {}, TCreate_table, any>, res: Response) => {
    const result = conn.create_table(req.body.table_name)
    if (result.isOk()) res.status(200).json(result.get_as_Ok())
    else res.status(500).json({err: result.get_as_Err()})
}

const get_tabels = (conn: DB) => async (req: Request, res: Response) => {
    const result = conn.get_tables()
    if (result.isOk()) res.status(200).json(result.get_as_Ok())
    else res.status(500).json({err: result.get_as_Err()})
}