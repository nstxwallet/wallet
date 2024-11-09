"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const UsersController_1 = require("./UsersController");
const UsersService_1 = require("./UsersService");
class UsersModule {
    constructor(service) {
        this.service = service;
    }
    static async init(props) {
        const service = new UsersService_1.UsersService(props.prisma);
        const controller = new UsersController_1.UsersController(props.fastify, service);
        controller.init();
        return new UsersModule(service);
    }
}
exports.UsersModule = UsersModule;
