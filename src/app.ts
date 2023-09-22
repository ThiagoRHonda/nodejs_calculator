import express from 'express';
import https from 'https';
import http from 'http';
import { addTimestamp, errorHandler, logger } from './middlewares';
import { calculatorRouter, healthRouter } from './routes';
const app = express();
const port = 3000;

app.use(express.json());
app.use(addTimestamp);
app.use(logger);

app.use('/health', healthRouter);
app.use('/calculator', calculatorRouter);

app.use(errorHandler);
http.createServer(app).listen(port)
https.createServer(app).listen(4003)

/*app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});*/