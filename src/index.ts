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

const app = express();

app.use(morgan('dev'));

app.use(express.json());

if (!env.MONGODB_URI) {
    throw new Error("Please add your Mongodb URI to enviroment variables")
}else{
    console.log(env.MONGODB_URI)
}

if (!env.SESSION_SECRET) {
    throw new Error("there's no sesssion secret!")
}else{
    console.log(env.SESSION_SECRET)
}

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
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