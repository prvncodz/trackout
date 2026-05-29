class ApiResponse {
    constructor(statusCode, data = null, message = "successfull operation") {
        this.statusCode = Number(statusCode);
        this.data = data;
        this.success = statusCode < 400;
        this.message = message;
    }
}
export default ApiResponse;
