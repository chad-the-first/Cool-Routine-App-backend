import app from "./app"
import env from "./util/validateEnv"
import mongoose from "mongoose";

const port = process.env.PORT || 5000;

const mongodb = process.env.MONGO_CONNECTION_STRING || env.MONGO_CONNECTION_STRING;

mongoose.connect(mongodb)
    .then(() => {
        console.log("Mongoose connected")
        app.listen(port, () => {
            console.log('server running on port: ' + port);
        })
    })
    .catch(console.error);
