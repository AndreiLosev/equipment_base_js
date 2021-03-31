import {appendFile} from 'fs/promises'
import {Request, Response, NextFunction} from 'express'

export const logging = (try_path: string, catch_path: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (res.statusCode === 200) {
                const text = {
                    time: new Date().toLocaleString(),
                    metod: req.method,
                    Request_query: req.query,
                    Request_body: req.body,
                    Respons: res,
                }
                await appendFile(try_path, `${JSON.stringify(text)}\n`)
            } else {
                const text = {
                    time: new Date().toLocaleString(),
                    ...res,
                }
                await appendFile(catch_path, `${JSON.stringify(text)}\n`)
            }
        } catch (err) {
            console.log('err:', err)
        } finally {
            next()
        }
}