import { FastifyInstance } from "fastify";
import { PricesService } from "./PricesService";
import { PrismaClient } from "@prisma/client";
interface Init {
    fastify: FastifyInstance;
    prisma: PrismaClient;
}
export declare class PricesModule {
    readonly service: PricesService;
    constructor(service: PricesService);
    static init(props: Init): Promise<void>;
}
export {};
