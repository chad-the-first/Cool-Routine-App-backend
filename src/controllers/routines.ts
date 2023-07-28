import { RequestHandler } from "express";
import RoutineModel from "../models/routine"
import createHttpError from "http-errors";
import mongoose from "mongoose";


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
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "invalide Routine Id");
        }

        const routine = await RoutineModel.findById(id).exec(); 

        if (!routine) {
            throw createHttpError(404, 'routine not found');
        }

        res.status(200).json(routine);
    } catch (error) {
        next(error);
    }
}

interface CreateRoutineBody {
    title?: string,
    text?: string,
}

export const createRoutine: RequestHandler<unknown, unknown, CreateRoutineBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "Routine must have a title.")
        }

        const newRoutine = await RoutineModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newRoutine);
    } catch (error) {
        next(error);
    }
}