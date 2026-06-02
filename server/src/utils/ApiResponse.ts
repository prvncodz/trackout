class ApiResponse {
    constructor(public statusCode:number,public data = {}, public success = true,public message = "successfull operation") {
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode < 400;
        this.message = message;
    }
}
export default ApiResponse;
