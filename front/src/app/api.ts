import axios from 'axios'
import {Result} from '../lib/result'


const baseURL = () => {
    if (process.env.NODE_ENV === 'production') {
        return '127.0.0.1:4500'
    } else if (process.env.NODE_ENV === 'development') {
        return ''
    } else {
        throw new Error(`${process.env.NODE_ENV} ??? неожидал`)
    }
}

export class Api {
    private static api = axios.create({
        baseURL: baseURL(),
        responseType: 'json',
    })
    
    static create_table = async (table_name: string) => {
        return await Result.try_for_axios(async () => {
            const res = await Api.api.post<null>('/create_new_table', { table_name })
            return res.data
        })
    }
}
