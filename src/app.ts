import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import RoutineModel from "./models/routine"

const app = express();

app.get('/', async (req, res, next) => {
    try {
        throw Error('Mahboul shi?');
        const routines = await RoutineModel.find().exec();
        res.status(200).json(routines);
    } catch (error) {
        next(error);
    }
} );

app.use((req, res, next) => {
    next(Error("Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
})

export default app;