"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 3000;
var privatekey = fs_1.default.readFileSync('selfsigned.key', 'utf8');
var certificate = fs_1.default.readFileSync('selfsigned.crt', 'utf8');
var credentials = { key: privatekey, cert: certificate };
app.use(express_1.default.json());
app.use(middlewares_1.addTimestamp);
app.use(middlewares_1.logger);
app.use('/health', routes_1.healthRouter);
app.use('/calculator', routes_1.calculatorRouter);
app.use(middlewares_1.errorHandler);
http_1.default.createServer(app).listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`);
});
https_1.default.createServer(credentials, app).listen(8443, function () {
    console.log(`Example app listening at http://localhost:8443`);
});
/*app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});
app.listen(8443, function() {
    console.log("Example app listening at http://localhost:8443");
});*/ 
