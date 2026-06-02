class ApiResponse {
    constructor(statusCode:number, data = null, message = "successfull operation") {
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode < 400;
        this.message = message;
    }
}
export default ApiResponse;
