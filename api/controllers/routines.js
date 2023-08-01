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
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!title) {
            throw (0, http_errors_1.default)(400, "Routine must have a title.");
        }
        const newRoutine = yield routine_1.default.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
        });
        res.status(201).json(newRoutine);
    }
    catch (error) {
        next(error);
    }
});
exports.createRoutine = createRoutine;
const updateRoutine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newTitle = req.body.title;
    const newText = req.body.text;
    const id = req.params.routineId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(id)) {
            throw (0, http_errors_1.default)(400, 'bad Id');
        }
        if (!newTitle) {
            throw (0, http_errors_1.default)(400, 'Routine must have a title');
        }
        const routine = yield routine_1.default.findById(id).exec();
        if (!routine) {
            throw (0, http_errors_1.default)(400, "there's no such routine");
        }
        if (!routine.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "You can't access this note.");
        }
        routine.title = newTitle;
        routine.text = newText;
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