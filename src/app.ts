import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { addTimestamp, errorHandler, logger } from './middlewares';
import { calculatorRouter, healthRouter } from './routes';

const app = express();
const port = 3000;

var privatekey = fs.readFileSync('selfsigned.key', 'utf8');
var certificate = fs.readFileSync('selfsigned.crt', 'utf8');

var credentials = {key: privatekey, cert: certificate};

app.use(express.json());
app.use(addTimestamp);
app.use(logger);

app.use('/health', healthRouter);
app.use('/calculator', calculatorRouter);

app.use(errorHandler);

http.createServer(app).listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})

https.createServer(credentials, app).listen(8443, function() {
    console.log(`Example app listening at http://localhost:8443`);
});

/*app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});
app.listen(8443, function() {
    console.log("Example app listening at http://localhost:8443");
});*/