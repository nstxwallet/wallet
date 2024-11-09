"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesController = void 0;
class PricesController {
    constructor(fastify, service) {
        this.fastify = fastify;
        this.service = service;
    }
    init() {
        this.fastify.get("/prices", async (_req, reply) => {
            const prices = await this.service.getAll();
            reply.send(prices);
        });
    }
}
exports.PricesController = PricesController;
