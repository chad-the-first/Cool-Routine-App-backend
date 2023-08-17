import { InferSchemaType, Schema, model } from "mongoose";


const routineSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    fun: { type: String, required: true },
    knowledge: { type: String, required: true },
    work: { type: String, required: true },
    service: { type: String, required: true },
    self_care: { type: String, required: true },
    family: { type: String, required: true },
    date: { type: String, required: true },
}, { timestamps: true});

type Routine = InferSchemaType<typeof routineSchema>;

export default model<Routine>("Routine", routineSchema);