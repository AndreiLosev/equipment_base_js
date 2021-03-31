export class Result<T> {
    constructor(
        private value: T
    ) {}

    isOk() { return !(this.value instanceof Error) }

    get_as_Ok() { return this.value}

    get_as_Err() { return this.value as any as Error}

    static try<U>(fn: () => U, try_log?: () => void, catch_log?: () => void) {
        try {
            if (try_log) try_log()
            return new Result(fn())
        } catch (err) {
            if (catch_log) catch_log()
            return new Result<U>(err)
        }
    }
}