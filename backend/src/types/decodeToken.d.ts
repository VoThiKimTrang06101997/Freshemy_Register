import { JwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends JwtPayload {
    user_id?: number;
}