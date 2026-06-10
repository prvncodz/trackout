class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message = "something went wrong",
        public data = {},
        public errors = [],
        public success = false,
        name = "ApiError",
        stack = "",
    ) {
        super(message);
        ((this.statusCode = statusCode),
            (this.message = message),
            (this.data = data),
            (this.name = name),
            (this.errors = errors),
            (this.success = false));
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default ApiError;
