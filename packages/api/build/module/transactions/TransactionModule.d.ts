import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { TransactionService } from "./TransactionService";
interface Init {
    fastify: FastifyInstance;
    prisma: PrismaClient;
}
export declare class TransactionModule {
    readonly service: TransactionService;
    constructor(service: TransactionService);
    static init(props: Init): Promise<void>;
}
export {};
