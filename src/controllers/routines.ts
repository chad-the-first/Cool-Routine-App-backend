import { RequestHandler } from "express";
import RoutineModel from "../models/routine"
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";


export const getRoutines: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        const routines = await RoutineModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(routines);
    } catch (error) {
        next(error);
    }
}

export const getRoutine: RequestHandler = async (req, res, next) => {
    const id = req.params.routineId;
    const authenticatedUserId = req.session.userId;


    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "invalide Routine Id");
        }

        const routine = await RoutineModel.findById(id).exec(); 

        if (!routine) {
            throw createHttpError(404, 'routine not found');
        }

        if (!routine.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You can't access this note.");
        }

        res.status(200).json(routine);
    } catch (error) {
        next(error);
    }
}

interface CreateRoutineBody {
    fun: string,
    knowledge: string,
    work: string,
    service: string,
    self_care: string,
    family: string,
    date: string,
}

export const createRoutine: RequestHandler<unknown, unknown, CreateRoutineBody, unknown> = async (req, res, next) => {
    const fun = req.body.fun;
    const knowledge = req.body.knowledge;
    const work = req.body.work;
    const service = req.body.service;
    const self_care = req.body.self_care;
    const family = req.body.family;
    const date = req.body.date;

    const authenticatedUserId = req.session.userId;


    try {
        assertIsDefined(authenticatedUserId);
        
        if (!date) {
            throw createHttpError(400, "Routine must have a date.")
        }

        const newRoutine = await RoutineModel.create({
            userId: authenticatedUserId,
            fun: fun,
            knowledge: knowledge,
            work: work,
            service: service,
            self_care: self_care,
            family: family,
            date: date,
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
    fun: string,
    knowledge: string,
    work: string,
    service: string,
    self_care: string,
    family: string,
}

export const updateRoutine: RequestHandler<UpdateRoutineParams, unknown, UpdateRoutineBody, unknown> = async(req, res, next) => {
    const newFun = req.body.fun;
    const newKnowledge = req.body.knowledge;
    const newWork = req.body.work;
    const newService = req.body.service;
    const newSelf_care = req.body.self_care;
    const newFamily = req.body.family;
    const id = req.params.routineId;
    const authenticatedUserId = req.session.userId;


    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, 'bad Id')
        }

        const routine = await RoutineModel.findById(id).exec();

        if(!routine) {
            throw createHttpError(400, "there's no such routine")
        }

        if (!routine.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You can't access this note.");
        }

        routine.fun = newFun;
        routine.knowledge = newKnowledge;
        routine.work = newWork;
        routine.service = newService;
        routine.self_care = newSelf_care;
        routine.family = newFamily;

        const updatedRoutine = await routine.save();

        res.status(200).json(updatedRoutine)

    } catch (error) {
        next(error);
    }
}

export const deleteRoutine: RequestHandler = async(req, res, next) => {
    const id = req.params.routineId;
    const authenticatedUserId = req.session.userId;


    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, 'bad Id')
        }

        const routine = await RoutineModel.findById(id).exec();

        if (!routine) {
            throw createHttpError(404, "there's no such routine")
        }

        if (!routine.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You can't access this note.");
        }

        await routine.deleteOne();

        res.sendStatus(204);
        
    } catch (error) {
        next(error); 
    }
}