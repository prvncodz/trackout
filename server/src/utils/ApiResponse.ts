class ApiResponse {
    constructor(public statusCode: number, public data: any, public message = "successfull operation", public success = true) {
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode < 400;
        this.message = message;
    }
}
export default ApiResponse;
