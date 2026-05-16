class ApiResponse {
    constructor(
        statusCode,
        data = null,
        message = "successfull operation"
    ) {
        this.statusCode = Number(statusCode)
        this.success = statusCode < 400
        this.data = data
        this.message = message
    }
}
export default ApiResponse
