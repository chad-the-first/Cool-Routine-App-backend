"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = validateEnv_1.default.PORT || 5000;
const mongodb = validateEnv_1.default.MONGODB_URI;
mongoose_1.default.connect(mongodb)
    .then(() => {
    console.log("Mongoose connected");
    _1.default.listen(port, () => {
        console.log('server running on port: ' + port);
    });
})
    .catch(console.error);
//# sourceMappingURL=server.js.map