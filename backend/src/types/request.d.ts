import { Request } from "express";

export interface RequestHasLogin extends Request {
    user_id?: number;
}

export interface RegisterRequest extends RequestHasLogin {
    body: {
        email: string;
        password: string;
        confirmPassword: string;
        first_name: string;
        last_name: string;
        token: string;
    };
}

