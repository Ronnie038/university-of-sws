"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
// if we send text from client then we need express.text() method
app.use(express_1.default.text());
app.get('/', logger, (req, res) => {
    res.send('hello from behind');
});
exports.default = app;
