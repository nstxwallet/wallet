"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceModule = void 0;
const BalanceService_1 = require("./BalanceService");
const BalanceController_1 = require("./BalanceController");
class BalanceModule {
    constructor(service) {
        this.service = service;
    }
    static async Init(props) {
        const service = new BalanceService_1.BalanceService(props.prisma);
        const controller = new BalanceController_1.BalanceController(props.fastify, service);
        controller.init();
        return new BalanceModule(service);
    }
}
exports.BalanceModule = BalanceModule;
