import app from "."
import env from "./util/validateEnv"
import mongoose from "mongoose";

const port = process.env.PORT || 5000;

const mongodb = process.env.MONGODB_URI || env.MONGODB_URI;

mongoose.connect(mongodb)
    .then(() => {
        console.log("Mongoose connected")
        app.listen(port, () => {
            console.log('server running on port: ' + port);
        })
    })
    .catch(console.error);
