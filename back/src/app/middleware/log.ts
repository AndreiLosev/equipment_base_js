import {appendFile} from 'fs/promises'
import {Request, Response, NextFunction} from 'express'

export const logging = (try_path: string, catch_path: string) => async (req: Request, res: Response, next: NextFunction) => {
    if (res.statusCode === 200) {
        const text = {
            metod: req.method,
            Request_query: req.query,
            Request_body: req.body,
            Respons: res,
        }
        appendFile(try_path, `${JSON.stringify(text)} \n`)
    } else {
        appendFile(catch_path, `${res} \n`)
    }
    next()
}