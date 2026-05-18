class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        data,
        name,
        errors = [],
        stack = ""
    ) {
        super(message);
        (this.statusCode = statusCode,
            this.data = data,
            this.name = name,
            this.errors = errors,
            this.message = message,
            this.success = false
        );
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export default ApiError
