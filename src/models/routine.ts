import { InferSchemaType, Schema, model } from "mongoose";


const routineSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true});

type Routine = InferSchemaType<typeof routineSchema>;

export default model<Routine>("Routine", routineSchema);