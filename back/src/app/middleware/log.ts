import {appendFile} from 'fs/promises'
import {Request, Response, NextFunction} from 'express'

export const logging = (try_path: string, catch_path: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const text = {
            time: new Date().toLocaleString(),
            metod: req.method,
            Request_query: req.query,
            Request_body: req.body as unknown,
        }
        
        try {
            if (res.statusCode === 200) {
                await appendFile(try_path, `${JSON.stringify(text)}\n`)
                console.log(text)
            } else {
                await appendFile(catch_path, `${JSON.stringify({...text})}\n`)
            }
        } catch (err) {
            console.log('err:', err)
        } finally {
            next()
        }
}