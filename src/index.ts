import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import routineRoutes from "./routes/routines"
import userRoutes from "./routes/users"
import morgan from "morgan"; 
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import CORS from "cors"

const app = express();

app.use(morgan('dev'));

app.use(CORS({credentials: true, origin: true}));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 1000,
        path: "/",
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGODB_URI 
    }),
}))

app.use("/api/users", userRoutes);
app.use("/api/routines", requiresAuth, routineRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if( isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
})


export default app;