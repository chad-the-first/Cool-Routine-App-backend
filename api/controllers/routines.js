"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoutine = exports.updateRoutine = exports.createRoutine = exports.getRoutine = exports.getRoutines = void 0;
const routine_1 = __importDefault(require("../models/routine"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const assertIsDefined_1 = require("../util/assertIsDefined");
const getRoutines = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        const routines = yield routine_1.default.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(routines);
    }
    catch (error) {
        next(error);
    }
});
exports.getRoutines = getRoutines;
const getRoutine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.routineId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw (0, http_errors_1.default)(400, "invalide Routine Id");
        }
        const routine = yield routine_1.default.findById(id).exec();
        if (!routine) {
            throw (0, http_errors_1.default)(404, 'routine not found');
        }
        if (!routine.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You can't access this note.");
        }
        res.status(200).json(routine);
    }
    catch (error) {
        next(error);
    }
});
exports.getRoutine = getRoutine;
const createRoutine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fun = req.body.fun;
    const knowledge = req.body.knowledge;
    const work = req.body.work;
    const service = req.body.service;
    const self_care = req.body.self_care;
    const family = req.body.family;
    const date = req.body.date;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!date) {
            throw (0, http_errors_1.default)(400, "Routine must have a date.");
        }
        const newRoutine = yield routine_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
});
exports.createRoutine = createRoutine;
const updateRoutine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newFun = req.body.fun;
    const newKnowledge = req.body.knowledge;
    const newWork = req.body.work;
    const newService = req.body.service;
    const newSelf_care = req.body.self_care;
    const newFamily = req.body.family;
    const id = req.params.routineId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw (0, http_errors_1.default)(400, 'bad Id');
        }
        const routine = yield routine_1.default.findById(id).exec();
        if (!routine) {
            throw (0, http_errors_1.default)(400, "there's no such routine");
        }
        if (!routine.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You can't access this note.");
        }
        routine.fun = newFun;
        routine.knowledge = newKnowledge;
        routine.work = newWork;
        routine.service = newService;
        routine.self_care = newSelf_care;
        routine.family = newFamily;
        const updatedRoutine = yield routine.save();
        res.status(200).json(updatedRoutine);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRoutine = updateRoutine;
const deleteRoutine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.routineId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw (0, http_errors_1.default)(400, 'bad Id');
        }
        const routine = yield routine_1.default.findById(id).exec();
        if (!routine) {
            throw (0, http_errors_1.default)(404, "there's no such routine");
        }
        if (!routine.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You can't access this note.");
        }
        yield routine.deleteOne();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRoutine = deleteRoutine;
//# sourceMappingURL=routines.js.map