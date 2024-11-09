import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { UsersService } from "./UsersService";
interface Init {
    fastify: FastifyInstance;
    prisma: PrismaClient;
}
export declare class UsersModule {
    readonly service: UsersService;
    constructor(service: UsersService);
    static init(props: Init): Promise<UsersModule>;
}
export {};
