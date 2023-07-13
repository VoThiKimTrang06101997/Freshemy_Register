import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


//////////////////////////////////////////////////////////////////////////

import cookieParser from "cookie-parser";
import routers from "./src/routes/index.router";
import configs from "./src/configs";
import cors from "cors";

import bodyParser from "body-parser";
// import { refreshTokenMiddleware } from "src/middlewares/isRegistered";

//////////////////////////////////////////////////////////////////////////

// const app: Application = express();
const prisma = new PrismaClient();
const app = express();

declare namespace Express {
    interface Request {
        accessToken?: string;
    }
}

// Sử dụng middleware cookie-parser để xử lý cookie
app.use(cookieParser());

// Add the refresh token middleware before your other routes
// app.use(refreshTokenMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Parse JSON data
app.use(bodyParser.json());

app.use("/api/auth", routers.authRouter);

const port: number = configs.general.PORT;

app.get("/", (_req, res: Response) => {
    res.send(`Server is running on port: ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
