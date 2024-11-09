"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceController = void 0;
const onRequestAuth_1 = require("../../hooks/onRequestAuth");
class BalanceController {
    constructor(fastify, service) {
        this.fastify = fastify;
        this.service = service;
    }
    init() {
        this.fastify.get("/balances", { onRequest: onRequestAuth_1.onRequestAuth }, async (req, reply) => {
            const balances = await this.service.getAll({ userId: req.user.id });
            return reply.send(balances);
        });
        this.fastify.get("/balances/:id", { onRequest: onRequestAuth_1.onRequestAuth }, async (req, reply) => {
            const balance = await this.service.getOne({
                id: req.params.id,
                userId: req.user.id,
            });
            return reply.send(balance);
        });
        this.fastify.post("/balances/create", { onRequest: onRequestAuth_1.onRequestAuth }, async (req, reply) => {
            const balance = await this.service.create({
                userId: req.user.id,
                currency: req.body.currency,
            });
            return reply.send(balance);
        });
    }
}
exports.BalanceController = BalanceController;
