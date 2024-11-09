"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const onRequestAuth_1 = require("../../hooks/onRequestAuth");
class TransactionController {
    constructor(fastify, service) {
        this.fastify = fastify;
        this.service = service;
    }
    init() {
        this.fastify.get("/transactions", { onRequest: onRequestAuth_1.onRequestAuth }, async (req, reply) => {
            const transactions = await this.service.getAll({
                userId: req.user.id,
                currencies: req.query.currencies,
                statuses: req.query.statuses,
                types: req.query.types
            });
            return reply.send(transactions);
        });
        this.fastify.get("/transaction/:id", { onRequest: onRequestAuth_1.onRequestAuth }, async (req, reply) => {
            const transaction = await this.service.getById(req.params.id);
            if (!transaction) {
                return reply
                    .status(400)
                    .send({ success: false, message: "Transaction not found" });
            }
            return reply.send(transaction);
        });
        this.fastify.get("/transactions/currency/:currency", { onRequest: onRequestAuth_1.onRequestAuth }, async (req, reply) => {
            const transactions = await this.service.getForCurrency({
                userId: req.user.id,
                currency: req.params.currency
            });
            return reply.send(transactions);
        });
        this.fastify.post("/transactions/transfer", { onRequest: onRequestAuth_1.onRequestAuth }, async (req, reply) => {
            const transaction = await this.service.transfer({
                senderId: req.user.id,
                receiverId: req.body.receiverId,
                amount: req.body.amount,
                currency: req.body.currency
            });
            return reply.send(transaction);
        });
    }
}
exports.TransactionController = TransactionController;
