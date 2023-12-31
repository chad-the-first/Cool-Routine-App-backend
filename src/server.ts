import app from "./index";
import env from "./util/validateEnv";
import mongoose from "mongoose";


const port = env.PORT || 5000;


mongoose.connect(env.MONGODB_URI)
.then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
        console.log("server running on port " + port);
    })
})
.catch(console.error)