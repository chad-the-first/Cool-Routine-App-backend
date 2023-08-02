"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.PORT || 5000;
const mongodb = process.env.MONGO_CONNECTION_STRING || validateEnv_1.default.MONGO_CONNECTION_STRING;
mongoose_1.default.connect(mongodb)
    .then(() => {
    console.log("Mongoose connected");
    app_1.default.listen(port, () => {
        console.log('server running on port: ' + port);
    });
})
    .catch(console.error);
//# sourceMappingURL=index.js.map