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
};

interface UpdateRoutineParams {
    routineId: string,
}

interface UpdateRoutineBody {
    title?: string,
    text?: string,
}

export const updateRoutine: RequestHandler<UpdateRoutineParams, unknown, UpdateRoutineBody, unknown> = async(req, res, next) => {
    const newTitle = req.body.title;
    const newText = req.body.text;
    const id = req.params.routineId;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, 'bad Id')
        }

        if (!newTitle) {
            throw createHttpError(400, 'Routine must have a title');
        }

        const routine = await RoutineModel.findById(id).exec();

        if(!routine) {
            throw createHttpError(400, "there's no such routine")
        }

        routine.title = newTitle;
        routine.text = newText;

        const updatedRoutine = await routine.save();

        res.status(200).json(updatedRoutine)

    } catch (error) {
        next(error);
    }
}

export const deleteRoutine: RequestHandler = async(req, res, next) => {
    const id = req.params.routineId;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, 'bad Id')
        }

        const routine = await RoutineModel.findById(id).exec();

        if (!routine) {
            throw createHttpError(404, "there's no such routine")
        }

        await routine.deleteOne();

        res.sendStatus(204);
        
    } catch (error) {
        next(error); 
    }
}