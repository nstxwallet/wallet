import { BalanceService } from "./BalanceService";
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
interface Init {
    fastify: FastifyInstance;
    prisma: PrismaClient;
}
export declare class BalanceModule {
    readonly service: BalanceService;
    constructor(service: BalanceService);
    static Init(props: Init): Promise<BalanceModule>;
}
export {};
