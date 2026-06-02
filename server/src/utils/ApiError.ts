class ApiError extends Error {
    constructor(
        public statusCode: number,
        public data = {},
        public errors = [],
        public success = false,
        name = "ApiError",
        message = "something went wrong",
        stack = "",
    ) {
        super(message);
        ((this.statusCode = statusCode),
            (this.data = data),
            (this.name = name),
            (this.errors = errors),
            (this.message = message),
            (this.success = false));
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default ApiError;
