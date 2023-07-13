import { RegisterRequest } from "../types/request";
import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken";
import { MyJwtPayload } from "../types/decodeToken";
import { db } from "../configs/db.config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

export const isLogin = async (req: RegisterRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const jsonWebToken = authHeader?.split(" ")[1];

        if (!jsonWebToken) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const decodeJsonWebToken = jwt.verify(jsonWebToken, "PrivateKey") as MyJwtPayload;
            if (decodeJsonWebToken) {
                const isFoundUser = await db.user.findUnique({
                    where: {
                        id: decodeJsonWebToken.user_id,
                    },
                });

                if (isFoundUser) {
                    req.user_id = isFoundUser.id;
                }
            }

            // Handle register logic here
            const registeredUser = await registrationUser({
                ...req.body,
                token: "", // Set the token property to an empty string
            });

            if (!registeredUser) {
                return res.status(500).json({ message: "Failed to register user" });
            }

            const encodedToken = generateToken(
                registeredUser.first_name,
                registeredUser.last_name,
                registeredUser.password,
                registeredUser.email,
            );

            return res.status(200).json({ token: encodedToken });
        }
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError) {
            return res.status(401).json({ message: error.toString() });
        }
        if (error instanceof TokenExpiredError) {
            return res.status(400).json({ message: error.message });
        } else if (error instanceof JsonWebTokenError) {
            return res.status(400).json({ message: error.message });
        } else if (error instanceof NotBeforeError) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal Server" });
    }
};

async function registrationUser(userData: {
    token: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}) {
    // Check if the email is empty
    if (!userData.email) {
        throw new Error("Email is required");
    }

    // Generate a hashed password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    try {
        const newUser = await db.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                first_name: userData.first_name,
                last_name: userData.last_name,
                url_avatar: "",
                token: userData.token,
            },
        });

        return newUser;
    } catch (error) {
        console.error("Failed to register user:", error);
        return null;
    }
}

function generateToken(first_name: string, last_name: string, password: string, email: string): string {
    // Generate and return the encoded token based on the user data
    const payload = { first_name, last_name, password, email };
    const secretKey =
        "73fb7f5b99b27706cc6c2c708f8c8f57aa31a4a0e0712c06f00483ba69a9a5162c55af93437e4b9563930d012d76f9f9ff9108394a77f41af5f78db50537d79b";
    const expiresIn = "1h";
    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
}

export function generateNewAccessToken(userId: number): string {
    // Generate a new access token based on the user ID
    // Add your logic to generate a new access token here
    const secretKey =
        "73fb7f5b99b27706cc6c2c708f8c8f57aa31a4a0e0712c06f00483ba69a9a5162c55af93437e4b9563930d012d76f9f9ff9108394a77f41af5f78db50537d79b";
    const expiresIn = "1h";
    const payload = { userId };
    const newAccessToken = jwt.sign(payload, secretKey, { expiresIn });

    return newAccessToken;
}
