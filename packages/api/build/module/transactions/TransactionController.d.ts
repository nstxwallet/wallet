import { TransactionService } from "./TransactionService";
import { FastifyInstance } from "fastify";
export declare class TransactionController {
    private readonly fastify;
    readonly service: TransactionService;
    constructor(fastify: FastifyInstance, service: TransactionService);
    init(): void;
}
