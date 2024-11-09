"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const cors_1 = __importDefault(require("@fastify/cors"));
const formbody_1 = __importDefault(require("@fastify/formbody"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const client_1 = require("@prisma/client");
const fastify_1 = __importDefault(require("fastify"));
const users_1 = require("./module/users");
const balances_1 = require("./module/balances");
const transactions_1 = require("./module/transactions");
const PricesModule_1 = require("./module/prices/PricesModule");
async function start() {
    const logger = (0, pino_1.default)();
    const fastify = (0, fastify_1.default)({
        logger: logger,
    });
    const prisma = new client_1.PrismaClient();
    await fastify.register(jwt_1.default, {
        secret: "supersecret",
        cookie: {
            cookieName: "token",
            signed: false,
        },
        decode: {
            complete: true,
        },
    });
    await fastify.register(cookie_1.default, {});
    await fastify.register(formbody_1.default);
    await fastify.register(cors_1.default, {
        origin: "http://localhost:3000",
        credentials: true,
    });
    const _usersModule = await users_1.UsersModule.init({ fastify, prisma });
    const _balanceModule = await balances_1.BalanceModule.Init({ fastify, prisma });
    const _transactionModule = await transactions_1.TransactionModule.init({ fastify, prisma });
    const _pricesModule = await PricesModule_1.PricesModule.init({ fastify, prisma });
    fastify.setNotFoundHandler((_req, reply) => {
        return reply.send("Not Found");
    });
    fastify.get("/", async (_req, reply) => {
        return reply.send("Hello World");
    });
    fastify.listen({ port: 8000 }, (err) => {
        if (err)
            throw err;
        console.log("Server is running on port 8000");
    });
}
void start();
