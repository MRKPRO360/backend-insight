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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const connectionString = (_a = config_1.default.db_url) === null || _a === void 0 ? void 0 : _a.replace('<DB_USERNAME>', config_1.default.db_username).replace('<DB_PASSWORD>', config_1.default.db_password);
const port = config_1.default.port;
let server;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(connectionString, { autoIndex: true });
            server = app_1.default.listen(port, () => {
                console.log(`App is listening on port ${port}`);
            });
        }
        catch (err) {
            console.error(`Error: ${err.message}`);
            process.exit(1);
        }
    });
}
connectToDB();
process.on('unhandledRejection', () => {
    console.log('💥😥 Unhandled rejection, server is shutting down...');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.log('💥😥 Uncaught exception, server is shutting down...', err.message);
    process.exit(1);
});
