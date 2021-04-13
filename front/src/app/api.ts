import axios, {AxiosInstance, AxiosResponse} from 'axios'


const baseURL = () => {
    if (process.env.NODE_ENV === 'production') {
        return '127.0.0.1:4500'
    } else if (process.env.NODE_ENV === 'development') {
        return ''
    } else {
        throw new Error(`${process.env.NODE_ENV} ??? неожидал`)
    }
}

class Api {
    private static api = axios.create({
        baseURL: baseURL(),
    })
    
    static create_table = async (table_name: string) => {
        const response = await Api.api.get<null>('/', { params: { table_name }})
        return  response.data
    }
}