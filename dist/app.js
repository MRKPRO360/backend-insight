"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const not_found_1 = __importDefault(require("./app/middlewares/not-found"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrHandler_1 = __importDefault(require("./app/middlewares/globalErrHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// BODY PARSER
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ['http://localhost:3000'] }));
app.use((0, cookie_parser_1.default)());
// APPLICATION ROUTERS
app.use('/api', routes_1.default);
// GENERIC RESPONSE
app.get('/', (req, res) => {
    res.send('HELLO WORLD 👋');
});
// GLOBAL ERR HANDLER
app.use(globalErrHandler_1.default);
//NOT-FOUND
app.use(not_found_1.default);
exports.default = app;
