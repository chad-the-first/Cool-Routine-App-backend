import { RequestHandler } from "express";
import RoutineModel from "../models/routine"


export const getRoutines: RequestHandler = async (req, res, next) => {
    try {
        const routines = await RoutineModel.find().exec();
        res.status(200).json(routines);
    } catch (error) {
        next(error);
    }
}

export const getRoutine: RequestHandler = async (req, res, next) => {
    const id = req.params.routineId;

    try {
        const routine = await RoutineModel.findById(id).exec();
        res.status(200).json(routine);
    } catch (error) {
        next(error);
    }
}

export const createRoutine: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        const newRoutine = await RoutineModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newRoutine);
    } catch (error) {
        next(error);
    }
}