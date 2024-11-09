import { FastifyInstance } from "fastify";
import { PricesService } from "./PricesService";
export declare class PricesController {
    private readonly fastify;
    readonly service: PricesService;
    constructor(fastify: FastifyInstance, service: PricesService);
    init(): void;
}
