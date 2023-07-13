export class ResponseBase {
    private status_code: number;
    private message: string;
    private success: boolean;

    constructor(status_code: number, message: string, success: boolean) {
        this.status_code = status_code;
        this.message = message;
        this.success = success;
    }

    public getStatusCode() {
        return this.status_code;
    }
}

export class ResponseSuccess<T> extends ResponseBase {
    private data?: T;
    constructor(status_code: number, message: string, success: boolean, data?: T) {
        super(status_code, message, success);
        this.data = data;
    }
}

export class ResponseError extends ResponseBase {
    constructor(status_code: number, message: string, success: boolean) {
        super(status_code, message, success);
    }
}