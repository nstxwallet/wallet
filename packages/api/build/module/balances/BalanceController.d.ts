import { FastifyInstance } from "fastify";
import { BalanceService } from "./BalanceService";
export declare class BalanceController {
    private readonly fastify;
    readonly service: BalanceService;
    constructor(fastify: FastifyInstance, service: BalanceService);
    init(): void;
}
