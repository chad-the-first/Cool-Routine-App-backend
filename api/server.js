"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = validateEnv_1.default.PORT || 5000;
mongoose_1.default.connect(validateEnv_1.default.MONGODB_URI)
    .then(() => {
    console.log("Mongoose connected");
    index_1.default.listen(port, () => {
        console.log("server running on port " + port);
    });
})
    .catch(console.error);
//# sourceMappingURL=server.js.map