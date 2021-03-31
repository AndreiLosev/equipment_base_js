export class Result<T> {
    constructor(
        private value: T
    ) {}

    isOk(): boolean { return !(this.value instanceof Error) }

    get_as_Ok(): T { return this.value}

    get_as_Err(): Error { return this.value as any as Error}

    static try<U>(fn: () => U): Result<U> {
        try {
            return new Result(fn())
        } catch (err) {
            return new Result<U>(err)
        }
    }
}