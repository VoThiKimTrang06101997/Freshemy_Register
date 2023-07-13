import { Request, Response } from "express";
import { registrationSchema } from "../validations/auth";
import { ValidationError } from "joi";
import { convertJoiErrorToString } from "../commons/index";
import { RegisterRequest } from "../types/request";
import services from "../services/index.service";
import jwt from "jsonwebtoken";

// require('crypto').randomBytes(64).toString('hex')

class AuthController {
    constructor() {
        // Bind the generateTokenHandler method to the instance of the AuthController class
        this.generateTokenHandler = this.generateTokenHandler.bind(this);
    }

    generateToken(first_name: string, last_name: string, password: string, email: string): string {
        // Generate and return the encoded token based on the user data
        const payload = { first_name, last_name, password, email };
        const secretKey =
            "b286e0f96f6759ec8fb9906b235f4c13dfb23c0505574fd6b82abad035f007fa5dac96ac9038beea3abb9bad20a40bd5a7e891e7502539c04dea853e79d10a9f"; // Replace with your own secret key
        const expiresIn = "1h"; // Set the expiration time for the token

        const token = jwt.sign(payload, secretKey, { expiresIn });

        return token;
    }

    async register(req: Request, res: Response): Promise<Response> {
        const { email, password, first_name, last_name, confirmPassword, ...registrationData } = req.body;

        // Remove the "token" field from the request payload
        // const { token, ...registrationData } = req.body;

        // Construct the data object with all required fields
        const data = {
            email,
            password,
            first_name,
            last_name,
            confirmPassword,
            ...registrationData,
        };

        const errorValidate: ValidationError | undefined = registrationSchema.validate(data).error;

        if (errorValidate) {
            return res.status(400).json({
                status_code: 400,
                message: convertJoiErrorToString(errorValidate),
                success: false,
            });
        }

        const response = await services.AuthService.register(req);

        return res.status(response.getStatusCode()).json(response);
    }

    async refreshToken(req: Request, res: Response): Promise<Response> {
        const response = await services.AuthService.refreshToken(req);

        return res.status(response.getStatusCode()).json(response);
    }

    async getMe(req: RegisterRequest, res: Response): Promise<Response> {
        const response = await services.AuthService.getMe(req);

        console.log(response);
        return res.status(response.getStatusCode()).json(response);
    }

    async generateTokenHandler(req: Request, res: Response): Promise<Response> {
        const { first_name, last_name, password, email } = req.body;

        // Generate a token using the instance method
        const token = this.generateToken(first_name, last_name, password, email);

        // Return the token and other user data in the response
        return res.status(200).json({ token, first_name, last_name, password, email });
    }
}

export default AuthController;
