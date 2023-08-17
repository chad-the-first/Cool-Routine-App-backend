"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const routineSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    fun: { type: String, required: true },
    knowledge: { type: String, required: true },
    work: { type: String, required: true },
    service: { type: String, required: true },
    self_care: { type: String, required: true },
    family: { type: String, required: true },
    date: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Routine", routineSchema);
//# sourceMappingURL=routine.js.map