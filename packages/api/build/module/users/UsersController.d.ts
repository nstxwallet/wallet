import { FastifyInstance } from "fastify";
import { UsersService } from "./UsersService";
export declare class UsersController {
    private readonly fastify;
    private readonly service;
    constructor(fastify: FastifyInstance, service: UsersService);
    init(): void;
}
