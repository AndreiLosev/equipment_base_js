export class Result<T> {
    constructor(
        private value: T
    ) {}

    isOk() { return !(this.value instanceof Error) }

    get_as_Ok() { return this.value}

    get_as_Err() { return this.value as any as Error}

    static try<U>(fn: () => U) {
        try {
            return new Result(fn())
        } catch (err) {
            return new Result<U>(err)
        }
    }
}