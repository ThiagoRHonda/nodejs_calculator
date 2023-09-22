"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({
        message: 'Get all calcualtions',
        timestamp: req.timestamp,
        data: [{ id: 1, result: 1 }, { id: 2, result: 2 }]
    });
});
exports.router.get('/:id', function (req, res) {
    res.send({
        message: 'Get calculation by ID',
        timestamp: req.timestamp,
        id: req.params.id,
        result: 1,
    });
});
exports.router.post('/', middlewares_1.validateCalculatorRequest, (req, res) => {
    //console.log(req.body);
    const { operator, operand1, operand2 } = req.body;
    let result;
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        default:
            result = 'Invalid Operator';
            break;
    }
    res.send({
        message: 'Create new calculation',
        timestamp: req.timestamp,
        result
    });
});
