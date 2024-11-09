"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const TransactionService_1 = require("./TransactionService");
const TransactionController_1 = require("./TransactionController");
class TransactionModule {
    constructor(service) {
        this.service = service;
    }
    static async init(props) {
        const service = new TransactionService_1.TransactionService(props.prisma);
        const controller = new TransactionController_1.TransactionController(props.fastify, service);
        controller.init();
    }
}
exports.TransactionModule = TransactionModule;
