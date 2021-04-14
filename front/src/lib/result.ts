export class Result<T> {
    private value: T
    constructor(value: T) {
        this.value = value
    }

    isOk(): boolean { return !(this.value instanceof Error) }

    get_as_Ok(): T { return this.value}

    get_as_Err(): Error { return this.value as unknown as Error}

    static async try_for_axios<U> (fn: () => U): Promise<Result<U>> {
        try {
            return await new Result(await fn())
        } catch (err) {
            if (err.response) {
                return new Result(err.response.data)
            } else if (err.request) {
                return new Result(err.request)
            } else {
                return new Result(err)
            }
        }
    }
}